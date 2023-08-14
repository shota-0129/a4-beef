import React from 'react';
import Box from '@mui/material/Box';

import styles from './popup.module.css';

const Optionpopup = (): React.ReactElement => {
  const copyTextToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  return (
    <Box fontSize={12}>
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
