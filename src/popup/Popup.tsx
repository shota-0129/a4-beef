import React from 'react';
import Box from '@mui/material/Box';

import Apipop from './Apipop';
import Userpop from './Userpop';

const Popup = (): React.ReactElement => {
  return (
    <Box>
      <Userpop />
      <Apipop />
    </Box>
  );
};

export default Popup;
