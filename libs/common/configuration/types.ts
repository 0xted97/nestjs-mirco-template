export type TConfiguration = {
  mongoUri: string;
  aws: TAwsConfig;
  kafka: TKafka,
  services?: {
    "user-gateway"?: TService,
    "auth"?: TService,
  }
};

export type TAwsConfig = {
  s3Bucket: string;
  accessKey: string;
  accessSecret: string;
  region: string;
};

export type TService = {
  host: string;
  port: string;
};

export type TKafka = {
  brokers: string[];
};
