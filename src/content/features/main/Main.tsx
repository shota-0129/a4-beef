import React, { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, Input } from '@mui/material';

const Main: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // FormDataを作成し、ファイルを追加
      const formData = new FormData();
      formData.append('pdfFile', selectedFile);

      // 外部APIエンドポイント
      const apiEndpoint = 'https://example.com/api/upload-pdf';

      // APIリクエストを送信
      fetch(apiEndpoint, {
        method: 'POST',
        body: formData,
        // 必要に応じてヘッダーや認証情報を追加
      })
        .then((response) => response.json())
        .then((data) => {
          // APIからの応答を処理
          console.log('API応答:', data);
        })
        .catch((error) => {
          console.error('APIエラー:', error);
        });
    }
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
        disabled={!selectedFile}
        sx={{ my: 2, mr: 2 }}
      >
        単位数を計算
      </Button>
    </div>
  );
};

export default Main;
