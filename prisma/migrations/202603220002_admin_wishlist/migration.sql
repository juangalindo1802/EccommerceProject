-- AlterTable
ALTER TABLE "User"
ADD COLUMN "isAdmin" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "WishlistItem" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "WishlistItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WishlistItem_userId_productId_key" ON "WishlistItem"("userId", "productId");
CREATE INDEX "WishlistItem_userId_idx" ON "WishlistItem"("userId");
CREATE INDEX "WishlistItem_productId_idx" ON "WishlistItem"("productId");

-- AddForeignKey
ALTER TABLE "WishlistItem"
ADD CONSTRAINT "WishlistItem_userId_fkey"
FOREIGN KEY ("userId")
REFERENCES "User"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE "WishlistItem"
ADD CONSTRAINT "WishlistItem_productId_fkey"
FOREIGN KEY ("productId")
REFERENCES "Product"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;

