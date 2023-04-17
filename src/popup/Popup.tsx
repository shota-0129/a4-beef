import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Textarea from '@mui/joy/Textarea';
import Box from '@mui/material/Box';
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

  const handleDelete = () => {
    setText('');
  };
  return (
    <div>
      <Box sx={{ m: 2 }}>
        以下にどんなメールを書きたいか打ち込んでください
        <Textarea
          color="primary"
          minRows={3}
          onChange={handleTextChange}
          value={text}
          sx={{ my: 2 }}
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
    </div>
  );
};

export default Popup;
