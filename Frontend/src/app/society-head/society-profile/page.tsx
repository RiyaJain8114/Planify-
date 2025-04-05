'use client';

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  Card,
  CardContent,
} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

// Mock society data
const mockSociety = {
  name: 'Technical Society',
  description: 'A society dedicated to fostering technical innovation and learning',
  established: '2020',
  head: 'John Doe',
  facultyAdvisor: 'Dr. Smith',
  email: 'tech.society@college.edu',
  phone: '+91 9876543210',
  memberCount: 150,
  achievements: [
    'Winner of National Coding Championship 2023',
    'Best Technical Society Award 2022',
    'Organized 10+ successful workshops'
  ],
  upcomingEvents: [
    { name: 'Tech Workshop 2024', date: '2024-03-15' },
    { name: 'Coding Competition', date: '2024-04-01' }
  ]
};

export default function SocietyProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [societyData, setSocietyData] = useState(mockSociety);

  const handleSave = () => {
    // Here you would typically make an API call to save the changes
    setIsEditing(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Society Profile
        </Typography>
        <Button
          variant="contained"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </Box>

      <Grid container spacing={4}>
        {/* Society Info Card */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            {isEditing ? (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Society Name"
                    value={societyData.name}
                    onChange={(e) => setSocietyData({ ...societyData, name: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Description"
                    value={societyData.description}
                    onChange={(e) => setSocietyData({ ...societyData, description: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={societyData.email}
                    onChange={(e) => setSocietyData({ ...societyData, email: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={societyData.phone}
                    onChange={(e) => setSocietyData({ ...societyData, phone: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                    <Button variant="contained" onClick={handleSave}>
                      Save Changes
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            ) : (
              <>
                <Typography variant="h5" gutterBottom>
                  {societyData.name}
                </Typography>
                <Typography color="text.secondary" paragraph>
                  {societyData.description}
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Faculty Advisor"
                      secondary={societyData.facultyAdvisor}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Contact Information"
                      secondary={`${societyData.email} | ${societyData.phone}`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Established"
                      secondary={societyData.established}
                    />
                  </ListItem>
                </List>
              </>
            )}
          </Paper>
        </Grid>

        {/* Stats Cards */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <GroupIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{societyData.memberCount}</Typography>
                    <Typography color="text.secondary">Members</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'success.main' }}>
                    <EventIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{societyData.upcomingEvents.length}</Typography>
                    <Typography color="text.secondary">Upcoming Events</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Achievements Section */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmojiEventsIcon color="primary" />
              Achievements
            </Typography>
            <List>
              {societyData.achievements.map((achievement, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText primary={achievement} />
                  </ListItem>
                  {index < societyData.achievements.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}