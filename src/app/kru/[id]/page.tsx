import Kru from "./client";
import { verifySession } from "~/server/auth";
import { redirect } from "next/navigation";
import { getCakrais, getMaxAttendance } from '~/lib/dal';

export default async function Page({ params }: { params: { id: string } }) {
  const session = await verifySession();
  if (!session.isAuth) {
    redirect("/");
  }

  if (!(session.userId === params.id)) {
    redirect("/kru/" + session.userId);
  }

  const cakrai = await getCakrais();
  const cakrais = cakrai.map((cakrai) => {
    return {
      ...cakrai,
      updatedAt: new Date(
        cakrai.updatedAt.setHours(cakrai.updatedAt.getHours() + 7),
      ),
    };
  });

  const maxAttend = await getMaxAttendance();
  return <Kru params={params} cakrais={cakrais} maxAttend={maxAttend}></Kru>;
}
