import { db } from '~/server/db';
import Kru from './client';

async function getCAKRAI() {
  'use server';

  const cakrais = await db.user.findMany({
    where: {
      role: "CAKRU",
    },
    include: {
      attendance: true,
    }
  })

  return cakrais;
}

export default async function Page({ params }: { params: { id: string } }) {
  const cakrais = await getCAKRAI();
  return <Kru params={params} cakrais={cakrais}>
  </Kru>
}