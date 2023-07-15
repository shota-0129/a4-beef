import { useEffect, useState } from 'react';
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { bucket, MailOption } from '../myBucket';

const Apipop = (): React.ReactElement => {
  const [apikeys, setApikey] = useState({
    api: '',
    judge: false,
  });

  const [model, setModel] = useState({
    model: '',
    judge: false,
  });

  const returnAPI = async () => {
    const mybucket = await bucket.get();
    const apikey = mybucket.mail.apikey;
    if (apikey !== '' && apikey !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  const returnModel = async () => {
    const mybucket = await bucket.get();
    const model = mybucket?.mail?.model ?? 'gpt-3.5-turbo';
    if (model === 'gpt-3.5-turbo') {
      return false;
    }
    return true;
  };

  const fetchData = async () => {
    const responseApi = await returnAPI();
    const responseJudge = await returnModel();
    await setApikey({ ...apikeys, judge: responseApi });
    await setModel({ ...model, judge: responseJudge });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAPIChange = async (event: any) => {
    await setApikey({ ...apikeys, api: event.target.value });
  };

  const handleModelChange = async (event: any) => {
    await setModel({ ...model, judge: !model.judge });
    const mybucket = await bucket.get();
    const mail: MailOption = {
      ...mybucket.mail,
      model: event.target.value,
    };
    await bucket.set({ mail: mail });
  };

  const saveAPIKEY = async () => {
    const mybucket = await bucket.get();
    const mail: MailOption = {
      ...mybucket.mail,
      apikey: apikeys.api,
    };
    await bucket.set({ mail: mail });
    await setApikey({ ...apikeys, api: '' });
    await setApikey({ ...apikeys, judge: true });
  };

  const deleteAPIKEY = async () => {
    const mybucket = await bucket.get();
    const mail: MailOption = {
      ...mybucket.mail,
      apikey: '',
    };
    await bucket.set({ mail: mail });
    setApikey({ ...apikeys, api: '' });
    await setApikey({ ...apikeys, judge: false });
  };

  function judgeAPI() {
    if (apikeys.judge) {
      return (
        <>
          <div>APIKEYが保存されています</div>
          <Button
            sx={{ m: 2 }}
            variant="contained"
            onClick={deleteAPIKEY}
            startIcon={<DeleteIcon />}
          >
            APIを削除
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Box sx={{ mt: 2 }}>APIKeyを貼り付けてください</Box>
          <TextField
            id="outlined-basic"
            label="APIKEY"
            variant="outlined"
            value={apikeys.api}
            onChange={handleAPIChange}
            sx={{ m: 1, width: 200 }}
          />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="contained" onClick={saveAPIKEY} startIcon={<SaveIcon />}>
              保存
            </Button>
          </Stack>
        </>
      );
    }
  }

  return (
    <Box sx={{ m: 2, width: 200 }}>
      {judgeAPI()}
      {/* <FormControl component="fieldset">
        <FormLabel component="legend">Model</FormLabel>
        <RadioGroup aria-label="model" name="model1" value={model} onChange={handleModelChange}>
          <FormControlLabel value="gpt-3.5-turbo" control={<Radio color="primary" size='small'/>} label="GPT-3.5-turbo" checked={!model.judge} />
          <FormControlLabel value="gpt-4" control={<Radio color="primary" size='small'/>} label="GPT-4" checked=
          {model.judge} />
        </RadioGroup>
      </FormControl> */}
    </Box>
  );
};

export default Apipop;
