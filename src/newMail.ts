import { Configuration, OpenAIApi } from 'openai';

export async function newMail(apikey: string, text: string) {
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
    return 'ERROR';
  }

  return returnText.replace(/\n/g, '<br>');
}
