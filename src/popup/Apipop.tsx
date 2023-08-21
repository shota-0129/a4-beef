import { useEffect, useState } from 'react';
import React from 'react';
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
    return (
      <Box sx={{ height: '150px' }}>
        {apikeys.judge ? (
          <>
            <div>The API key has been saved.</div>
            <Button
              sx={{ m: 2 }}
              variant="contained"
              onClick={deleteAPIKEY}
              startIcon={<DeleteIcon />}
            >
              Delete API
            </Button>
          </>
        ) : (
          <>
            <Box>Please paste the API key.</Box>
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
                Save
              </Button>
            </Stack>
          </>
        )}
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 1 }}>Billing mode.</Box>
      {judgeAPI()}
    </Box>
  );
};

export default Apipop;
