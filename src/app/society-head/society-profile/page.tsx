'use client';

import React from 'react';
import { Container, Typography, Box } from '@mui/material';

export default function SocietyProfilePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Society Profile
      </Typography>
      <Box>
        <Typography>This is the society profile page.</Typography>
      </Box>
    </Container>
  );
}