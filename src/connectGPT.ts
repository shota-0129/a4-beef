import { Configuration, OpenAIApi } from 'openai';

export default async function connectGPT(apikey: string, text: string) {
  const configuration = new Configuration({
    // organization:"org-asd",
    apiKey: apikey,
  });

  // delete configuration.baseOptions.headers['User-Agent'];

  const openai = new OpenAIApi(configuration);
  console.log(text);
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: text }],
    max_tokens: 200,
  });

  return completion.data.choices[0].message?.content;
}
