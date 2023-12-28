/*
  Warnings:

  - The primary key for the `Player` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the `Pokemon` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `email` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pokemon" DROP CONSTRAINT "Pokemon_playerId_fkey";

-- AlterTable
ALTER TABLE "Player" DROP CONSTRAINT "Player_pkey",
DROP COLUMN "id",
ADD COLUMN     "PokemonsID" INTEGER[],
ADD COLUMN     "email" TEXT NOT NULL,
ADD CONSTRAINT "Player_pkey" PRIMARY KEY ("email");

-- DropTable
DROP TABLE "Pokemon";
