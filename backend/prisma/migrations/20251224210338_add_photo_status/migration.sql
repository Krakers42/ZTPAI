/*
  Warnings:

  - You are about to drop the column `created_at` on the `Photo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "created_at",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending';
