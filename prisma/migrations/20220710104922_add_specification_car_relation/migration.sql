-- CreateTable
CREATE TABLE "SpecificationsOnCars" (
    "specification_id" TEXT NOT NULL,
    "car_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpecificationsOnCars_pkey" PRIMARY KEY ("car_id","specification_id")
);

-- AddForeignKey
ALTER TABLE "SpecificationsOnCars" ADD CONSTRAINT "SpecificationsOnCars_specification_id_fkey" FOREIGN KEY ("specification_id") REFERENCES "Specifications"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "SpecificationsOnCars" ADD CONSTRAINT "SpecificationsOnCars_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Cars"("id") ON DELETE SET NULL ON UPDATE SET NULL;
