import browser from 'webextension-polyfill';

import store from '../app/store';
import { bucket, MailOption } from '../myBucket';
import { isDev } from '../shared/utils';

store.subscribe(() => {
  console.log('state', store.getState());
});

export {};
