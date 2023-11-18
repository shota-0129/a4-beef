import { getBucket } from '@extend-chrome/storage';

export interface MyBucket {
  login_id: string;
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
