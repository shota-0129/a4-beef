import { Configuration, OpenAIApi } from 'openai';

import { bucket, UserInformation } from './myBucket';

export async function returnMail(apikey: string, text: string) {
  try {
    const configuration = new Configuration({
      // organization:"org-asd",
      apiKey: apikey,
    });

    // delete configuration.baseOptions.headers['User-Agent'];
    const mybucket = await bucket.get();
    const userinfo: UserInformation = {
      name: mybucket.user.name !== undefined ? mybucket.user.name : 'A',
      email: mybucket.user.email !== undefined ? mybucket.user.email : '',
      password: mybucket.user.password !== undefined ? mybucket.user.password : '',
      company: mybucket.user.company !== undefined ? mybucket.user.company : '〇〇株式会社',
      position: mybucket.user.position !== undefined ? mybucket.user.position : '〇〇担当',
    };
    const optiontext: string =
      '私は' +
      userinfo.company +
      'の' +
      userinfo.position +
      'の' +
      userinfo.name +
      'です。\n\n以下のメールが送られてきました。\n';

    const openai = new OpenAIApi(configuration);
    const textForGPT =
      optiontext +
      text +
      '\n\n上記の送られてきたメールに対して私からの返信を書きたいです。\n件名は書かず以下のフォーマットでメールを書いてください。\n\n本文:〇〇';
    console.log(textForGPT);

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: textForGPT }],
    });

    const returnText = completion.data.choices[0].message?.content;

    console.log(returnText);

    if (returnText === undefined) {
      alert('文章を取得できませんでした。');
      return 'ERROR';
    }

    return returnText;
  } catch (error) {
    alert('OpenAIのAPIへの接続に失敗しました。\nAPIKeyに間違いがないか確認してください。');
    return 'ERROR';
  }
}
