import React, { ReactElement } from 'react';
import Grid from '@mui/material/Grid';

import Main from './features/main/Main';

import 'bootstrap/dist/css/bootstrap.min.css';

const Content = (): ReactElement => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <Main />
      </Grid>
    </Grid>
  );
};

export default Content;
