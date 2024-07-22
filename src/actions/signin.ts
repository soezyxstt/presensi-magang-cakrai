"use server";

import { actionClient } from "@/lib/action-client";
import { createSession } from "@/server/auth";
import { compare } from 'bcrypt-ts';
import { flattenValidationErrors } from "next-safe-action";
import { z } from 'zod';
import { db } from '~/server/db';

export const signIn = actionClient
  .schema(z.object({
    uname: z.string().min(3),
    password: z.string().min(8),
  }), {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { uname, password } }) => {
    try {
      const user = await db.user.findUnique({
        where: {
          uname,
        },
      })

      if (!user) {
        throw new Error("User not found");
      }

      const isPasswordValid = await compare(password, user.passwordHash);

      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      await createSession(user.id, user.role, user.division,user.uname, user.name!);
      return {
        message: "User signed in successfully",
        status: "success",
        role: user.role,
        id: user.id,
      };
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        throw new Error(err.message);
      }

      throw new Error("Failed to sign in");
    }
  });
