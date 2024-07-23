'use server';

import { revalidatePath } from 'next/cache';
import { z } from "zod";
import { actionClient } from "~/lib/action-client";
import { db } from '~/server/db';

export const attendance = actionClient.schema(
  z.object({
    userId: z.string(),
    authorId: z.string(),
    date: z.string(),
    status: z.enum(["PRESENT", "ABSENT", "LATE"]),
  }),
).action(async ({ parsedInput: { userId, authorId, date, status} }) => {
  try {
    const existingAttendance = await db.attendance.findFirst({
      where: {
        userId,
        date,
      }
    })

    if (existingAttendance) {
      throw new Error("Attendance already exists");
    }

    const attendance = await db.attendance.create({
      data: {
        userId,
        authorId,
        date,
        status
      }
    })

    if (!attendance) {
      throw new Error("Failed to create attendance");
    }

    revalidatePath(`/kru/${userId}`);

    return {
      message: "Attendance created successfully",
      status: "success",
    };
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
      throw new Error(err.message);
    }

    throw new Error("Failed to sign in");
  }
});
