/*
  Warnings:

  - You are about to drop the column `userId` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `coverImageUrl` on the `Trip` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "coverImageUrl",
ADD COLUMN     "fileName" TEXT,
ADD COLUMN     "originalFileName" TEXT;
