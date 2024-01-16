import browser from 'webextension-polyfill';

import store from '../app/store';
import { API_ENDPOINT, ERROR_MESSAGES } from '../constans';
import { bucket } from '../myBucket';
import { isDev } from '../shared/utils';

store.subscribe(() => {
  console.log('state', store.getState());
});

// background.ts
// background.js

// メッセージの受信
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'uploadFile') {
    const file: File = request.file;

    // APIリクエストをバックグラウンドスクリプトで処理
    sendApiRequest(file)
      .then((data) => {
        // 成功時の処理
        sendResponse({ success: true, data });
      })
      .catch((error) => {
        // エラー時の処理
        sendResponse({ success: false, error });
      });

    // 非同期処理のため、trueを返して後でsendResponseを呼び出す
    return true;
  }
});

// APIリクエストを送信する関数
async function sendApiRequest(file: File) {
  console.log(file);
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(API_ENDPOINT.CALCULATE, {
    method: 'POST',
    mode: 'cors',
    headers: {
      accept: 'application/json',
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw { status: response.status, detail: errorData.detail };
  }

  return response.json();
}

export {};
