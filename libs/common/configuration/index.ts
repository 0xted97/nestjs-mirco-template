import { Configuration } from './types';
export const configuration = (): Configuration => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  host: process.env.HOST,
  mongoUri: process.env.MONGO_URI,
  aws: {
    s3Bucket: process.env.AWS_S3_BUCKET,
    accessKey: process.env.AWS_ACCESS_KEY,
    accessSecret: process.env.AWS_ACCESS_SECRET,
    region:  process.env.AWS_S3_REGION,
  },
});
