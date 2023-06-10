import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';

const Endicon = (props: { is_connecting: boolean }) => {
  const { is_connecting } = props;
  if (is_connecting === true) {
    return <CircularProgress color="inherit" size={20} />;
  } else {
    return <SendIcon />;
  }
};

export default Endicon;
