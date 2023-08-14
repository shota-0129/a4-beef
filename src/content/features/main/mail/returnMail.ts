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
      "I'm " +
      userinfo.name +
      'in' +
      userinfo.position +
      'of' +
      userinfo.company +
      '.\n\nThe following email was sent.\n';

    const openai = new OpenAIApi(configuration);
    const textForGPT =
      optiontext +
      text +
      '\nI want you to write a reply to the above email.\nFollow these settings.Output must be JSON data and in the same language as the email to which you are replying, keys for JSON data must be in lowercase and only be subject and body.\n\nOutput: {"subject": subject of email, "body": body of email}';

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
