export type Configuration = {
  port: number;
  host: string;
  mongoUri: string;
  aws: AwsConfig;
};

export type AwsConfig = {
  s3Bucket: string;
  accessKey: string;
  accessSecret: string;
  region: string;
};
