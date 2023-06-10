import { Configuration, OpenAIApi } from 'openai';

export async function newMail(apikey: string, text: string) {
  try {
    const configuration = new Configuration({
      // organization:"org-asd",
      apiKey: apikey,
    });

    // delete configuration.baseOptions.headers['User-Agent'];

    const openai = new OpenAIApi(configuration);
    const textForGPT =
      text + '\n以下のフォーマットでメールを書いてください。\n\n件名:〇〇\n\n本文:〇〇';
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

    return returnText.replace(/\n/g, '<br>');
  } catch (error) {
    alert('OpenAIのAPIへの接続に失敗しました。\nAPIKeyに間違いがないか確認してください。');
    return 'ERROR';
  }
}
