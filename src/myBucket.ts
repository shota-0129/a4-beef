import { getBucket } from '@extend-chrome/storage';

export interface MyBucket {
  login_id: string;
  password: string;
  isApproval: boolean;
}

export interface ScoreData {
  subjects: SubjectInfo[];
  canGraduate: boolean;
  referenceUrl: string;
}

export interface SubjectInfo {
  name: string;
  requiredCredits: number;
  earnedCredits: number;
  remainingCredits: number;
}

export const bucket = getBucket<MyBucket>('my_bucket', 'sync');
