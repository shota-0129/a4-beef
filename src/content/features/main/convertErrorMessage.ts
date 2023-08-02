/**
 * エラーコードからエラーメッセージを返す
 *
 * @param errorText エラーコード
 * @returns errorMessage エラーメッセージ
 */
export const convertErrorMessage = (errorText: string): string => {
  switch (errorText) {
    case 'NoApiKey':
      return 'サーバーでエラーが発生しました。\n 管理者までご連絡下さい';
    case 'NoRequestText':
      return '入力欄が空です。';
    case 'NoModelType':
      return 'サーバーでエラーが発生しました。\n  管理者までご連絡下さい';
    case 'GPTError':
      return 'ChatGPTでエラーが発生しました。\n もう一度お試し下さい';
    case 'JSONParseError':
      return 'ChatGPTでエラーが発生しました。\n もう一度お試し下さい';
    case 'APIError':
      return 'サーバーでエラーが発生しました。\n しばらく時間をおいてからもう一度お試しください。';
    default:
      return '不明なエラーが発生しました。\n しばらく時間をおいてからもう一度お試しください。';
  }
};
