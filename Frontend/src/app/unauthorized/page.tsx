'use client';

import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { useRouter } from 'next/navigation';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
      <Box sx={{ color: 'error.main', mb: 4 }}>
        <ErrorIcon sx={{ fontSize: 64 }} />
      </Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Access Denied
      </Typography>
      <Typography color="text.secondary" paragraph>
        You do not have permission to access this page. Please contact your administrator if you believe this is an error.
      </Typography>
      <Button 
        variant="contained" 
        onClick={() => router.push('/')}
        sx={{ mt: 2 }}
      >
        Return to Home
      </Button>
    </Container>
  );
} 