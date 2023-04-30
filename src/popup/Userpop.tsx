import { useEffect, useState } from 'react';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import axios from 'axios';

import { bucket } from '../myBucket';

const Userpop = (): React.ReactElement => {
  const [users, setUser] = useState({
    username: '',
    password: '',
    judge: false,
    checked: false,
  });

  const returnUserName = async () => {
    const mybucket = await bucket.get();
    const userName = mybucket.userName;
    if (userName !== '' && userName !== undefined) {
      return userName;
    } else {
      return '';
    }
  };

  const returnPassword = async () => {
    const mybucket = await bucket.get();
    const password = mybucket.password;
    if (password !== '' && password !== undefined) {
      return password;
    } else {
      return '';
    }
  };

  useEffect(() => {
    //ロードの1回だけ発動する
    const fetchData = async () => {
      const userName = await returnUserName();
      const passWord = await returnPassword();
      if (userName !== '') {
        await setUser({ ...users, username: userName, password: passWord, judge: true });
      }
    };
    fetchData();
  }, []);

  const handleUsernameChange = async (event: any) => {
    await setUser({ ...users, username: event.target.value });
  };

  const handlePasswordChange = async (event: any) => {
    await setUser({ ...users, password: event.target.value });
  };

  const saveUser = async () => {
    if (checkMail(users.username)) {
      axios.get(
        'https://script.google.com/macros/s/AKfycbyisbXKbwNBvRIUbgK0v9xYLklWu-usvFxjoIcQhSbtfWlMDVH9h67R-G79gVLB0MdeKQ/exec',
        {
          params: {
            address: users.username,
          },
        }
      );
      await bucket.set({ userName: users.username });
      await bucket.set({ password: users.password });
      await setUser({ ...users, username: '', password: '', judge: true });
    } else {
      alert('有効なメールアドレスでお願いします。');
    }
  };

  const deleteUserName = async () => {
    await bucket.set({ userName: '' });
    setUser({ ...users, username: '' });
    await setUser({ ...users, judge: false });
  };

  const checkMail = (address: string) => {
    const check =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (check.test(address)) {
      return true;
    } else {
      return false;
    }
  };

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...users, checked: event.target.checked });
  };

  function displayUser() {
    if (users.judge) {
      return (
        <Box sx={{ m: 2, width: 200 }}>
          <div>Emailが保存されています</div>
          <Button
            sx={{ m: 2 }}
            variant="contained"
            onClick={deleteUserName}
            startIcon={<DeleteIcon />}
          >
            Emailを削除
          </Button>
        </Box>
      );
    } else {
      return (
        <Box sx={{ m: 2, width: 300 }}>
          <Box sx={{ mt: 2 }}>スパム防止とアップデートのお知らせのためにE-mailを教えてください</Box>
          <TextField
            id="outlined-basic"
            label="E-mail"
            variant="outlined"
            value={users.username}
            onChange={handleUsernameChange}
            sx={{ m: 1, width: 300 }}
          />
          <Stack direction="row" justifyContent="flex-end" alignItems="center">
            <Checkbox
              checked={users.checked}
              onChange={handleChecked}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <Box sx={{ pr: 5 }}>運営者がメールアドレスを取得することに同意する。</Box>
            <Button
              variant="contained"
              onClick={saveUser}
              endIcon={<SendIcon />}
              disabled={!users.checked}
            >
              送信
            </Button>
          </Stack>
        </Box>
      );
    }
  }

  return <div>{displayUser()}</div>;
};

export default Userpop;
