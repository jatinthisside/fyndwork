import sharp from 'sharp';

export const compressImage = async (buffer: Buffer): Promise<Buffer> => {
  return sharp(buffer)
    .resize({ width: 800 }) // Resize width to 800px, maintain aspect ratio
    .jpeg({ quality: 70 })  // Compress with 70% quality
    .toBuffer();
};