import React, { useState } from 'react';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import CircularProgress from '@mui/material/CircularProgress';

const ReturnEndicon = (props: { is_connecting: boolean }) => {
  const { is_connecting } = props;
  if (is_connecting === true) {
    return <CircularProgress color="inherit" size={20} />;
  } else {
    return <KeyboardReturnIcon />;
  }
};

export default ReturnEndicon;
