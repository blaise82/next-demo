/*
  Warnings:

  - Changed the type of `name` on the `countries` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `year` on the `countries` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `area` on the `countries` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `population` on the `countries` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "countries" DROP COLUMN "name",
ADD COLUMN     "name" INTEGER NOT NULL,
DROP COLUMN "year",
ADD COLUMN     "year" INTEGER NOT NULL,
DROP COLUMN "area",
ADD COLUMN     "area" INTEGER NOT NULL,
DROP COLUMN "population",
ADD COLUMN     "population" INTEGER NOT NULL;
