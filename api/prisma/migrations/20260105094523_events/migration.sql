/*
  Warnings:

  - You are about to drop the column `appId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the `App` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `applicationId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "App" DROP CONSTRAINT "App_userId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_appId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "appId",
DROP COLUMN "name",
DROP COLUMN "path",
ADD COLUMN     "applicationId" TEXT NOT NULL,
ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "payload" JSONB;

-- DropTable
DROP TABLE "App";

-- CreateIndex
CREATE INDEX "ApiKey_applicationId_idx" ON "ApiKey"("applicationId");

-- CreateIndex
CREATE INDEX "Application_userId_idx" ON "Application"("userId");

-- CreateIndex
CREATE INDEX "Event_applicationId_createdAt_idx" ON "Event"("applicationId", "createdAt");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
