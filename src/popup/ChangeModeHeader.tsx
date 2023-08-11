import React, { FC } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Button, Stack, Typography } from '@mui/material';

export const ChargeModeHeader: FC = () => {
  const handleSettingsClick = () => {
    chrome.runtime.openOptionsPage(); // 設定画面を開く
  };

  return (
    <>
      <Box>無料お試しモード使用中</Box>
      <Stack alignItems="flex-center" justifyContent="center" spacing={1} sx={{ mt: 2 }}>
        <Box>
          <Box sx={{ mb: 1 }}>無料枠</Box>
          <Typography>残り10通</Typography>
        </Box>
        <Box>
          {/* disabled startIcon={<SettingsIcon />} */}
          <Box sx={{ mb: 1 }}>個人設定</Box>
          <Button variant="contained" size="small" onClick={handleSettingsClick}>
            個人設定を開く
          </Button>
        </Box>
      </Stack>
    </>
  );
};
