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
        <div>
          The creator is a recent graduate (Class of 25) and currently actively job hunting.
        </div>
        <div>
          If you are interested, please use the Email Creation Assist powered by GPT-3.5 to reach
          out to:
          <button
            onClick={() => copyTextToClipboard('shota.mizusaki.01@gmail.com')}
            className={styles.url}
          >
            shota.mizusaki.01@gmail.com
          </button>
          (Click to copy).
        </div>
      </Box>
    </Box>
  );
};

export default Optionpopup;
