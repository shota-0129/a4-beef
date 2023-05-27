import { useEffect, useState } from 'react';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { bucket } from '../myBucket';

const Apipop = (): React.ReactElement => {
  const [apikeys, setApikey] = useState({
    api: '',
    judge: false,
  });

  const returnAPI = async () => {
    const mybucket = await bucket.get();
    const apikey = mybucket.apiKey;
    if (apikey !== '' && apikey !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await returnAPI();
      await setApikey({ ...apikeys, judge: response });
    };
    fetchData();
  }, []);

  const handleTextChange = async (event: any) => {
    await setApikey({ ...apikeys, api: event.target.value });
  };

  const saveAPIKEY = async () => {
    await bucket.set({ apiKey: apikeys.api });
    await setApikey({ ...apikeys, api: '' });
    await setApikey({ ...apikeys, judge: true });
  };

  const deleteAPIKEY = async () => {
    await bucket.set({ apiKey: '' });
    setApikey({ ...apikeys, api: '' });
    await setApikey({ ...apikeys, judge: false });
  };

  function judgeAPI() {
    if (apikeys.judge) {
      return (
        <Box sx={{ m: 2, width: 200 }}>
          <div>APIKEYが保存されています</div>
          <Button
            sx={{ m: 2 }}
            variant="contained"
            onClick={deleteAPIKEY}
            startIcon={<DeleteIcon />}
          >
            APIを削除
          </Button>
        </Box>
      );
    } else {
      return (
        <Box sx={{ m: 2, width: 300 }}>
          <Box sx={{ mt: 2 }}>APIKeyを貼り付けてください</Box>
          <TextField
            id="outlined-basic"
            label="APIKEY"
            variant="outlined"
            value={apikeys.api}
            onChange={handleTextChange}
            sx={{ m: 1, width: 300 }}
          />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="contained" onClick={saveAPIKEY} startIcon={<SaveIcon />}>
              保存
            </Button>
          </Stack>
        </Box>
      );
    }
  }

  return <div>{judgeAPI()}</div>;
};

export default Apipop;
