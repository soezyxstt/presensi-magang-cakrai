import Cakru from "./client";
import { verifySession } from "~/server/auth";
import { redirect } from "next/navigation";
import { getMaxAttendance, getUser } from '~/lib/dal';

export default async function Page({ params }: { params: { id: string } }) {
  const session = await verifySession();
  if (!session.isAuth) {
    redirect("/");
  }

  if (!(session.userId === params.id)) {
    redirect("/cakru/" + session.userId);
  }

  const user = await getUser(params.id);
  const maxAttendance = await getMaxAttendance();
  return <Cakru params={params} user={user} maxAttendance={maxAttendance} />;
}
