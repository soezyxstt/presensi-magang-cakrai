import { redirect } from "next/navigation";

import { getCakrais, getMaxAttendance } from "~/lib/dal";
import { verifySession } from "~/server/auth";
import Client from './client';

export default async function Page({ params }: { params: { id: string } }) {
  const session = await verifySession();
  if (!session.isAuth) {
    redirect("/");
  }

  if (!(session.userId === params.id)) {
    redirect("/kru/" + session.userId);
  }

  const cakrais = await getCakrais();
  const maxAttend = await getMaxAttendance();

  return (
    <Client params={params} cakrais={cakrais} maxAttend={maxAttend} />
  );
}
