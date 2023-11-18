import { useEffect, useState } from 'react';
import React from 'react';
import { Delete, Save, Send, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  AlertColor,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { bucket } from '../myBucket';

const Options = (): React.ReactElement => {
  const [login_id, setLoginID] = useState('');
  const [password, setPassword] = useState('');
  const [isSaved, setSaved] = useState('');
  const [[saveConnecting, deleteConnecting, requestConnecting], setConnecting] = useState([
    false,
    false,
    false,
  ]);
  const [showPassword, setShowPassword] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor | undefined>('success'); // 'success' or 'error'
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // 画面がロードされたときに保存されたデータを読み込む
  useEffect(() => {
    const setBucket = async () => {
      const mybucket = await bucket.get();
      setLoginID(mybucket.login_id);
      setSaved(mybucket.login_id ? '登録済み' : '未登録');
    };
    setBucket();
  }, []);

  const handleLoginIDChange = (e: any) => {
    setLoginID(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const isLoginIDPassword = () => {
    if (!login_id) {
      setSnackbarSeverity('error');
      setSnackbarMessage('ログインIDを入力してください');
      return false;
    }
    if (!password) {
      setSnackbarSeverity('error');
      setSnackbarMessage('パスワードを入力してください');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    try {
      setConnecting([true, deleteConnecting, requestConnecting]);
      if (!isLoginIDPassword()) return;
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

      setPassword('');

      // レスポンスがJSON形式であることを確認
      if (response.headers.get('content-type')?.includes('application/json')) {
        const data = await response.json();
        if (response.ok) {
          // 保存が成功した場合の処理
          await bucket.set({ login_id: login_id });
          setSaved('登録済み');
          setSnackbarSeverity('success');
          setSnackbarMessage(data.message);
        } else {
          setPassword('');
          setSnackbarSeverity('error');
          setSnackbarMessage('エラー(' + response.status + '):' + data.detail);
        }
      } else {
        // JSON形式でない場合の処理
        setSnackbarSeverity('error');
        setSnackbarMessage('エラー(410):運営者(shota.mizusaki.01@gmail.com)に連絡してください。');
      }
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage(
        'エラー(420):' + error + '\n運営者(shota.mizusaki.01@gmail.com)に連絡してください。'
      );
    } finally {
      setConnecting([false, deleteConnecting, requestConnecting]);
      setSnackbarOpen(true);
    }
  };

  const handleDelete = async () => {
    try {
      setConnecting([saveConnecting, true, requestConnecting]);
      if (!isLoginIDPassword()) return;
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

      console.log(response);

      // レスポンスがJSON形式であることを確認
      if (response.headers.get('content-type')?.includes('application/json')) {
        const data = await response.json();
        if (response.ok) {
          // 削除が成功した場合の処理
          await bucket.set({ login_id: '' });
          setLoginID('');
          setPassword('');
          setSnackbarSeverity('success');
          setSaved('未登録');
          setSnackbarMessage('データ削除が完了しました。');
        } else {
          setSnackbarSeverity('error');
          setSnackbarMessage('エラー(' + response.status + '):' + data.detail);
        }
      } else {
        // JSON形式でない場合の処理
        setSnackbarSeverity('error');
        setSnackbarMessage('エラー(410):運営者(shota.mizusaki.01@gmail.com)に連絡してください。');
      }
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage(
        'エラー(420):' + error + '\n運営者(shota.mizusaki.01@gmail.com)に連絡してください。'
      );
    } finally {
      setConnecting([saveConnecting, false, requestConnecting]);
      setSnackbarOpen(true);
    }
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
          <Typography sx={{ fontSize: 16 }} gutterBottom>
            {isSaved}
          </Typography>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Alert
              elevation={6}
              variant="filled"
              onClose={handleSnackbarClose}
              severity={snackbarSeverity}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
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
              endIcon={saveConnecting ? <CircularProgress size={20} /> : <Save />}
              size="medium"
              sx={{ mt: 2, mr: 2 }}
              disabled={saveConnecting || deleteConnecting || requestConnecting}
            >
              {saveConnecting ? 'Beefに確認中...' : 'Save'}
            </Button>
            <Button
              variant="contained"
              onClick={handleDelete}
              endIcon={deleteConnecting ? <CircularProgress size={20} /> : <Delete />}
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
              endIcon = {requestConnecting ? <CircularProgress size={20} /> : <Send />}
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
