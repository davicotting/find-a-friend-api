/*
  Warnings:

  - You are about to drop the column `cityName` on the `pets` table. All the data in the column will be lost.
  - Added the required column `cityId` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_cityName_fkey";

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "cityName",
ADD COLUMN     "cityId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
