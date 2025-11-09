/*
  Warnings:

  - You are about to drop the column `path` on the `Photo` table. All the data in the column will be lost.
  - Added the required column `image_path` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_type` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Made the column `id_user` on table `Photo` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Photo" DROP CONSTRAINT "Photo_id_user_fkey";

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "path",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image_path" TEXT NOT NULL,
ADD COLUMN     "image_type" TEXT NOT NULL,
ALTER COLUMN "id_user" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
