import { Configuration, OpenAIApi } from 'openai';

import { bucket, UserInformation } from '../../../../myBucket';
import { MailType } from '../Main';

export async function returnMail(apikey: string, text: string, model: string) {
  try {
    if (apikey === '' || apikey === undefined) return 'APIKEYUndifed';

    const configuration = new Configuration({
      // organization:"org-asd",
      apiKey: apikey,
    });

    // delete configuration.baseOptions.headers['User-Agent'];
    const mybucket = await bucket.get();
    const userinfo: UserInformation = {
      name: mybucket.user?.name ?? 'A',
      email: mybucket.user?.email ?? '',
      password: mybucket.user?.password ?? '',
      company: mybucket.user?.company ?? '',
      position: mybucket.user?.position ?? '',
    };
    const optiontext: string =
      '私は' +
      userinfo.company +
      userinfo.position +
      'の' +
      userinfo.name +
      'です。\n\n以下のメールが送られてきました。\n';

    const openai = new OpenAIApi(configuration);
    const textForGPT =
      optiontext +
      text +
      '\n\n上記の送られてきたメールに対して私からの返信を書きたいです。\n\n以下のJSON形式のデータを作成してください。\n\n{"subject": 作成した返信メールの件名,"body": 作成した返信メールの本文}';
    console.log(textForGPT);
    console.log(model);

    const completion = await openai.createChatCompletion({
      model: model,
      messages: [{ role: 'user', content: textForGPT }],
    });

    if (completion.data.choices[0].message?.content === undefined) return 'RETURNERROR';

    const returnTextJsonString: string = completion.data.choices[0].message?.content;

    let returnText: MailType;

    try {
      returnText = JSON.parse(returnTextJsonString);
    } catch (error) {
      console.log(returnTextJsonString);
      return 'JSONERROR';
    }

    if (returnText.body === undefined) returnText.body = '';

    returnText.body = returnText.body.replace(/\n/g, '<br>');

    return { body: returnText.body };
  } catch (error) {
    console.log(error);
    return 'APIKEY_OPENAI';
  }
}
