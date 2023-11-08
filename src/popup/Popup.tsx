import React, { useEffect, useState } from 'react';
import { Box, Button, Container, InputAdornment, Stack, Typography } from '@mui/material';

const Popup = () => {
  const handleInitialSetup = () => {
    // ここで新しいタブでオプションページを開く
    chrome.tabs.create({ url: 'src/options/options.html' });
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 200,
        }}
      >
        <Typography sx={{ my: 2 }} gutterBottom>
          拡張機能をインストールしてくれてありがとうございます。
        </Typography>
        <Typography sx={{ mb: 2 }} gutterBottom>
          以下のボタンから初期設定を行ってください。
        </Typography>
        <Button variant="contained" color="primary" onClick={handleInitialSetup} sx={{ mb: 2 }}>
          初期設定を行う
        </Button>
      </Box>
    </Container>
  );
};

export default Popup;
