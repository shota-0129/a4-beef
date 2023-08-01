import React from 'react';
import Box from '@mui/material/Box';

import styles from './popup.module.css';

const Optionpopup = (): React.ReactElement => {
  const copyTextToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  return (
    <Box fontSize={12}>
      <div>追加いただきありがとうございます！</div>
      <div>
        ※使い方は
        <a
          target="_blank"
          href="https://drive.google.com/file/d/1j35RQQj6CO7hf-RTnms5dV5c-oSVhJdn/view?usp=sharing"
          className={styles.url}
          rel="noreferrer"
        >
          こちら
        </a>
        をご覧ください。
      </div>
      <Box>
        <div>製作者は、25卒で絶賛就活中です。</div>
        <div>
          興味を持っていただけた方は、メール作成アシスト powered by GPT-3.5を使って、
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
