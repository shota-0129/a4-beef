import React from 'react';
import Box from '@mui/material/Box';

import Apipop from './Apipop';
import Optionpopup from './Optionpop';
import Userpop from './Userpop';

const Popup = (): React.ReactElement => {
  return (
    <Box>
      {/* <Userpop /> */}
      <Apipop />
      <Optionpopup />
    </Box>
  );
};

export default Popup;
