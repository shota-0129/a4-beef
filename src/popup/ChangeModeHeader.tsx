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
   * 無料枠の取得
   */
  useEffect(() => {
    const getFreeTier = async () => {
      const mybucket = await bucket.get();
      setfreeTier(mybucket.mail.freeTier);
    };
    getFreeTier();
  }, []);

  return (
    <>
      <Box>Free Trial mode</Box>
      <Stack alignItems="flex-center" justifyContent="center" spacing={1} sx={{ mt: 2 }}>
        <Box>
          <Box sx={{ mb: 1 }}>Free Tier</Box>
          <Typography>{freeTier} emails</Typography>
        </Box>
        <Box>
          {/* disabled startIcon={<SettingsIcon />} */}
          <Box sx={{ mb: 1 }}>Personal settings</Box>
          <Button variant="contained" size="small" onClick={handleSettingsClick}>
            Open
          </Button>
        </Box>
      </Stack>
    </>
  );
};
