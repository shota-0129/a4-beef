import React, { ReactElement } from 'react';

// import { Link } from '@mui/material';
//import { Gmail_icon } from '../../public/images/Gmail_icon.png';
// import Box from '@mui/material/Box';
import { Main } from './features/main/Main';

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
      <Main />
    </div>
  );
};

export default Content;
