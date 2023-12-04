import React, { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Alert, AlertColor, Button, Input, Snackbar } from '@mui/material';

import { API_ENDPOINT, ERROR_MESSAGES } from '../../../constans';
import { ScoreData } from '../../../myBucket';

import ScoreModal from './ScoreModal';

const Main: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConnecting, setConnecting] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    is_open: boolean;
    severity: AlertColor | undefined; // 'success' or 'error' or undefined
    message: string;
  }>({
    is_open: false,
    severity: 'success', // 'success' or 'error'
    message: '',
  });
  const [scoreModalOpen, setScoreModalOpen] = useState(false); // ScoreModal表示のための状態
  const [scoreData, setScoreData] = useState<ScoreData>({
    subjects: [],
    canGraduate: false,
    referenceURL: '',
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    try {
      setConnecting(true);
      console.log(selectedFile);
      if (selectedFile) {
        // FormDataを作成し、ファイルを追加
        const formData = new FormData();
        formData.append('file', selectedFile);

        // APIリクエストを送信
        const response = await fetch(API_ENDPOINT.CALCULATE, {
          method: 'POST',
          mode: 'cors',
          headers: {
            accept: 'application/json',
          },
          body: formData,
          // 必要に応じてヘッダーや認証情報を追加
        });

        // レスポンスがJSON形式であることを確認
        if (response.headers.get('content-type')?.includes('application/json')) {
          const data = await response.json();
          console.log(data);
          if (response.ok) {
            // 成功の場合の処理
            setScoreData(data as ScoreData);
            // setSnackbarSeverity('success');
            // setSnackbarMessage(data.message);
            // ScoreModalを開くための状態を更新
            setScoreModalOpen(true);
          } else {
            setSnackbar({
              is_open: true,
              severity: 'error', // 'success' or 'error'
              message: 'エラー(' + response.status + '):' + data.detail,
            });
          }
        } else {
          // JSON形式でない場合の処理
          throw Error;
        }
      }
      setConnecting(false);
    } catch (error) {
      setSnackbar({
        is_open: true,
        severity: 'error', // 'success' or 'error'
        message: ERROR_MESSAGES.CONTACT_MANAGER,
      });
      setConnecting(false);
    }
  };

  const handleCloseScoreModal = () => {
    // ScoreModalを閉じるための状態を更新
    setScoreModalOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, is_open: false });
  };

  return (
    <div>
      <Input
        type="file"
        inputProps={{ accept: 'application/pdf' }}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="pdf-upload-input"
      />
      <label htmlFor="pdf-upload-input">
        <Button
          variant="contained"
          component="span"
          color="primary"
          startIcon={<CloudUploadIcon />}
          sx={{ my: 2, mr: 2 }}
        >
          PDFファイルをアップロード
        </Button>
      </label>
      {selectedFile && <div>選択したファイル: {selectedFile.name}</div>}
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!(selectedFile && !isConnecting)}
        sx={{ my: 2, mr: 2 }}
      >
        単位数を計算
      </Button>
      <ScoreModal open={scoreModalOpen} onClose={handleCloseScoreModal} scoreData={scoreData} />
      <Snackbar
        open={snackbar.is_open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Main;
