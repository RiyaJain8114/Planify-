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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Divider,
  LinearProgress,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import GroupsIcon from '@mui/icons-material/Groups';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Mock data
const dashboardData = {
  stats: {
    totalSocieties: 15,
    activeEvents: 8,
    resourceUtilization: 75,
    pendingApprovals: 5,
  },
  pendingApprovals: [
    {
      id: '1',
      type: 'event',
      title: 'Technical Workshop',
      society: 'Technical Society',
      date: '2024-03-20',
      status: 'pending',
    },
    {
      id: '2',
      type: 'society',
      title: 'Photography Club Registration',
      requestedBy: 'John Doe',
      date: '2024-03-18',
      status: 'pending',
    },
  ],
  recentEvents: [
    {
      id: '1',
      title: 'Cultural Night',
      society: 'Cultural Society',
      date: '2024-03-15',
      venue: 'Main Auditorium',
      status: 'completed',
    },
    {
      id: '2',
      title: 'Coding Competition',
      society: 'Technical Society',
      date: '2024-03-16',
      venue: 'Computer Lab',
      status: 'upcoming',
    },
  ],
  resourceStats: [
    { name: 'Main Auditorium', usage: 85 },
    { name: 'Computer Lab', usage: 70 },
    { name: 'Conference Room', usage: 60 },
  ],
};

export default function DashboardPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        College Authority Dashboard
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Societies
              </Typography>
              <Typography variant="h4">
                {dashboardData.stats.totalSocieties}
              </Typography>
              <GroupsIcon color="primary" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Active Events
              </Typography>
              <Typography variant="h4">
                {dashboardData.stats.activeEvents}
              </Typography>
              <EventIcon color="primary" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Resource Utilization
              </Typography>
              <Typography variant="h4">
                {dashboardData.stats.resourceUtilization}%
              </Typography>
              <LocationOnIcon color="primary" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Pending Approvals
              </Typography>
              <Typography variant="h4">
                {dashboardData.stats.pendingApprovals}
              </Typography>
              <AssessmentIcon color="primary" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Pending Approvals */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Pending Approvals</Typography>
                <Button variant="outlined" size="small">
                  View All
                </Button>
              </Box>
              <List>
                {dashboardData.pendingApprovals.map((item) => (
                  <React.Fragment key={item.id}>
                    <ListItem>
                      <ListItemIcon>
                        <PendingIcon color="warning" />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.title}
                        secondary={`${item.type === 'event' ? item.society : item.requestedBy} • ${item.date}`}
                      />
                      <Chip label={item.type} size="small" />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Events */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Recent Events</Typography>
                <Button variant="outlined" size="small">
                  View All
                </Button>
              </Box>
              <List>
                {dashboardData.recentEvents.map((event) => (
                  <React.Fragment key={event.id}>
                    <ListItem>
                      <ListItemIcon>
                        <EventIcon color={event.status === 'completed' ? 'success' : 'primary'} />
                      </ListItemIcon>
                      <ListItemText
                        primary={event.title}
                        secondary={`${event.society} • ${event.venue} • ${event.date}`}
                      />
                      <Chip
                        label={event.status}
                        color={event.status === 'completed' ? 'success' : 'primary'}
                        size="small"
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Resource Usage */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Resource Usage
              </Typography>
              <Grid container spacing={2}>
                {dashboardData.resourceStats.map((resource, index) => (
                  <Grid item xs={12} key={index}>
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">{resource.name}</Typography>
                        <Typography variant="body2">{resource.usage}%</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={resource.usage} />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
} 