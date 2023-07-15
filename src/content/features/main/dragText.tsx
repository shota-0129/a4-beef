import React, { useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { bucket } from '../../../myBucket';

import { returnMail } from './mail/returnMail';
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
  });
  const [isUseful, setUseful] = useState(true);

  // const [isModalOpen, setModalOpen] = useState(false);

  const dragText = async () => {
    const selectedText = window.getSelection();
    if (selectedText === null) {
      await setButton({ ...button, display: 'none' });
      console.log('none');
      return;
    }

    if (selectedText.toString() != '') {
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
      await setButton({ ...button, display: 'none' });
      console.log('none');
      return;
    }
    console.log(selectedText);
  };

  useEffect(() => {
    const handleDocumentMouseUp = () => {
      setTimeout(() => dragText(), 10);
    };

    document.addEventListener('mouseup', handleDocumentMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleDocumentMouseUp);
    };
  }, []);

  const handleSendClick = async () => {
    setUseful(false);
    const mybucket = await bucket.get();
    const apikey = mybucket?.mail?.apikey;
    const model = mybucket?.mail?.model ?? 'gpt-3.5-turbo';

    if (apikey === '' || apikey === undefined) {
      alert('PoPupからAPIKeyを入力してください');
    } else {
      const returnText: { body?: string } = await returnMail(apikey, requestText, model);
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
    setUseful(true);
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
          disabled={!isUseful}
          endIcon={<ReturnEndicon is_connecting={!isUseful} />}
        >
          返信
        </Button>
      </Box>
      {/* {isModalOpen && <ModalMail requestText={requestText} />} */}
    </>
  );
};

export default ShowMail;
