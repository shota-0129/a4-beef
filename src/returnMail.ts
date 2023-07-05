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
      '\n\n上記の送られてきたメールに対して私からの返信を書きたいです。\n以下のJSON形式のフォーマットでメールを作成してください。\n{"subject": 返信メールの件名,"body": 返信メールの本文}';
    console.log(textForGPT);

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: textForGPT }],
    });

    if (completion.data.choices[0].message?.content === undefined) {
      alert('文章を取得できませんでした。');
      return { body: 'RETURN ERROR' };
    }

    const returnTextJsonString: string = completion.data.choices[0].message?.content;

    let returnText: { subject?: string; body?: string };

    try {
      returnText = JSON.parse(returnTextJsonString);
    } catch (error) {
      alert('JSON化に失敗しました。もう一度試してください');
      returnText = { body: 'JSON ERROR' };
    }

    if (returnText.body === undefined) returnText.body = '';

    returnText.body = returnText.body.replace(/\n/g, '<br>');

    return { body: returnText.body };
  } catch (error) {
    alert('OpenAIのAPIへの接続に失敗しました。\nAPIKeyに間違いがないか確認してください。');
    return { body: 'APIKEY ERROR' };
  }
}
