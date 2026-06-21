/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Profile_phone_key" ON "Profile"("phone");
