-- CreateTable
CREATE TABLE "UserDetails" (
    "id_user_details" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "UserDetails_pkey" PRIMARY KEY ("id_user_details")
);

-- CreateTable
CREATE TABLE "User" (
    "id_user" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "id_user_details" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "BikeCard" (
    "id_bike_card" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_type" TEXT NOT NULL,
    "photo_path" TEXT,

    CONSTRAINT "BikeCard_pkey" PRIMARY KEY ("id_bike_card")
);

-- CreateTable
CREATE TABLE "GearPart" (
    "id_gear_part" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "purchase_date" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "value" INTEGER,
    "comment" TEXT,

    CONSTRAINT "GearPart_pkey" PRIMARY KEY ("id_gear_part")
);

-- CreateTable
CREATE TABLE "Trip" (
    "id_trip" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT,
    "distance" INTEGER NOT NULL,
    "elevation" INTEGER,
    "description" TEXT,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id_trip")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id_photo" SERIAL NOT NULL,
    "id_user" INTEGER,
    "path" TEXT NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id_photo")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_user_details_fkey" FOREIGN KEY ("id_user_details") REFERENCES "UserDetails"("id_user_details") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BikeCard" ADD CONSTRAINT "BikeCard_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GearPart" ADD CONSTRAINT "GearPart_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;
