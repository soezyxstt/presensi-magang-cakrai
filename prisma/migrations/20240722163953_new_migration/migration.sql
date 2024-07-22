/*
  Warnings:

  - Added the required column `status` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PRESENT', 'ABSENT', 'LATE');

-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "status" "Status" NOT NULL;
