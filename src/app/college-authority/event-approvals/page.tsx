'use client';

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputAdornment,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';
import SearchIcon from '@mui/icons-material/Search';
import Layout from '@/components/layout/Layout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Mock data
const mockEvents = [
  {
    id: '1',
    title: 'Technical Workshop 2024',
    society: 'Technical Society',
    date: '2024-03-20',
    time: '10:00 AM - 2:00 PM',
    venue: 'Main Auditorium',
    expectedParticipants: 200,
    description: 'A workshop on latest technologies and their applications.',
    requirements: 'Projector, Sound System, Laptops',
    budget: 15000,
    status: 'pending',
  },
  {
    id: '2',
    title: 'Cultural Night',
    society: 'Cultural Society',
    date: '2024-03-25',
    time: '6:00 PM - 10:00 PM',
    venue: 'Open Air Theatre',
    expectedParticipants: 500,
    description: 'Annual cultural night featuring performances from various societies.',
    requirements: 'Stage, Sound System, Lighting',
    budget: 50000,
    status: 'approved',
  },
  {
    id: '3',
    title: 'Coding Competition',
    society: 'Programming Club',
    date: '2024-04-05',
    time: '9:00 AM - 5:00 PM',
    venue: 'Computer Labs',
    expectedParticipants: 100,
    description: 'Annual coding competition with multiple rounds.',
    requirements: 'Computers, Internet, Projector',
    budget: 10000,
    status: 'rejected',
  },
];

export default function EventApprovalsPage() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [comments, setComments] = useState('');

  const handleReviewClick = (event: any) => {
    setSelectedEvent(event);
    setReviewDialogOpen(true);
  };

  const handleApprove = () => {
    console.log('Approving event:', selectedEvent.id);
    setReviewDialogOpen(false);
  };

  const handleReject = () => {
    console.log('Rejecting event:', selectedEvent.id);
    setReviewDialogOpen(false);
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'approved':
        return <Chip icon={<CheckCircleIcon />} label="Approved" color="success" size="small" />;
      case 'rejected':
        return <Chip icon={<CancelIcon />} label="Rejected" color="error" size="small" />;
      case 'pending':
        return <Chip icon={<PendingIcon />} label="Pending" color="warning" size="small" />;
      default:
        return null;
    }
  };

  const filteredEvents = mockEvents.filter(event => {
    if (filterStatus !== 'all' && event.status !== filterStatus) return false;
    if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <ProtectedRoute allowedRoles={['COLLEGE_AUTHORITY']}>
      <Layout>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Event Approvals
          </Typography>

          <Paper sx={{ mb: 4, p: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={filterStatus}
                    label="Status"
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <MenuItem value="all">All Status</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="approved">Approved</MenuItem>
                    <MenuItem value="rejected">Rejected</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>

          <Grid container spacing={3}>
            {filteredEvents.map((event) => (
              <Grid item xs={12} key={event.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {event.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {event.description}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                          {getStatusChip(event.status)}
                          <Chip
                            icon={<GroupsIcon />}
                            label={`${event.expectedParticipants} Participants`}
                            size="small"
                          />
                          <Chip
                            icon={<LocationOnIcon />}
                            label={event.venue}
                            size="small"
                          />
                        </Box>
                      </Box>
                      {event.status === 'pending' && (
                        <Button
                          variant="contained"
                          onClick={() => handleReviewClick(event)}
                        >
                          Review
                        </Button>
                      )}
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <List dense>
                          <ListItem>
                            <ListItemIcon>
                              <CalendarMonthIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary="Date & Time"
                              secondary={`${event.date} • ${event.time}`}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <GroupsIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary="Organizing Society"
                              secondary={event.society}
                            />
                          </ListItem>
                        </List>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <List dense>
                          <ListItem>
                            <ListItemIcon>
                              <EventIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary="Requirements"
                              secondary={event.requirements}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <EventIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary="Budget"
                              secondary={`₹${event.budget.toLocaleString()}`}
                            />
                          </ListItem>
                        </List>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Review Dialog */}
          <Dialog
            open={reviewDialogOpen}
            onClose={() => setReviewDialogOpen(false)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>Review Event Request</DialogTitle>
            <DialogContent>
              {selectedEvent && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {selectedEvent.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {selectedEvent.description}
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        Event Details
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemText
                            primary="Date & Time"
                            secondary={`${selectedEvent.date} • ${selectedEvent.time}`}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Venue"
                            secondary={selectedEvent.venue}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Expected Participants"
                            secondary={selectedEvent.expectedParticipants}
                          />
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        Organization Details
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemText
                            primary="Society"
                            secondary={selectedEvent.society}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Requirements"
                            secondary={selectedEvent.requirements}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Budget"
                            secondary={`₹${selectedEvent.budget.toLocaleString()}`}
                          />
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>

                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Comments"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    sx={{ mt: 2 }}
                  />
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setReviewDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleReject} color="error">
                Reject
              </Button>
              <Button onClick={handleApprove} variant="contained" color="success">
                Approve
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Layout>
    </ProtectedRoute>
  );
} 