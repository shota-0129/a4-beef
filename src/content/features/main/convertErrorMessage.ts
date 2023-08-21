/**
 * エラーコードからエラーメッセージを返す
 *
 * @param errorText エラーコード
 * @returns errorMessage エラーメッセージ
 */
export const convertErrorMessage = (errorText: string): string => {
  switch (errorText) {
    case 'NoApiKey':
      return 'An error has occurred on the server.\nPlease contact the administrator for assistance.';
    case 'NoRequestText':
      return 'The input field is empty.';
    case 'NoModelType':
      return 'An error has occurred on the server.\nPlease contact the administrator for assistance.';
    case 'GPTError':
      return 'An error has occurred with ChatGPT.\nPlease try again.';
    case 'JSONParseError':
      return 'An error has occurred with ChatGPT.\nPlease try again.';
    case 'APIError':
      return 'An error has occurred on the server.\nPlease wait for a while and try again.';
    case 'NofreeTier':
      return 'You have exhausted the free usage limit.\nPlease switch to the billing mode.';
    case 'APIKEYUndifed':
      return 'Please input the APIKey from the popup.';
    case 'RETURNERROR':
      return 'Failed to fetch the text.';
    case 'JSONERROR':
      return 'Editing failed.\nPlease try again.';
    case 'APIKEY_OPENAI':
      return 'Failed to connect to the OpenAI API.\nThe APIKey might have expired. Please check the usage instructions from the icon in the upper-right corner.';
    case 'ImportERROR':
      return 'Direct assignment of the message was not possible.\nPress the create button, open a new message, and wait.';
    default:
      return 'An unknown error has occurred.\nPlease wait for a while and try again.';
  }
};
