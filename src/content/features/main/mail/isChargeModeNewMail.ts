import axios, { AxiosResponse } from 'axios';

import { bucket, UserInformation } from '../../../../myBucket';
import { MailType } from '../Main';

type Props = {
  reqText: string;
  model: string;
};

type ReturnType = string | MailType;

export const isChargeModeNewMail = async ({ reqText, model }: Props): Promise<ReturnType> => {
  const myBucket = await bucket.get();

  if (myBucket.mail.freeTier < 1) return 'NofreeTier';

  const userinfo: UserInformation = {
    name: myBucket.user?.name ?? 'A',
    email: myBucket.user?.email ?? '',
    password: myBucket.user?.password ?? '',
    company: myBucket.user?.company ?? '',
    position: myBucket.user?.position ?? '',
  };

  const optionText = '私は' + userinfo.company + userinfo.position + userinfo.name + 'です。\n';

  const textForGPT =
    optionText +
    reqText +
    '\n上記の新規メールを考えて欲しいです。\n以下のJSON形式のデータを作成してください。。\n\n{"subject": メールの件名, "body": メールの本文}';

  /**
   * GPTのAPIを呼び出すためのAPI
   *
   * @param reqText リクエストテキスト
   * @param modelType モデルタイプ
   *
   * @returns GPTのレスポンス
   */
  try {
    const res: AxiosResponse<ReturnType> = await axios.get(
      `https://callgpt-kyamxpe3gq-uc.a.run.app?reqText=${textForGPT}&modelType=${model}`
    );
    const data = res.data;

    if (typeof data === 'string') {
      return data;
    }

    if (data.body === undefined) data.body = '';

    data.body = data.body.replace(/\n/g, '<br>');

    return data;
  } catch (e) {
    console.log(e);
    return 'APIError';
  }
};
