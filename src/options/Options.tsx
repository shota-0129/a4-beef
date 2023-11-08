import { useEffect, useState } from 'react';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, Container, InputAdornment, Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import Endicon from '../content/features/main/Endicon';
import { bucket } from '../myBucket';

const Options = (): React.ReactElement => {
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [isConnecting, setConnecting] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // 画面がロードされたときに保存されたデータを読み込む
  useEffect(() => {
    const setBucket = async () => {
      const mybucket = await bucket.get();
      setUserID(mybucket.userID);
      setPassword(mybucket.password);
    };
    setBucket();
    console.log(userID, password);
  }, []);

  const handleUserIDChange = (e: any) => {
    setUserID(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSave = async () => {
    try {
      // リクエストボディにformDataを含めてAPIエンドポイントにPOSTリクエストを送信
      const response = await fetch('YOUR_API_ENDPOINT_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          '': userID,
          '': password,
        }),
      });

      if (response.ok) {
        // 保存が成功した場合の処理
        console.log('設定が保存されました。');
        await bucket.set({ userID: userID, password: password });
        alert('設定を保存しました');
      } else {
        // 保存が失敗した場合の処理
        console.error('設定の保存に失敗しました。');
      }
    } catch (error) {
      console.error('エラー:', error);
    }
  };

  const handleDelete = async () => {
    try {
      // リクエストボディにformDataを含めてAPIエンドポイントにPOSTリクエストを送信
      const response = await fetch('YOUR_API_ENDPOINT_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // 保存が成功した場合の処理
        console.log('設定が削除されました。');
        await bucket.set({ userID: '', password: '' });
        setPassword('');
        setUserID('');
      } else {
        // 保存が失敗した場合の処理
        console.error('設定の削除に失敗しました。');
      }
    } catch (error) {
      console.error('エラー:', error);
    }
  };

  const handleRequest = async () => {
    setConnecting(true);
    const dataToSend = {
      login_id: userID,
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
    setConnecting(false);
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
          <Typography variant="h5" gutterBottom>
            初期設定
          </Typography>
          <TextField
            fullWidth
            id="outlined-basic"
            label="UserID"
            value={userID}
            onChange={handleUserIDChange}
            sx={{ mt: 1 }}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Password"
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
              endIcon={<SaveIcon />}
              size="medium"
              sx={{ mt: 2, mr: 2 }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              onClick={handleDelete}
              endIcon={<DeleteIcon />}
              size="medium"
              sx={{ mt: 2 }}
            >
              Delete
            </Button>
            {/* <Button
            variant="contained"
            onClick={handleRequest}
            disabled={isConnecting}
            size="medium"
            sx={{ mt: 2, mr: 2 }}
            endIcon={<Endicon is_connecting={isConnecting} />}
          >
            Request
          </Button> */}
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};
export default Options;
