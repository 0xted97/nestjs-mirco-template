import { TConfiguration } from './types';
export const configuration = (): TConfiguration => ({
  mongoUri: process.env.MONGO_URI,
  kafka: {
    brokers: [process.env.KAFKA_HOST],
  },
  services: {
    "user-gateway": {
      host: process.env.USER_GATEWAY_HOST,
      port: process.env.USER_GATEWAY_PORT,
    },
    auth: {
      host: process.env.AUTH_HOST,
      port: process.env.AUTH_PORT,
    }
  },
  aws: {
    s3Bucket: process.env.AWS_S3_BUCKET,
    accessKey: process.env.AWS_ACCESS_KEY,
    accessSecret: process.env.AWS_ACCESS_SECRET,
    region:  process.env.AWS_S3_REGION,
  },
});

export * from './types';