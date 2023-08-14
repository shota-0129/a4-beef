import React, { useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { convertErrorMessage } from '../../../content/features/main/convertErrorMessage';
import ReturnEndicon from '../../../content/features/main/Endicon_return';
import { isChargeModeReturnMail } from '../../../content/features/main/mail/isChargeModeReturnMail';
import { returnMail } from '../../../content/features/main/mail/returnMail';
import { MailType } from '../../../content/features/main/Main';
import { isChargeModeFn } from '../../../isChargeModeBucket';
import { bucket, MailOption } from '../../../myBucket';

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

  const { getIsChargeMode } = isChargeModeFn();

  const handleSendClick = async () => {
    setUseful(false);
    const mybucket = await bucket.get();
    const isChargeMode = await getIsChargeMode();
    const apikey = isChargeMode ? mybucket?.mail?.apikey : '';
    const model = mybucket?.mail?.model ?? 'gpt-3.5-turbo';

    const returnText: string | MailType = isChargeMode
      ? await returnMail(apikey, requestText, model)
      : await isChargeModeReturnMail({ reqText: requestText, model: model });

    if (typeof returnText === 'string') {
      alert(convertErrorMessage(returnText));
      setUseful(true);
      return;
    }

    const body = returnText.body ?? '';

    const textelement = document.querySelector(
      '[aria-label="メッセージ本文、Alt+F10を押して終了します"]'
    );

    if (textelement != null) {
      textelement.insertAdjacentHTML('afterbegin', body);
    } else {
      alert(convertErrorMessage('ImportERROR'));
      setUseful(true);
      return;
    }

    if (!isChargeMode) {
      const mail: MailOption = {
        ...mybucket.mail,
        freeTier: mybucket.mail.freeTier - 1,
      };
      await bucket.set({ mail: mail });
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
