"use server";

import { compare, hash } from "bcrypt-ts";
import { flattenValidationErrors } from "next-safe-action";
import { z } from "zod";
import { actionClient } from "~/lib/action-client";
import { db } from "~/server/db";

export const updateProfile = actionClient
  .schema(
    z.object({
      name: z.string().min(3),
      uname: z.string().min(3),
      id: z.string().min(3),
    }),
    {
      handleValidationErrorsShape: (ve) =>
        flattenValidationErrors(ve).fieldErrors,
    },
  )
  .action(async ({ parsedInput: { name, uname, id } }) => {
    try {
      const user = await db.user.update({
        where: {
          id: id,
        },
        data: {
          name: name,
          uname: uname,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      return {
        message: "Profile updated successfully",
        status: "success",
      };
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        throw new Error(err.message);
      }

      throw new Error("Failed to update profile");
    }
  });

export const changePassword = actionClient
  .schema(
    z
      .object({
        id: z.string().min(3),
        oldPassword: z.string().min(8),
        password: z.string().min(8),
        confirmPassword: z.string().min(8),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
      }),
    {
      handleValidationErrorsShape: (ve) =>
        flattenValidationErrors(ve).fieldErrors,
    },
  )
  .action(async ({ parsedInput: { id, password, oldPassword } }) => {
    try {
      const user = await db.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const isPasswordValid = await compare(oldPassword, user.passwordHash);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      const newPassword = await hash(password, 10);
      const updatedUser = await db.user.update({
        where: {
          id: id,
        },
        data: {
          passwordHash: newPassword,
        },
      });

      if (!updatedUser) {
        throw new Error("Failed to change password");
      }

      return {
        message: "Password changed successfully",
        status: "success",
      };
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        throw new Error(err.message);
      }

      throw new Error("Failed to change password");
    }
  });
