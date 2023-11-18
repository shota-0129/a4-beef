import React, { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Alert, AlertColor, Button, Input, Snackbar } from '@mui/material';

import { ScoreData } from '../../../myBucket';

import ScoreModal from './ScoreModal';

const Main: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConnecting, setConnecting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor | undefined>('success'); // 'success' or 'error'
  const [snackbarMessage, setSnackbarMessage] = useState('');
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
      if (selectedFile) {
        // FormDataを作成し、ファイルを追加
        const formData = new FormData();
        formData.append('pdfFile', selectedFile);

        // 外部APIエンドポイント
        const apiEndpoint = 'https://example.com/api/upload-pdf';

        // APIリクエストを送信
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          body: formData,
          // 必要に応じてヘッダーや認証情報を追加
        });

        // レスポンスがJSON形式であることを確認
        if (response.headers.get('content-type')?.includes('application/json')) {
          const data = await response.json();
          if (response.ok) {
            // 成功の場合の処理
            setScoreData(data as ScoreData);
            setSnackbarSeverity('success');
            setSnackbarMessage(data.message);
            // ScoreModalを開くための状態を更新
            setScoreModalOpen(true);
          } else {
            setSnackbarSeverity('error');
            setSnackbarMessage('エラー(' + response.status + '):' + data.detail);
          }
        } else {
          // JSON形式でない場合の処理
          setSnackbarSeverity('error');
          setSnackbarMessage('エラー(410):運営者(shota.mizusaki.01@gmail.com)に連絡してください。');
        }
      }
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage(
        'エラー(420):' + error + '\n運営者(shota.mizusaki.01@gmail.com)に連絡してください。'
      );
    } finally {
      setConnecting(false);
      setSnackbarOpen(true);
    }
  };

  const handleCloseScoreModal = () => {
    // ScoreModalを閉じるための状態を更新
    setScoreModalOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Main;
