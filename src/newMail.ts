import { Configuration, OpenAIApi } from 'openai';

import { bucket, UserInformation } from './myBucket';

export async function newMail(apikey: string, text: string) {
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
      '私は' + userinfo.company + userinfo.position + userinfo.name + 'です。\n';

    const openai = new OpenAIApi(configuration);
    const textForGPT =
      optiontext +
      text +
      '\n以下のJSON形式のフォーマットでメールを作成してください。\n{"subject": メールの件名, "body": メールの本文}';
    console.log(textForGPT);
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: textForGPT }],
    });

    if (completion.data.choices[0].message?.content === undefined) {
      alert('文章を取得できませんでした。');
      return { subject: '', body: 'RETURN ERROR' };
    }

    const returnTextJsonString: string = completion.data.choices[0].message?.content;

    let returnText: { subject?: string; body?: string };

    try {
      returnText = JSON.parse(returnTextJsonString);
    } catch (error) {
      alert('JSON化に失敗しました。もう一度試してください');
      returnText = { subject: '', body: 'JSON ERROR' };
    }

    if (returnText.body === undefined) returnText.body = '';

    returnText.body = returnText.body.replace(/\n/g, '<br>');

    return returnText;
  } catch (error) {
    alert('OpenAIのAPIへの接続に失敗しました。\nAPIKeyに間違いがないか確認してください。');
    return { subject: '', body: 'APIKEY ERROR' };
  }
}
