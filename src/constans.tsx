// constants.ts
export const API_ENDPOINT = {
  REGISTER: 'https://7vm383jm7d.execute-api.ap-northeast-1.amazonaws.com/prod/register',
  DELETE: 'https://7vm383jm7d.execute-api.ap-northeast-1.amazonaws.com/prod/delete',
  REQUEST:
    'https://script.google.com/macros/s/AKfycbx2jImeliw_ZNlb2MaO7aSflcEtIzZ3ed6mV6RvawIbd5kxRXvoXG1q-ofdLQrJFZ8Wsw/exec',
  CALCULATE: 'https://7vm383jm7d.execute-api.ap-northeast-1.amazonaws.com/prod/calculate_credit',
};

export const ERROR_MESSAGES = {
  LOGIN_ID_REQUIRED: 'ログインIDを入力してください',
  PASSWORD_REQUIRED: 'パスワードを入力してください',
  NETWORK_ERROR: 'ネットワークエラーが発生しました',
  SERVER_ERROR: 'サーバーエラーが発生しました',
  CONTACT_MANAGER: 'エラー:運営者(shota.mizusaki.01@gmail.com)に連絡してください。',
};
