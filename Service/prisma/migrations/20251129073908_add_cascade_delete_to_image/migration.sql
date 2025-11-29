-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_adId_fkey";

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_adId_fkey" FOREIGN KEY ("adId") REFERENCES "Ad"("id") ON DELETE CASCADE ON UPDATE CASCADE;
