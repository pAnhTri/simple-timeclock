/*
  Warnings:

  - You are about to drop the column `jit` on the `Token` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[jti]` on the table `Token` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `jti` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Token_jit_idx";

-- DropIndex
DROP INDEX "Token_jit_key";

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "jit",
ADD COLUMN     "jti" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Token_jti_idx" ON "Token"("jti");

-- CreateIndex
CREATE UNIQUE INDEX "Token_jti_key" ON "Token"("jti");
