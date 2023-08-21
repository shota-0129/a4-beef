import axios, { AxiosResponse } from 'axios';

import { bucket, UserInformation } from '../../../../myBucket';
import { MailType } from '../Main';

type Props = {
  reqText: string;
  model: string;
};

type ReturnType = string | MailType;

export const isChargeModeReturnMail = async ({ reqText, model }: Props): Promise<ReturnType> => {
  const myBucket = await bucket.get();
  if (myBucket.mail.freeTier < 1) return 'NofreeTier';

  const userinfo: UserInformation = {
    name: myBucket.user?.name ?? 'A',
    email: myBucket.user?.email ?? '',
    password: myBucket.user?.password ?? '',
    company: myBucket.user?.company ?? '',
    position: myBucket.user?.position ?? '',
  };

  const optionText =
    "I'm " + userinfo.name + ' in ' + userinfo.position + ' of ' + userinfo.company + '.\n';

  const textForGPT =
    optionText +
    reqText +
    '\nI want you to write a reply to the above email.\nFollow these settings.Output must be JSON data and in the same language as the email to which you are replying, keys for JSON data must be in lowercase and only be subject and body.\n\nOutput: {"subject": subject of email, "body": body of email}';

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

    return { body: data.body };
  } catch (e) {
    console.log(e);
    return 'APIError';
  }
};
