import { useEffect, useState } from 'react';
import React from 'react';
import { Delete, Save, Send, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { API_ENDPOINT, ERROR_MESSAGES } from '../constans';
import { bucket } from '../myBucket';

import ExpandSnackbar from './ExpandSnackbar';

const Options = (): React.ReactElement => {
  const [userData, setUserData] = useState({
    login_id: '',
    password: '',
    isApproval: false,
  });

  const [snackbar, setSnackbar] = useState<{
    is_open: boolean;
    severity: AlertColor | undefined; // 'success' or 'error' or undefined
    message: string;
  }>({
    is_open: false,
    severity: 'success', // 'success' or 'error'
    message: '',
  });

  const [isSaved, setSaved] = useState('');
  const [[saveConnecting, deleteConnecting, requestConnecting], setConnecting] = useState([
    false,
    false,
    false,
  ]);

  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // 画面がロードされたときに保存されたデータを読み込む
  useEffect(() => {
    const setBucket = async () => {
      const mybucket = await bucket.get();
      setUserData(mybucket);
      setChecked(mybucket.isApproval);
    };
    setBucket();
  }, []);

  const handleLoginIDChange = (e: any) => {
    setUserData({
      ...userData, // Spread the existing state
      login_id: e.target.value,
    });
  };

  const handlePasswordChange = (e: any) => {
    setUserData({
      ...userData, // Spread the existing state
      password: e.target.value,
    });
  };

  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const isLoginIDPassword = () => {
    if (!userData.login_id) {
      setSnackbar({
        is_open: true,
        severity: 'error', // 'success' or 'error'
        message: ERROR_MESSAGES.LOGIN_ID_REQUIRED,
      });
      return false;
    }
    if (!userData.password) {
      setSnackbar({
        is_open: true,
        severity: 'error', // 'success' or 'error'
        message: ERROR_MESSAGES.PASSWORD_REQUIRED,
      });
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    try {
      setConnecting([true, deleteConnecting, requestConnecting]);

      if (!isLoginIDPassword()) return;
      // リクエストボディにformDataを含めてAPIエンドポイントにPOSTリクエストを送信
      const response = await fetch(API_ENDPOINT.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login_id: userData.login_id,
          password: userData.password,
        }),
      });

      setUserData({
        ...userData, // Spread the existing state
        password: '',
      });

      // レスポンスがJSON形式であることを確認
      if (response.headers.get('content-type')?.includes('application/json')) {
        const data = await response.json();
        if (response.ok) {
          // 保存が成功した場合の処理
          await bucket.set({ login_id: userData.login_id, isApproval: true });
          setSaved('登録済み');
          setSnackbar({
            is_open: true,
            severity: 'success', // 'success' or 'error'
            message: data.message,
          });
        } else {
          setUserData({
            ...userData, // Spread the existing state
            password: '',
          });
          setSnackbar({
            is_open: true,
            severity: 'error', // 'success' or 'error'
            message: 'エラー(' + response.status + '):' + data.detail,
          });
        }
      } else {
        throw new Error();
      }
    } catch (error) {
      setSnackbar({
        is_open: true,
        severity: 'error', // 'success' or 'error'
        message: ERROR_MESSAGES.CONTACT_MANAGER,
      });
    } finally {
      setConnecting([false, deleteConnecting, requestConnecting]);
    }
  };

  const handleDelete = async () => {
    try {
      setConnecting([saveConnecting, true, requestConnecting]);
      if (!isLoginIDPassword()) return;
      // リクエストボディにformDataを含めてAPIエンドポイントにPOSTリクエストを送信
      const response = await fetch(API_ENDPOINT.DELETE, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login_id: userData.login_id,
          password: userData.password,
        }),
      });

      console.log(response);

      // レスポンスがJSON形式であることを確認
      if (response.headers.get('content-type')?.includes('application/json')) {
        const data = await response.json();
        if (response.ok) {
          // 削除が成功した場合の処理
          await bucket.set({ login_id: '' });
          setUserData({
            ...userData, // Spread the existing state
            login_id: '',
            password: '',
          });
          setSaved('未登録');
          setSnackbar({
            is_open: true,
            severity: 'success', // 'success' or 'error'
            message: data.message,
          });
        } else {
          setSnackbar({
            is_open: true,
            severity: 'error', // 'success' or 'error'
            message: 'エラー(' + response.status + '):' + data.detail,
          });
        }
      } else {
        throw new Error();
      }
    } catch (error) {
      setSnackbar({
        is_open: true,
        severity: 'error', // 'success' or 'error'
        message: ERROR_MESSAGES.CONTACT_MANAGER,
      });
    } finally {
      setConnecting([saveConnecting, false, requestConnecting]);
    }
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
          <ExpandSnackbar
            isOpen={snackbar.is_open}
            severity={snackbar.severity}
            message={snackbar.message}
            onClose={() => setSnackbar({ ...snackbar, is_open: false })}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="ログインID"
            value={userData.login_id}
            onChange={handleLoginIDChange}
            sx={{ mt: 1 }}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="パスワード"
            value={userData.password}
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
          {!userData.isApproval && (
            <FormControlLabel
              label={
                <p>
                  <Link href="https://docs.google.com/document/d/1_jN07R7upOaN1hYHYqnG7yqJI3K2mNMYBhyYdjLNd6U/edit?usp=sharing">
                    プライバシーポリシー
                  </Link>
                  に同意する。
                </p>
              }
              control={<Checkbox checked={checked} onChange={handleCheckChange} />}
            />
          )}
          <Stack direction="row">
            <Button
              variant="contained"
              onClick={handleSave}
              endIcon={saveConnecting ? <CircularProgress size={20} /> : <Save />}
              size="medium"
              sx={{ mt: 2, mr: 2 }}
              disabled={saveConnecting || deleteConnecting || requestConnecting || !checked}
            >
              {saveConnecting ? 'Beefに確認中...少し時間かかります' : 'Save'}
            </Button>
            <Button
              variant="contained"
              onClick={handleDelete}
              endIcon={deleteConnecting ? <CircularProgress size={20} /> : <Delete />}
              size="medium"
              disabled={saveConnecting || deleteConnecting || requestConnecting || !checked}
              sx={{ mt: 2 }}
            >
              {deleteConnecting ? '削除中...' : 'Delete'}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};
export default Options;
