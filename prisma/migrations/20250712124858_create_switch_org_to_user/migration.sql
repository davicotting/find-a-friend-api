/*
  Warnings:

  - You are about to drop the column `orgId` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the `orgs` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_orgId_fkey";

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "orgId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "orgs";

-- CreateTable
CREATE TABLE "users" (
    "role" "Role" NOT NULL,
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "phone" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
