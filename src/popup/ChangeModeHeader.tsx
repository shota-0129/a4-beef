import React, { FC, useEffect, useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Button, Stack, Typography } from '@mui/material';

import { bucket } from '../myBucket';

export const ChargeModeHeader: FC = () => {
  const handleSettingsClick = () => {
    chrome.runtime.openOptionsPage(); // 設定画面を開く
  };

  const [freeTier, setfreeTier] = useState(0);

  /**
   * modeState初期化
   */
  useEffect(() => {
    const fetchMode = async () => {
      const mybucket = await bucket.get();
      setfreeTier(mybucket.mail.freeTier);
    };
    fetchMode();
  }, []);

  return (
    <>
      <Box>無料お試しモード使用中</Box>
      <Stack alignItems="flex-center" justifyContent="center" spacing={1} sx={{ mt: 2 }}>
        <Box>
          <Box sx={{ mb: 1 }}>無料枠</Box>
          <Typography>残り{freeTier}通</Typography>
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
