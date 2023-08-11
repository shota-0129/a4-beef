import React, { FC } from 'react';
import { Box, FormControl, FormControlLabel, FormLabel, Switch } from '@mui/material';

type Props = {
  isCheck: boolean;
  handleChange: () => void;
};

export const ChargeModeSwitch: FC<Props> = ({ isCheck, handleChange }) => {
  return (
    <Box>
      <FormControl>
        <FormLabel focused={isCheck} sx={{ fontSize: '12px' }}>
          課金モード
        </FormLabel>
        <FormControlLabel
          control={<Switch checked={isCheck} onChange={handleChange} name="chargeModeSwitch" />}
          label={isCheck ? 'ON' : 'OFF'}
        />
      </FormControl>
    </Box>
  );
};
