import { useEffect, useState } from 'react';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, Container, InputAdornment, Stack, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import { bucket } from '../myBucket';

const Options = (): React.ReactElement => {
  const [login_id, setLoginID] = useState('');
  const [password, setPassword] = useState('');
  const [[saveConnecting, deleteConnecting, requestConnecting], setConnecting] = useState([
    false,
    false,
    false,
  ]);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // 画面がロードされたときに保存されたデータを読み込む
  useEffect(() => {
    const setBucket = async () => {
      const mybucket = await bucket.get();
      setLoginID(mybucket.login_id);
      setPassword(mybucket.password);
    };
    setBucket();
    console.log(login_id, password);
  }, []);

  const handleLoginIDChange = (e: any) => {
    setLoginID(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSave = async () => {
    setConnecting([true, deleteConnecting, requestConnecting]);
    try {
      // リクエストボディにformDataを含めてAPIエンドポイントにPOSTリクエストを送信
      const response = await fetch('http://localhost:5001/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login_id: login_id,
          password: password,
        }),
      });

      console.log(login_id, password);

      if (response.ok) {
        // 保存が成功した場合の処理
        console.log('設定が保存されました。');
        await bucket.set({ login_id: login_id, password: password });
        alert('設定を保存しました');
      } else {
        // 保存が失敗した場合の処理
        console.error('設定の保存に失敗しました。');
      }
    } catch (error) {
      console.error('エラー:', error);
    }
    setConnecting([false, deleteConnecting, requestConnecting]);
  };

  const handleDelete = async () => {
    setConnecting([saveConnecting, true, requestConnecting]);
    try {
      // リクエストボディにformDataを含めてAPIエンドポイントにPOSTリクエストを送信
      const response = await fetch('http://localhost:5001/user/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login_id: login_id,
          password: password,
        }),
      });

      if (response.ok) {
        // 保存が成功した場合の処理
        console.log('設定が削除されました。');
        await bucket.set({ login_id: '', password: '' });
        setPassword('');
        setLoginID('');
      } else {
        // 保存が失敗した場合の処理
        console.error('設定の削除に失敗しました。');
      }
    } catch (error) {
      console.error('エラー:', error);
    }
    setConnecting([saveConnecting, false, requestConnecting]);
  };

  const handleRequest = async () => {
    setConnecting([saveConnecting, deleteConnecting, true]);
    const dataToSend = {
      login_id: login_id,
      password: password,
    };
    // データをサーバーに送信
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbx2jImeliw_ZNlb2MaO7aSflcEtIzZ3ed6mV6RvawIbd5kxRXvoXG1q-ofdLQrJFZ8Wsw/exec',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      }
    );

    if (response.ok) {
      // リクエスト成功
      const responseData = await response.json();
      // responseDataにGASからのレスポンスが格納される
      console.log('Received response:', responseData);

      // ここでresponseDataを必要に応じて処理する
    } else {
      // リクエスト失敗
      console.error('Request failed:', response.status, response.statusText);
    }
    setConnecting([saveConnecting, deleteConnecting, false]);
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 3,
            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
          }}
        >
          <Typography sx={{ fontSize: 24 }} gutterBottom>
            初期設定
          </Typography>
          <Typography sx={{ fontSize: 16 }} gutterBottom>
            神戸大学のログインIDとパスワードを入力して保存してください
          </Typography>
          <TextField
            fullWidth
            id="outlined-basic"
            label="ログインID"
            value={login_id}
            onChange={handleLoginIDChange}
            sx={{ mt: 1 }}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="パスワード"
            value={password}
            onChange={handlePasswordChange}
            sx={{ mt: 1 }}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Stack direction="row">
            <Button
              variant="contained"
              onClick={handleSave}
              endIcon={saveConnecting ? <CircularProgress size={20} /> : <SaveIcon />}
              size="medium"
              sx={{ mt: 2, mr: 2 }}
              disabled={saveConnecting || deleteConnecting || requestConnecting}
            >
              {saveConnecting ? 'Beefに確認中...' : 'Save'}
            </Button>
            <Button
              variant="contained"
              onClick={handleDelete}
              endIcon={deleteConnecting ? <CircularProgress size={20} /> : <DeleteIcon />}
              size="medium"
              disabled={saveConnecting || deleteConnecting || requestConnecting}
              sx={{ mt: 2 }}
            >
              {deleteConnecting ? '削除中...' : 'Delete'}
            </Button>
            {/* <Button
              variant="contained"
              onClick={handleRequest}
              disabled={saveConnecting || deleteConnecting || requestConnecting}
              size="medium"
              sx={{ mt: 2, mr: 2 }}
              endIcon = {requestConnecting ? <CircularProgress size={20} /> : <SendIcon />}
            >
              {requestConnecting ? '情報を収集中...' : 'Request'}
            </Button> */}
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};
export default Options;
