'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Divider,
  Chip,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardActions,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import BusinessIcon from '@mui/icons-material/Business';

// Mock data for demonstration
const mockUserProfile = {
  name: 'Priya Sharma',
  email: 'priya.sharma@college.edu',
  phoneNumber: '+91 9876543210',
  role: 'student',
  collegeId: '2023CS123',
  department: 'Computer Science',
  year: '3rd Year',
  society: {
    name: 'Tech Club',
    role: 'coordinator',
    position: 'Technical Head'
  },
  createdAt: new Date('2023-01-15'),
  status: 'active'
};

const mockEvents = [
  {
    id: 'event1',
    title: 'Hackathon 2024',
    description: 'Annual coding competition',
    startDate: '2024-03-15',
    endDate: '2024-03-16',
    venue: 'Computer Science Department',
    category: 'Technical',
    status: 'approved',
    requirements: {
      budget: 50000,
      equipment: ['Projectors', 'Computers'],
      permissions: ['Department Approval', 'Lab Access'],
      participants: 100
    },
    sponsors: [
      {
        name: 'Tech Solutions Inc.',
        contact: 'contact@techsolutions.com',
        contribution: '₹25,000',
        status: 'confirmed'
      }
    ]
  },
  {
    id: 'event2',
    title: 'Tech Workshop',
    description: 'Web Development Workshop',
    startDate: '2024-04-01',
    endDate: '2024-04-02',
    venue: 'Main Auditorium',
    category: 'Technical',
    status: 'pending',
    requirements: {
      budget: 20000,
      equipment: ['Projector', 'Sound System'],
      permissions: ['Auditorium Booking'],
      participants: 50
    },
    sponsors: []
  }
];

const ProfilePage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState(mockUserProfile);
  const [events, setEvents] = useState(mockEvents);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  
  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Profile Header */}
        <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Avatar 
              sx={{ 
                width: 120, 
                height: 120, 
                  margin: '0 auto',
                  mb: 2
                }}
              />
          <Typography variant="h5" gutterBottom fontWeight="bold">
                {profile.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                {profile.society.position} - {profile.society.name}
                    </Typography>
                  </Grid>
                  
            <Grid item xs={12} md={8}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <SchoolIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="College Details" 
                    secondary={`${profile.department}, ${profile.year} (ID: ${profile.collegeId})`} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <GroupIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Society Role" 
                    secondary={`${profile.society.role.charAt(0).toUpperCase() + profile.society.role.slice(1)} - ${profile.society.position}`} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BusinessIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Contact" 
                    secondary={`${profile.email} | ${profile.phoneNumber}`} 
                  />
                </ListItem>
              </List>
                  </Grid>
                </Grid>
        </Paper>

        {/* Tabs Section */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="My Events" />
            <Tab label="Society Events" />
            <Tab label="Sponsors" />
          </Tabs>
              </Box>
              
        {/* Tab Content */}
        <Box sx={{ mt: 3 }}>
          {/* My Events Tab */}
          {activeTab === 0 && (
                <Grid container spacing={3}>
              {events.map((event) => (
                <Grid item xs={12} md={6} key={event.id}>
                  <Card sx={{ height: '100%' }}>
                        <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6" component="h3" fontWeight="bold">
                            {event.title}
                          </Typography>
                        <Chip 
                          label={event.status} 
                          color={event.status === 'approved' ? 'success' : 'warning'}
                          size="small"
                        />
                          </Box>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {event.description}
                            </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemIcon>
                            <CalendarTodayIcon fontSize="small" color="primary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Date" 
                            secondary={`${new Date(event.startDate).toLocaleDateString()} - ${new Date(event.endDate).toLocaleDateString()}`} 
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <LocationOnIcon fontSize="small" color="primary" />
                          </ListItemIcon>
                          <ListItemText primary="Venue" secondary={event.venue} />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <EventIcon fontSize="small" color="primary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Requirements" 
                            secondary={`Budget: ₹${event.requirements.budget} | Participants: ${event.requirements.participants}`} 
                          />
                        </ListItem>
                      </List>
                        </CardContent>
                        <CardActions>
                          <Button
                            size="small"
                        variant="outlined"
                            component={Link}
                            href={`/events/${event.id}`}
                          >
                            View Details
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                        component={Link}
                        href={`/events/${event.id}/edit`}
                      >
                        Edit Event
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
          )}

          {/* Society Events Tab */}
          {activeTab === 1 && (
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom>
                All Society Events
                  </Typography>
                  <Button 
                    variant="contained" 
                color="primary"
                    component={Link}
                href="/events/create"
                sx={{ mb: 3 }}
              >
                Create New Event
                  </Button>
              {/* Add society events list here */}
            </Paper>
          )}

          {/* Sponsors Tab */}
          {activeTab === 2 && (
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom>
                Sponsor Management
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                href="/sponsors/add"
                sx={{ mb: 3 }}
              >
                Add New Sponsor
              </Button>
              {/* Add sponsors list here */}
            </Paper>
          )}
            </Box>
      </Container>
    </Layout>
  );
};

export default ProfilePage;