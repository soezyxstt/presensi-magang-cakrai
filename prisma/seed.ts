import { type Division, PrismaClient, type Role } from "@prisma/client";
import { hash } from "bcrypt-ts";

const prisma = new PrismaClient();

const kru: {
  uname: string;
  passwordHash: string;
  division: Division;
  role: Role;
  name: string;
}[] = [
  {
    uname: "adi",
    passwordHash: "linearalgebra",
    division: "MECHANIC",
    role: "KRU",
    name: "Adi Haditya N.",
  },
  {
    uname: "garpin",
    passwordHash: "password",
    division: "MECHANIC",
    role: "KRU",
    name: "Garpin Hotashi Bontang",
  },
  {
    uname: "nicko",
    passwordHash: "password",
    division: "MECHANIC",
    role: "KRU",
    name: "Nicko Andrew Tate",
  },
  {
    uname: "purkon",
    passwordHash: "password",
    division: "CONTROL",
    role: "KRU",
    name: "Purkon Riansyah",
  },
  {
    uname: "jawir",
    passwordHash: "password",
    division: "MECHANIC",
    role: "KRU",
    name: "Fahmi Jawir Firmansyah",
  },
  {
    uname: "jojo",
    passwordHash: "password",
    division: "MANAGER",
    role: "KRU",
    name: "Johannes Wijaya",
  },
  {
    uname: "mas_ju",
    passwordHash: "password",
    division: "MECHANIC",
    role: "KRU",
    name: "Juan Aaron",
  },
  {
    uname: "parel",
    passwordHash: "password",
    division: "MECHANIC",
    role: "KRU",
    name: "M. Farel Asshidiqqi",
  },
  {
    uname: "parhan",
    passwordHash: "password",
    division: "CONTROL",
    role: "KRU",
    name: "Farhan",
  },
  {
    uname: "goldwin",
    passwordHash: "password",
    division: "CONTROL",
    role: "KRU",
    name: "Goldwin Sonick",
  },
  {
    uname: "josugi",
    passwordHash: "password",
    division: "CONTROL",
    role: "KRU",
    name: "Jonathan Sugianto",
  },
  {
    uname: "irpan",
    passwordHash: "password",
    division: "CONTROL",
    role: "KRU",
    name: "Irfan Yapi Prayanto",
  },
  {
    uname: "novel",
    passwordHash: "password",
    division: "CONTROL",
    role: "KRU",
    name: "Novel Sang Ibu",
  },
];

const cakruName = [
  "Karol Yangqian Poetracahya",
  "Reyhan Nugraha Akbar",
  "Christella Cantika Putri",
  "Gregory Salman Ahmad",
  "Gabriel Tae Louk",
  "Mikhael Anacta Jogi Sinaga",
  "Reynaldo Nicholas Sianturi",
  "Agita Trinanda Ilmi",
  "Hanif Muhamad Assegaf",
  "Vaskorio Beta",
  "Chrissano Ariel Saputra",
  "Nathan Jovial Hartono",
  "Ikram Khalifman Trianzani",
  "Muhammad Rafi Wicaksana",
  "Raihan Maulana",
  "Muhammad Iqbal Gunawan",
  "Lionel Naythan Liu",
  "Ririn Amri Lestari",
];
const cakruUname = [
  "karol",
  "reyhan",
  "stella",
  "greg",
  "gabriel",
  "mikhael",
  "rey",
  "gita",
  "hanif",
  "vasko",
  "ano",
  "jovi",
  "ikram",
  "rafi",
  "han",
  "iqbal",
  "naythan",
  "ririn",
];
const cakruDivision: Division[] = [
  "CONTROL",
  "MECHANIC",
  "MECHANIC",
  "CONTROL",
  "CONTROL",
  "CONTROL",
  "CONTROL",
  "CONTROL",
  "CONTROL",
  "MECHANIC",
  "CONTROL",
  "CONTROL",
  "MECHANIC",
  "MECHANIC",
  "CONTROL",
  "MECHANIC",
  "CONTROL",
  "MANAGER",
];

async function main() {
  for (const user of kru) {
    const krus = await prisma.user.create({
      data: {
        uname: user.uname,
        passwordHash: await hash(user.passwordHash, 10),
        division: user.division,
        role: user.role,
        name: user.name,
      },
    });

    console.log(
      "name: ",
      krus.name,
      "uname: ",
      krus.uname,
      "role: ",
      krus.role,
    );
  }

  for (let i = 0; i < cakruName.length; i++) {
    const cakrus = await prisma.user.create({
      data: {
        uname: cakruUname[i]!,
        passwordHash: await hash("password", 10),
        division: cakruDivision[i] ?? "MECHANIC",
        role: "CAKRU",
        name: cakruName[i],
      },
    });

    console.log(
      "name: ",
      cakrus.name,
      "uname: ",
      cakrus.uname,
      "role: ",
      cakrus.role,
    );
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
