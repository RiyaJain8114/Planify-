'use client';

import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { useRouter } from 'next/navigation';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100%',
        flex: 1,
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          py: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <ErrorIcon sx={{ fontSize: 64, color: 'error.main', mb: 3 }} />
        <Typography variant="h4" component="h1" gutterBottom>
          Access Denied
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          You do not have permission to access this page. Please contact your administrator if you believe this is an error.
        </Typography>
        <Button
          variant="contained"
          onClick={() => router.push('/')}
          sx={{ minWidth: 200 }}
        >
          Return to Home
        </Button>
      </Container>
    </Box>
  );
} 