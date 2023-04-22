import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Textarea from '@mui/joy/Textarea';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import connectGPT from '../../../connectGPT';
import { bucket } from '../../../myBucket';

export function Counter() {
  const [texts, setTexts] = useState({
    sendText: '',
    returnText: '',
  });

  const handleTextChange = async (event: any) => {
    setTexts({ ...texts, sendText: event.target.value });
    await bucket.set({ targetSendText: event.target.value });
  };

  const handleSend = async () => {
    const mybucket = await bucket.get();
    const apikey = mybucket.apiKey.toString();
    const returnText = await connectGPT(apikey, texts.sendText);
    await bucket.set({ targetReturnText: returnText });
    const textelement = document.querySelectorAll('[aria-label="メッセージ本文"]')[1];
    console.log(textelement);
    if (textelement != null) {
      textelement.insertAdjacentHTML('afterbegin', returnText);
    }
  };

  const handleDelete = () => {
    setTexts({ ...texts, sendText: '' });
  };

  // const inputText = async () => {
  //   const textelement = document.querySelectorAll('[aria-label="メッセージ本文"]')[1];
  //   console.log(textelement);
  //   const text = (await bucket.get()).targetReturnText;
  //   if (textelement != null) {
  //     textelement.insertAdjacentHTML('afterbegin', text);
  //   }
  // };

  return (
    <div>
      <Box sx={{ m: 2 }}>
        以下にどんなメールを書きたいか打ち込んでください
        <Textarea
          color="primary"
          minRows={5}
          maxRows={5}
          onChange={handleTextChange}
          value={texts.sendText}
          sx={{ my: 2 }}
          size="sm"
        />
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          {/* <Button variant="outlined" onClick={handleDelete} startIcon={<DeleteIcon />}>
            削除
          </Button> */}
          <Button variant="contained" onClick={handleSend} endIcon={<SendIcon />}>
            お願いGPT
          </Button>
        </Stack>
        {/* <Box sx={{ m: 2 }}>
          以下が返答になります。
          <Textarea 
            color="primary" 
            minRows={5}
            maxRows={5}
            value={texts.returnText} 
            sx={{ my: 2 }} 
            size="sm" />
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="contained" onClick={inputText}>
              挿入
            </Button>
          </Stack>
        </Box> */}
      </Box>
    </div>
  );
}
