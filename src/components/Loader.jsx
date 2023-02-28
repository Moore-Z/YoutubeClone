import React from 'react'
import { Box, CircularProgress, Stack } from '@mui/material'
const Loader = () => (
  <Box minHeight="95vh">
    <Stack directon='row' justifyContent='center' alignContent="center" height='80vh'>
      <CircularProgress />

    </Stack>
  </Box>
);

export default Loader