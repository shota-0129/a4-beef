import React, { ReactElement } from 'react';
//import { Gmail_icon } from '../../public/images/Gmail_icon.png';
import { AiOutlineMail } from 'react-icons/ai';
import Box from '@mui/material/Box';

import { Counter } from './features/counter';

const Content = (): ReactElement => {
  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 999,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgb(255 255 255 / 100%)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <AiOutlineMail />
        Gmail GPT
      </div>
      <Counter />
    </div>
  );
};

export default Content;
