import React, { useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { bucket } from '../../../myBucket';
import { returnMail } from '../../../returnMail';

import ReturnEndicon from './Endicon_return';
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
    useful: true,
  });
  // const [isModalOpen, setModalOpen] = useState(false);

  const dragText = async () => {
    const selectedText = window.getSelection();
    if (selectedText === null) {
      await setButton({ ...button, display: 'none' });
      console.log('none');
      return;
    }
    console.log(selectedText.isCollapsed);
    console.log(selectedText.type);

    if (selectedText.isCollapsed) {
      await setButton({ ...button, display: 'none' });
      console.log('none');
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
        useful: true,
      });
      // console.log(selectedText.toString())
      // console.log("inline")
    } else {
      // 選択が解除されたらボタンを削除
      await setButton({ ...button, display: 'none' });
      console.log('none');
      return;
    }
    console.log(selectedText);
  };

  useEffect(() => {
    document.addEventListener('mouseup', dragText);
    return () => {
      document.removeEventListener('mouseup', dragText);
    };
  }, []);

  const handleSendClick = async () => {
    setButton({ ...button, useful: false });
    const mybucket = await bucket.get();
    const apikey = mybucket?.mail?.apikey;

    if (apikey === '' || apikey === undefined) {
      alert('PoPupからAPIKeyを入力してください');
    } else {
      const returnText: { body?: string } = await returnMail(apikey, requestText);
      const body = returnText.body ?? '';

      const textelement = document.querySelectorAll('[aria-label="メッセージ本文"]')[1];

      if (textelement != null) {
        textelement.insertAdjacentHTML('afterbegin', body);
      } else {
        alert(
          'メッセージを直接代入できませんでした。\n既存の返信ボタンを押して、返信のところを開いた状態で、お待ちください'
        );
      }
    }
    setButton({ ...button, useful: true });
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
          onClick={handleSendClick}
          sx={{ padding: 0, fontSize: '12px' }}
          disabled={!button.useful}
          endIcon={<ReturnEndicon is_connecting={!button.useful} />}
        >
          返信
        </Button>
      </Box>
      {/* {isModalOpen && <ModalMail requestText={requestText} />} */}
    </>
  );
};

export default ShowMail;
