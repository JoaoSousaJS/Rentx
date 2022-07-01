-- CreateTable
CREATE TABLE "Cars" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "daily_rate" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "license_plate" TEXT NOT NULL,
    "fine_amount" INTEGER NOT NULL,
    "brand" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cars_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cars_name_key" ON "Cars"("name");

-- AddForeignKey
ALTER TABLE "Cars" ADD CONSTRAINT "Cars_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE SET NULL;
