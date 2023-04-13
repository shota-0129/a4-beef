import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Popup = (): React.ReactElement => {
  const [text, setText] = useState('');

  const handleTextChange = (e: any) => {
    setText(e.target.value);
  };

  const handleSend = () => {
    alert(text);
  };

  document.body.style.width = '25rem';
  document.body.style.height = '20rem';
  return (
    <div className="popup-container">
      <h1>以下にどんなメールを書きたいか打ち込んでください</h1>
      <Textarea color="primary" minRows={3} onChange={handleTextChange} value={text} />
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" startIcon={<DeleteIcon />}>
          削除
        </Button>
        <Button variant="contained" onClick={handleSend} endIcon={<SendIcon />}>
          送信
        </Button>
      </Stack>
    </div>
  );
};

export default Popup;
