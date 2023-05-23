import React from 'react';
import Box from '@mui/material/Box';

import styles from './popup.module.css';

const Optionpopup = (): React.ReactElement => {
  const copyTextToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  return (
    <Box sx={{ m: 2 }} fontSize={12}>
      <div>追加いただきありがとうございます！</div>
      <div>
        ※使い方は
        <a
          target="_blank"
          href="https://qiita.com/TK_WebSE/items/33f599951eff624a7d8a"
          className={styles.url}
          rel="noreferrer"
        >
          こちら
        </a>
        をご覧ください。
      </div>
      <Box sx={{ my: 2 }}>
        <div>製作者は、25卒で絶賛就活中です。</div>
        <div>
          興味を持っていただけた方は、GmailGPTを使って、
          <button
            onClick={() => copyTextToClipboard('shota.mizusaki.01@gmail.com')}
            className={styles.url}
          >
            shota.mizusaki.01@gmail.com
          </button>
          （クリックでコピー）までご連絡ください！
        </div>
      </Box>
    </Box>
  );
};

export default Optionpopup;
