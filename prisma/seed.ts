import { type Division, PrismaClient, type Role } from "@prisma/client";
import { hash } from 'bcrypt-ts';

const prisma = new PrismaClient();

const users: {
  uname: string;
  passwordHash: string;
  division: Division;
  role: Role;
}[] = [
  {
    uname: "cakru1",
    passwordHash: "password",
    division: "CONTROL",
    role: "CAKRU",
  },
  {
    uname: "kru1",
    passwordHash: "password",
    division: "MECHANIC",
    role: "KRU",
  },
  {
    uname: "cakru2",
    passwordHash: "password",
    division: "CONTROL",
    role: "CAKRU",
  },
  {
    uname: "cakru3",
    passwordHash: "password",
    division: "MECHANIC",
    role: "CAKRU",
  },
  {
    uname: "cakru4",
    passwordHash: "password",
    division: "CONTROL",
    role: "CAKRU",
  },
];

async function main() {
  for (const user of users) {
    const us = await prisma.user.create({
      data: {
        uname: user.uname,
        passwordHash: await hash(user.passwordHash, 10),
        division: user.division,
        role: user.role,
      },
    });

    console.log(us);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async () => {
    console.log("error");
    await prisma.$disconnect();
    process.exit(1);
  });
