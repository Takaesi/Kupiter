/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Ad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Ad` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ad" DROP CONSTRAINT "Ad_categoryId_fkey";

-- AlterTable
ALTER TABLE "Ad" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL;

-- DropTable
DROP TABLE "Category";
