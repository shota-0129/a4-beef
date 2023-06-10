import { getBucket } from '@extend-chrome/storage';

export interface UserInformation {
  name: string;
  email: string;
  password: string;
  company: string;
  position: string;
}

export interface MailOption {
  sendtext: string;
  returntext: string;
  apikey: string;
}

export interface MyBucket {
  user: UserInformation;
  mail: MailOption;
}

export const bucket = getBucket<MyBucket>('my_bucket', 'sync');
