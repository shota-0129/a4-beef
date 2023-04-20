import React, { useState } from 'react';
import { getBucket } from '@extend-chrome/storage';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Textarea from '@mui/joy/Textarea';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import connectGPT from '../connectGPT';

interface MyBucket {
  targetSendText: string;
  targetReturnText: any;
}

export const bucket = getBucket<MyBucket>('my_bucket', 'sync');

const Popup = (): React.ReactElement => {
  const [texts, setTexts] = useState({
    sendText: '',
    returnText: '',
  });

  const handleTextChange = async (event: any) => {
    setTexts({ ...texts, sendText: event.target.value });
    await bucket.set({ targetSendText: event.target.value });
  };

  const handleSend = async () => {
    const returnText = await connectGPT(import.meta.env.VITE_OPENAI_API_KEY, texts.sendText);
    await bucket.set({ targetReturnText: returnText });
    const message = await bucket.get();
    setTexts({ ...texts, returnText: message.targetReturnText });
  };

  const handleDelete = () => {
    setTexts({ ...texts, sendText: '' });
  };

  const inputText = () => {
    const textelement = document.querySelectorAll('[aria-label="メッセージ本文"]');
    console.log(textelement);
    const text = '<div>成功！</div>';
    if (textelement != null) {
      //textelement.insertAdjacentHTML('afterbegin',text);
    }
  };

  return (
    <div>
      <Box sx={{ m: 2 }}>
        以下にどんなメールを書きたいか打ち込んでください
        <Textarea
          color="primary"
          minRows={3}
          onChange={handleTextChange}
          value={texts.sendText}
          sx={{ my: 2 }}
          size="sm"
        />
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="outlined" onClick={handleDelete} startIcon={<DeleteIcon />}>
            削除
          </Button>
          <Button variant="contained" onClick={handleSend} endIcon={<SendIcon />}>
            送信
          </Button>
        </Stack>
      </Box>
      <Box sx={{ m: 2 }}>
        以下が返答になります。
        <Textarea color="primary" minRows={3} value={texts.returnText} sx={{ my: 2 }} size="sm" />
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="contained" onClick={inputText}>
            挿入
          </Button>
        </Stack>
      </Box>
    </div>
  );
};

export default Popup;
