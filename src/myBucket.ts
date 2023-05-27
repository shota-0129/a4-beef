import { getBucket } from '@extend-chrome/storage';

interface MyBucket {
  targetSendText: string;
  targetReturnText: any;
  userName: string;
  password: string;
  apiKey: string;
}

export const bucket = getBucket<MyBucket>('my_bucket', 'sync');
