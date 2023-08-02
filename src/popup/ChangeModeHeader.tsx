import React, { FC } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Button, Stack, Typography } from '@mui/material';

export const ChargeModeHeader: FC = () => {
  return (
    <>
      <Box>従量課金モード使用中</Box>
      <Stack alignItems="flex-center" justifyContent="center" spacing={1} sx={{ mt: 2 }}>
        <Box>
          <Box>Status</Box>
          <Typography>試験モード中</Typography>
        </Box>
        <Box>
          <Box>Setting</Box>
          <Button variant="contained" size="small" disabled startIcon={<SettingsIcon />}>
            設定を開く
          </Button>
        </Box>
      </Stack>
    </>
  );
};
