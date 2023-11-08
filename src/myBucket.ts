import { getBucket } from '@extend-chrome/storage';

export interface MyBucket {
  userID: string;
  password: string;
  tasks: Task[];
}

export interface Task {
  course_name: string;
  content_category: string;
  content_title: string;
  deadline: Date;
}

export const bucket = getBucket<MyBucket>('my_bucket', 'sync');
