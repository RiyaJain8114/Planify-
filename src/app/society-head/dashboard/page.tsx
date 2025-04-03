'use client';

import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { navigation } from '@/config/navigation';

export default function SocietyHeadDashboard() {
  const router = useRouter();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Society Head Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Society Profile
              </Typography>
              <Typography color="text.secondary" paragraph>
                Manage your society's profile, achievements, and upcoming events.
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => router.push(navigation.societyHead.society.profile.path)}
              >
                View Profile
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Events Management
              </Typography>
              <Typography color="text.secondary" paragraph>
                Create and manage your society's events.
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => router.push(navigation.societyHead.events.create.path)}
              >
                Create Event
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
} 