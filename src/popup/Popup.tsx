import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import './Popup.css';

const Popup = (): React.ReactElement => {
  const [text, setText] = useState('');

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSend = () => {
    console.log('#####');
    console.log(text);
  };

  return (
    <div className="popup-container">
      <h1>以下にどんなメールを書きたいか打ち込んでください</h1>
      <input type="text" value={text} onChange={handleTextChange} />
      {/* <Stack direction="row" spacing={2}>
        <Button variant="outlined" startIcon={<DeleteIcon />}>
          削除
        </Button>
        <Button variant="contained" endIcon={<SendIcon />} onClick={handleSend}>
          送信
        </Button>
      </Stack> */}
    </div>
  );
};

export default Popup;
