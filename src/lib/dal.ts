"use server";

import { cache } from "react";
import { db } from "~/server/db";

export const getUser = cache(async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
    include: {
      attendance: true,
    },
  });

  return user;
});

export const getMaxAttendance = cache(async () => {
  const maxAttendance = await db.attendance.groupBy({
    by: ["date"]
  })

  return maxAttendance.length;
});

export const getCakrais = cache(async () => {
  const cakrais = await db.user.findMany({
    where: {
      role: "CAKRU",
    },
    include: {
      attendance: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return cakrais;
}); 