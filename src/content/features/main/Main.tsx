import React, { useEffect, useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import DeleteIcon from '@mui/icons-material/Delete';
import Textarea from '@mui/joy/Textarea';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { BiMailSend } from '@react-icons/all-files/bi/BiMailSend';

import { isChargeModeFn } from '../../../isChargeModeBucket';
import { bucket, MailOption, MyBucket } from '../../../myBucket';

import { isChargeModeNewMail } from './mail/isChargeModeNewMail';
import { newMail } from './mail/newMail';
import { convertErrorMessage } from './convertErrorMessage';
// import { AiOutlineMail } from 'react-icons/ai';
import Endicon from './Endicon';

export type MailType = {
  subject?: string;
  body?: string;
};

export function Main() {
  const { getIsChargeMode } = isChargeModeFn();
  const [texts, setTexts] = useState({
    sendText: '',
    returnText: '',
    useful: true,
  });

  const handleTextChange = async (event: any) => {
    const text = event.target.value;
    setTexts({ ...texts, sendText: text });
  };

  const handleSend = async () => {
    setTexts({ ...texts, useful: false });
    const mybucket = await bucket.get();
    const isChargeMode = await getIsChargeMode();
    const apikey = isChargeMode ? mybucket?.mail?.apikey : '';
    const model = mybucket?.mail?.model ?? 'gpt-3.5-turbo';

    const returnText: string | MailType = isChargeMode
      ? await newMail(apikey, texts.sendText, model)
      : await isChargeModeNewMail({ reqText: texts.sendText, model: model });

    if (typeof returnText === 'string') {
      alert(convertErrorMessage(returnText));
      setTexts({ ...texts, useful: true });
      return;
    }

    const subject = returnText.subject ?? '';
    const body = returnText.body ?? '';

    const textelement = document.querySelectorAll('[aria-label="メッセージ本文"]')[1];
    setTexts({ ...texts, returnText: body, useful: true });

    if (textelement != null) {
      const subjectbox = document.getElementsByName('subjectbox')[0] as HTMLInputElement;
      if (subjectbox) {
        subjectbox.value = subject;
      }
      textelement.insertAdjacentHTML('afterbegin', body);
    } else {
      alert(convertErrorMessage('ImportERROR'));
      return;
    }

    if (!isChargeMode) {
      const mail: MailOption = {
        ...mybucket.mail,
        freeTier: mybucket.mail.freeTier - 1,
      };
      await bucket.set({ mail: mail });
    }
  };

  return (
    <Box>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>メール作成アシスト powered by GPT-3.5</Typography>
          <BiMailSend />
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <Box sx={{ m: 2, width: 300 }}>
              以下にどんなメールを書きたいか打ち込んでください
              <Textarea
                color="primary"
                minRows={5}
                maxRows={5}
                onChange={handleTextChange}
                value={texts.sendText}
                sx={{ my: 2 }}
                size="sm"
                placeholder="例：メール作成アシスト powered by GPT-3.5を作った神戸大学院の水崎くんに弊社への採用を見据えた面談のオファーをしたい。また、面談の希望日は6/1,6/3の午後で1時間想定であることを伝えたい"
              />
              <Stack direction="row" justifyContent="flex-end">
                <Button
                  variant="contained"
                  onClick={handleSend}
                  disabled={!texts.useful}
                  endIcon={<Endicon is_connecting={!texts.useful} />}
                >
                  草案を作成
                </Button>
              </Stack>
              <Typography component="div">
                <Box sx={{ mt: 2 }} fontSize={12}>
                  感想・要望がある場合は
                  <a href="https://chrome.google.com/webstore/detail/gmail-gpt/dfddioocenioilenfdojcpccmojcaiij?hl=ja&authuser=0">
                    こちらから
                  </a>
                  レビューを書いてもらえると嬉しいです！
                  <br />
                  もし使っていてよかったら、★5をお願いします🙇
                </Box>
              </Typography>
            </Box>
          </div>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
