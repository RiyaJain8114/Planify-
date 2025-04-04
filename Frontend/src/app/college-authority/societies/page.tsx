'use client';

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Divider,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import GroupIcon from '@mui/icons-material/Group';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Layout from '@/components/layout/Layout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Mock data
const mockSocieties = [
  {
    id: '1',
    name: 'Technical Society',
    logo: '/tech-society-logo.png',
    description: 'A society dedicated to fostering technical innovation and learning among students.',
    email: 'tech.society@college.edu',
    phone: '+91 9876543210',
    location: 'Computer Science Building, Room 101',
    establishedYear: '2010',
    memberCount: '150',
    status: 'active',
    head: 'John Doe',
    facultyAdvisor: 'Dr. Sarah Johnson',
    events: [
      { id: '1', title: 'Technical Workshop 2024', date: '2024-03-15', status: 'pending' },
      { id: '2', title: 'Coding Competition', date: '2024-04-01', status: 'approved' },
    ],
  },
  {
    id: '2',
    name: 'Cultural Society',
    logo: '/cultural-society-logo.png',
    description: 'Promoting cultural activities and artistic expression among students.',
    email: 'cultural.society@college.edu',
    phone: '+91 9876543211',
    location: 'Arts Building, Room 201',
    establishedYear: '2012',
    memberCount: '200',
    status: 'active',
    head: 'Jane Smith',
    facultyAdvisor: 'Dr. Michael Brown',
    events: [
      { id: '3', title: 'Cultural Night', date: '2024-03-20', status: 'approved' },
      { id: '4', title: 'Dance Workshop', date: '2024-04-05', status: 'pending' },
    ],
  },
];

const SocietiesPage = () => {
  const [selectedSociety, setSelectedSociety] = useState<any>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleEditClick = (society: any) => {
    setSelectedSociety(society);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (society: any) => {
    setSelectedSociety(society);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log('Deleting society:', selectedSociety.id);
    setDeleteDialogOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updating society:', selectedSociety.id);
    setEditDialogOpen(false);
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'active':
        return <Chip label="Active" color="success" size="small" />;
      case 'inactive':
        return <Chip label="Inactive" color="error" size="small" />;
      default:
        return null;
    }
  };

  return (
    <ProtectedRoute allowedRoles={['COLLEGE_AUTHORITY']}>
      <Layout>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1">
              Societies Management
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
            >
              Add New Society
            </Button>
          </Box>

          <Grid container spacing={3}>
            {mockSocieties.map((society) => (
              <Grid item xs={12} key={society.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box sx={{ display: 'flex', gap: 3 }}>
                        <Avatar
                          src={society.logo}
                          sx={{ width: 100, height: 100 }}
                        />
                        <Box>
                          <Typography variant="h6" gutterBottom>
                            {society.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" paragraph>
                            {society.description}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                            {getStatusChip(society.status)}
                            <Chip
                              icon={<GroupIcon />}
                              label={`${society.memberCount} Members`}
                              size="small"
                            />
                            <Chip
                              icon={<CalendarMonthIcon />}
                              label={`Est. ${society.establishedYear}`}
                              size="small"
                            />
                          </Box>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton onClick={() => handleEditClick(society)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteClick(society)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" gutterBottom>
                          Contact Information
                        </Typography>
                        <List dense>
                          <ListItem>
                            <ListItemIcon>
                              <EmailIcon />
                            </ListItemIcon>
                            <ListItemText primary={society.email} />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <PhoneIcon />
                            </ListItemIcon>
                            <ListItemText primary={society.phone} />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <LocationOnIcon />
                            </ListItemIcon>
                            <ListItemText primary={society.location} />
                          </ListItem>
                        </List>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" gutterBottom>
                          Leadership
                        </Typography>
                        <List dense>
                          <ListItem>
                            <ListItemText
                              primary="Society Head"
                              secondary={society.head}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                              primary="Faculty Advisor"
                              secondary={society.facultyAdvisor}
                            />
                          </ListItem>
                        </List>
                      </Grid>
                    </Grid>

                    <Typography variant="subtitle1" sx={{ mt: 2 }} gutterBottom>
                      Upcoming Events
                    </Typography>
                    <List dense>
                      {society.events.map((event) => (
                        <ListItem key={event.id}>
                          <ListItemText
                            primary={event.title}
                            secondary={event.date}
                          />
                          <Chip
                            label={event.status}
                            color={event.status === 'approved' ? 'success' : 'warning'}
                            size="small"
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Edit Society Dialog */}
          <Dialog
            open={editDialogOpen}
            onClose={() => setEditDialogOpen(false)}
            maxWidth="md"
            fullWidth
          >
            <form onSubmit={handleFormSubmit}>
              <DialogTitle>Edit Society</DialogTitle>
              <DialogContent>
                {selectedSociety && (
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Society Name"
                        defaultValue={selectedSociety.name}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Description"
                        multiline
                        rows={4}
                        defaultValue={selectedSociety.description}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        defaultValue={selectedSociety.email}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone"
                        defaultValue={selectedSociety.phone}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Location"
                        defaultValue={selectedSociety.location}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Society Head"
                        defaultValue={selectedSociety.head}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Faculty Advisor"
                        defaultValue={selectedSociety.facultyAdvisor}
                        required
                      />
                    </Grid>
                  </Grid>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                <Button type="submit" variant="contained">
                  Save Changes
                </Button>
              </DialogActions>
            </form>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
          >
            <DialogTitle>Delete Society</DialogTitle>
            <DialogContent>
              Are you sure you want to delete {selectedSociety?.name}? This action cannot be undone.
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Layout>
    </ProtectedRoute>
  );
};

export default SocietiesPage; 