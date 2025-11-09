/*
  Warnings:

  - You are about to drop the column `image_path` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `image_type` on the `Photo` table. All the data in the column will be lost.
  - Added the required column `path` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Photo" DROP CONSTRAINT "Photo_id_user_fkey";

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "image_path",
DROP COLUMN "image_type",
ADD COLUMN     "path" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;
