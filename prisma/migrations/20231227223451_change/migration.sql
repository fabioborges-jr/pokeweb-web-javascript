/*
  Warnings:

  - You are about to drop the column `PokemonsID` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "PokemonsID",
ADD COLUMN     "pokemonsID" INTEGER[];
