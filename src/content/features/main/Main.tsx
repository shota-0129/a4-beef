import React, { useState } from 'react';
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

import { bucket } from '../../../myBucket';
import { newMail } from '../../../newMail';

// import { AiOutlineMail } from 'react-icons/ai';
import Endicon from './Endicon';

export function Main() {
  const [texts, setTexts] = useState({
    sendText: '',
    returnText: '',
    useful: true,
  });

  const handleTextChange = async (event: any) => {
    setTexts({ ...texts, sendText: event.target.value });
    await bucket.set({ targetSendText: event.target.value });
  };

  const handleSend = async () => {
    setTexts({ ...texts, useful: false });
    const mybucket = await bucket.get();
    const apikey = mybucket.apiKey;
    console.log(apikey);
    if (apikey === '' || apikey === undefined) {
      alert('PoPupからAPIKeyを入力してください');
      setTexts({ ...texts, useful: true });
    } else {
      const returnText = await newMail(apikey, texts.sendText);
      const regex = /件名:(.+?)<br><br>本文:(.+)/s;
      const result = returnText.match(regex);
      let subject;
      let body;

      if (result) {
        subject = result[1].trim(); // 件名を取得します。
        body = result[2]; // 本文を取得します。
        body.replace('<br>', '');
      } else {
        subject = '';
        body = returnText;
      }

      await bucket.set({ targetReturnText: returnText });
      const textelement = document.querySelectorAll('[aria-label="メッセージ本文"]')[1];
      setTexts({ ...texts, returnText: returnText, useful: true });

      if (textelement != null) {
        const subjectbox = document.getElementsByName('subjectbox')[0] as HTMLInputElement;
        if (subjectbox) {
          subjectbox.value = subject;
        }
        textelement.insertAdjacentHTML('afterbegin', body);
      } else {
        alert(
          'メッセージを直接代入できませんでした。\n作成ボタンを押して、新しいメッセージを開いた状態で、お待ちください'
        );
      }
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
          <Typography>Gmail GPT</Typography>
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
                placeholder="例：GmailGPTを作った神戸大学院の水崎くんに弊社への採用を見据えた面談のオファーをしたい。また、面談の希望日は6/1,6/3の午後で1時間想定であることを伝えたい"
              />
              <Stack direction="row" justifyContent="flex-end">
                <Button
                  variant="contained"
                  onClick={handleSend}
                  disabled={!texts.useful}
                  endIcon={<Endicon is_connecting={!texts.useful} />}
                >
                  お願いGPT
                </Button>
              </Stack>
              <Typography component="div">
                <Box sx={{ mt: 2 }} fontSize={12}>
                  感想・要望がある場合は
                  <a href="https://forms.gle/NeQmnQbqZocNfPuB9">こちらのフォーム</a>
                  から送ってもらえると嬉しいです。
                </Box>
              </Typography>
            </Box>
          </div>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
