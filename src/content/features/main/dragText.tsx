import React, { useEffect, useState } from 'react';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import ModalMail from './ModalMail';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const ShowMail = () => {
  const [requestText, setText] = useState('');
  const [button, setButton] = useState({
    display: 'none',
    top: 0,
    left: 0,
  });
  const [isModalOpen, setModalOpen] = useState(false);

  const dragText = () => {
    const selectedText = window.getSelection();
    if (selectedText === null) {
      setButton({ ...button, display: 'none' });
      return;
    }
    if (selectedText.toString()) {
      setText(selectedText.toString().trim());

      // ボタンを選択テキストの下に挿入
      const range = selectedText.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setButton({
        display: 'inline',
        top: rect.bottom * 1.01,
        left: rect.left,
      });
      // console.log(selectedText.toString())
      // console.log("inline")
    } else {
      // 選択が解除されたらボタンを削除
      setButton({ ...button, display: 'none' });
      // console.log("none")
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', dragText);
    return () => {
      document.removeEventListener('mouseup', dragText);
    };
  }, []);

  const handleClick = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <>
      <Box
        component="div"
        sx={{
          display: button.display,
          position: 'absolute',
          top: button.top,
          left: button.left,
          zIndex: 'modal',
          padding: 0,
        }}
      >
        <Button
          variant="contained"
          onClick={handleClick}
          sx={{ padding: 0, fontSize: '12px' }}
          endIcon={<KeyboardReturnIcon />}
        >
          返信
        </Button>
      </Box>
      {isModalOpen && <ModalMail requestText={requestText} />}
    </>
  );
};

export default ShowMail;
