import React, { ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Store } from '@eduardoac-skimlinks/webext-redux';

import { proxyStore as store } from '../app/proxyStore';

import Content from './Content';

// withProxyStore 関数によって、`Provider` を作成し、プロキシストアを渡します。
// `Content` コンポーネントはこの `Provider` の下でレンダリングされます。
withProxyStore(<Content />, store).then((component) => {
  // コンテンツスクリプトのルート要素を作成します。
  // 既存の <div class="container clearfix"> 要素を取得
  const existingFooter = document.querySelector('#func-page-footer');
  if (existingFooter) {
    // createRoot を使用して `component` をレンダリング
    createRoot(existingFooter).render(component);
  } else {
    // エラーハンドリング: 要素が見つからない場合の処理
    console.error('要素が見つかりませんでした');
  }
});

// レンダリングするコンポーネントとプロキシストアを受け取り、プロキシストアが使用可能になるまで待機してから `Provider` を返す関数です。
async function withProxyStore(children: ReactElement, proxyStore: Store): Promise<ReactElement> {
  return proxyStore.ready().then(() => {
    return <Provider store={proxyStore}>{children}</Provider>;
  });
}
