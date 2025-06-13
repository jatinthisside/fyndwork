import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from '../config';

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });
  
  export const uploadToCloud = async (
    fileBuffer: Buffer,
    folder: string,
    resourceType: 'image' | 'auto' | 'raw' = 'auto'
  ): Promise<any> => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder, resource_type: resourceType },
        (error, result) => {
          if (error || !result) return reject(error);
          resolve(result.secure_url);
        }
      );
  
      Readable.from(fileBuffer).pipe(stream);
    });
  };