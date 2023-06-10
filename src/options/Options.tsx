import { useEffect, useState } from 'react';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import axios from 'axios';

import { bucket, UserInformation } from '../myBucket';

const Options = (): React.ReactElement => {
  const [users, setUser] = useState({
    name: '',
    company: '',
    position: '',
  });

  const returnUserName = async () => {
    const mybucket = await bucket.get();
    const name = mybucket?.user?.name;
    if (name !== '' && name !== undefined) {
      return name;
    } else {
      return '';
    }
  };

  const returnCompany = async () => {
    const mybucket = await bucket.get();
    const company = mybucket?.user?.company;
    if (company !== '' && company !== undefined) {
      return company;
    } else {
      return '';
    }
  };

  const returnPosition = async () => {
    const mybucket = await bucket.get();
    const position = mybucket?.user?.position;
    if (position !== '' && position !== undefined) {
      return position;
    } else {
      return '';
    }
  };

  useEffect(() => {
    //ロードの1回だけ発動する
    const fetchData = async () => {
      const name = await returnUserName();
      const company = await returnCompany();
      const position = await returnPosition();
      if (name !== '' || company !== '' || position !== '') {
        await setUser({ ...users, name: name, company: company, position: position });
      }
    };
    fetchData();
  }, []);

  const handleUsernameChange = async (event: any) => {
    await setUser({ ...users, name: event.target.value });
  };

  const handleCompanyChange = async (event: any) => {
    await setUser({ ...users, company: event.target.value });
  };

  const handlePositionChange = async (event: any) => {
    await setUser({ ...users, position: event.target.value });
  };

  const saveUser = async () => {
    const mybucket = await bucket.get();
    const user: UserInformation = {
      ...mybucket.user,
      name: users.name,
      company: users.company,
      position: users.position,
    };
    await bucket.set({ user: user });
    alert('設定を保存しました');
  };

  const deleteUser = async () => {
    const mybucket = await bucket.get();
    const user: UserInformation = {
      ...mybucket.user,
      name: '',
      company: '',
      position: '',
    };
    await bucket.set({ user: user });
    setUser({ name: '', company: '', position: '' });
  };

  const deleteUserName = async () => {
    const mybucket = await bucket.get();
    const user: UserInformation = {
      ...mybucket.user,
      name: '',
    };
    await bucket.set({ user: user });
    setUser({ ...users, name: '' });
  };

  const deleteUserCompany = async () => {
    const mybucket = await bucket.get();
    const user: UserInformation = {
      ...mybucket.user,
      name: '',
    };
    await bucket.set({ user: user });
    setUser({ ...users, company: '' });
  };

  const deleteUserPosition = async () => {
    const mybucket = await bucket.get();
    const user: UserInformation = {
      ...mybucket.user,
      name: '',
    };
    await bucket.set({ user: user });
    setUser({ ...users, position: '' });
  };

  function displayUser() {
    return (
      <>
        <Box sx={{ m: 2, fontSize: '32px' }}>任意設定：返信などの精度が上がります。</Box>
        <Box sx={{ m: 2, width: 300, fontSize: '32px' }}>
          <Box sx={{ mt: 2, fontSize: '16px' }}>メールに表示する名前を教えてください</Box>
          <TextField
            id="outlined-basic"
            label="名前"
            variant="outlined"
            value={users.name}
            onChange={handleUsernameChange}
            sx={{ mt: 1, width: 300 }}
            size="medium"
          />
          <Box sx={{ mt: 2, fontSize: '16px' }}>表示する会社を教えてください</Box>
          <TextField
            id="outlined-basic"
            label="会社"
            variant="outlined"
            value={users.company}
            onChange={handleCompanyChange}
            sx={{ mt: 1, width: 300 }}
            size="medium"
          />
          <Box sx={{ mt: 2, fontSize: '16px' }}>表示する役職を教えてください</Box>
          <TextField
            id="outlined-basic"
            label="役職"
            variant="outlined"
            value={users.position}
            onChange={handlePositionChange}
            sx={{ mt: 1, width: 300 }}
            size="medium"
          />
          <Stack direction="row" justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={saveUser}
              startIcon={<SaveIcon />}
              size="medium"
              sx={{ mt: 2, mr: 2 }}
            >
              保存
            </Button>
            <Button
              variant="contained"
              color="inherit"
              onClick={deleteUser}
              startIcon={<DeleteIcon />}
              size="medium"
              sx={{ mt: 2 }}
            >
              削除
            </Button>
          </Stack>
        </Box>
      </>
    );
  }
  return <div>{displayUser()}</div>;
};
export default Options;
