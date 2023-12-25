-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pokemon" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pokemon" ADD CONSTRAINT "Pokemon_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;
