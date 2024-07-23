import { redirect } from "next/navigation";
import { verifySession } from "~/server/auth";

export default async function Page() {
  const session = await verifySession();

  if (session.isAuth) {
    redirect("/cakru/" + session.userId);
  } else {
    redirect("/sign-in");
  }

  return <></>;
}
