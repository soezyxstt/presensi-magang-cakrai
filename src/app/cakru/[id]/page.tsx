import { db } from "~/server/db";
import Cakru from "./client";

async function getUser(id: string) {
  "use server";

  const user = await db.user.findUnique({
    where: {
      id,
    },
    include: {
      attendance: true,
    },
  });

  return user;
}

async function getMaxAttendance() {
  "use server";

  const users = await db.user.findMany({
    where: {
      role: "CAKRU",
    },
    include: {
      attendance: true,
    },
  });

  let maxAttendance = 0;
  users.forEach((user) => {
    const attendance = user.attendance.filter(
      (a) => a.status !== "ABSENT",
    ).length;
    if (attendance > maxAttendance) {
      maxAttendance = attendance;
    }
  });

  return maxAttendance;
}

export default async function Page({ params }: { params: { id: string } }) {
  const user = await getUser(params.id);
  const maxAttendance = await getMaxAttendance();
  return <Cakru params={params} user={user} maxAttendance={maxAttendance} />;
}
