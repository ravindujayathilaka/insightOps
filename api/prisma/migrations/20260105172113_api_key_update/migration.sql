-- AlterTable
ALTER TABLE "ApiKey" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "revokedAt" TIMESTAMP(3);
