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
  const container = document.createElement('my-extension-root');
  document.body.append(container);

  // createRoot を使用して `component` をレンダリングします。
  createRoot(container).render(component);
});

// レンダリングするコンポーネントとプロキシストアを受け取り、プロキシストアが使用可能になるまで待機してから `Provider` を返す関数です。
async function withProxyStore(children: ReactElement, proxyStore: Store): Promise<ReactElement> {
  return proxyStore.ready().then(() => {
    return <Provider store={proxyStore}>{children}</Provider>;
  });
}
