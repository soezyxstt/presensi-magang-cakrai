import { db } from "~/server/db";
import Kru from "./client";
import { verifySession } from "~/server/auth";
import { redirect } from "next/navigation";

async function getCAKRAI() {
  "use server";

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
}

export default async function Page({ params }: { params: { id: string } }) {
  const session = await verifySession();
  if (!session.isAuth) {
    redirect("/");
  }

  if (!(session.userId === params.id)) {
    redirect("/kru/" + session.userId);
  }

  const cakrai = await getCAKRAI();
  const cakrais = cakrai.map((cakrai) => {
    return {
      ...cakrai,
      updatedAt: new Date(
        cakrai.updatedAt.setHours(cakrai.updatedAt.getHours() + 7),
      ),
    };
  });
  const cakraiAttend = cakrais.map((cakrai) => {
    return cakrai.attendance.filter(({ status }) => status !== "ABSENT").length;
  });
  const maxAttend = cakraiAttend.reduce((a, b) => Math.max(a, b));
  return <Kru params={params} cakrais={cakrais} maxAttend={maxAttend}></Kru>;
}
