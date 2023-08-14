import React, { useEffect, useState } from 'react';
import { Box, Stack } from '@mui/material';

import { isChargeModeFn } from '../isChargeModeBucket';

import Apipop from './Apipop';
import { ChargeModeHeader } from './ChangeModeHeader';
import { ChargeModeSwitch } from './ChargeModeSwitch';
import Optionpopup from './Optionpop';
import Userpop from './Userpop';

const Popup = (): React.ReactElement => {
  const { getIsChargeMode, handleIsChargeMode } = isChargeModeFn();
  const [isChargeMode, setIsChargeMode] = useState<boolean>(false);

  /**
   * modeState初期化
   */
  useEffect(() => {
    const fetchMode = async () => {
      const nowMode = await getIsChargeMode();
      setIsChargeMode(nowMode);
    };
    fetchMode();
  }, []);

  /**
   * 従量課金モードとAPIキーモードの切り替え
   */
  const handleChangeMode = async () => {
    setIsChargeMode(!isChargeMode);
    await handleIsChargeMode(!isChargeMode);
  };

  return (
    <Stack spacing={1} sx={{ width: '250px', height: '400px', p: 3 }}>
      <Box sx={{ height: '150px' }}> {isChargeMode ? <Apipop /> : <ChargeModeHeader />}</Box>
      <Optionpopup />
      <ChargeModeSwitch isCheck={isChargeMode} handleChange={handleChangeMode} />
    </Stack>
  );
};

export default Popup;
