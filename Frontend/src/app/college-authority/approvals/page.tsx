'use client';

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from '@mui/icons-material/Cancel';
import FilterListIcon from '@mui/icons-material/FilterList';

// Mock data
const mockEvents = [
  {
    id: '1',
    title: 'Technical Workshop 2024',
    society: 'Technical Society',
    date: '2024-03-15',
    venue: 'Computer Lab 101',
    description: 'A comprehensive workshop on modern web development technologies.',
    status: 'pending',
    requirements: ['Projector', 'Laptops', 'Internet Connection'],
    budget: '50000',
    expectedParticipants: 100,
  },
  {
    id: '2',
    title: 'Cultural Night',
    society: 'Cultural Society',
    date: '2024-03-20',
    venue: 'Main Auditorium',
    description: 'Annual cultural night showcasing various performances.',
    status: 'approved',
    requirements: ['Sound System', 'Stage Setup', 'Lighting'],
    budget: '75000',
    expectedParticipants: 300,
  },
  {
    id: '3',
    title: 'Coding Competition',
    society: 'Technical Society',
    date: '2024-04-01',
    venue: 'Computer Lab 102',
    description: 'Inter-college coding competition.',
    status: 'rejected',
    requirements: ['Computers', 'Coding Platform Access'],
    budget: '30000',
    expectedParticipants: 50,
  },
];

const ApprovalsPage = () => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSociety, setFilterSociety] = useState('all');

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
      case 'pending':
        return <Chip icon={<PendingIcon />} label="Pending" color="warning" size="small" />;
      case 'rejected':
        return <Chip icon={<CancelIcon />} label="Rejected" color="error" size="small" />;
      default:
        return null;
    }
  };

  const filteredEvents = mockEvents.filter(event => {
    if (filterStatus !== 'all' && event.status !== filterStatus) return false;
    if (filterSociety !== 'all' && event.society !== filterSociety) return false;
    return true;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Event Approvals
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
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
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Society</InputLabel>
            <Select
              value={filterSociety}
              label="Society"
              onChange={(e) => setFilterSociety(e.target.value)}
            >
              <MenuItem value="all">All Societies</MenuItem>
              <MenuItem value="Technical Society">Technical Society</MenuItem>
              <MenuItem value="Cultural Society">Cultural Society</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

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
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {event.society} • {event.date} • {event.venue}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {event.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                      {event.requirements.map((req, index) => (
                        <Chip key={index} label={req} size="small" />
                      ))}
                    </Box>
                    <Typography variant="body2">
                      Budget: ₹{event.budget} • Expected Participants: {event.expectedParticipants}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {getStatusChip(event.status)}
                    {event.status === 'pending' && (
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleReviewClick(event)}
                      >
                        Review
                      </Button>
                    )}
                  </Box>
                </Box>
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
        <DialogTitle>Review Event</DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                {selectedEvent.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {selectedEvent.society} • {selectedEvent.date} • {selectedEvent.venue}
              </Typography>
              <Typography variant="body2" paragraph>
                {selectedEvent.description}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" gutterBottom>
                Event Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">
                    <strong>Budget:</strong> ₹{selectedEvent.budget}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">
                    <strong>Expected Participants:</strong> {selectedEvent.expectedParticipants}
                  </Typography>
                </Grid>
              </Grid>

              <Typography variant="subtitle1" sx={{ mt: 2 }} gutterBottom>
                Requirements
              </Typography>
              <List dense>
                {selectedEvent.requirements.map((req: string, index: number) => (
                  <ListItem key={index}>
                    <ListItemText primary={req} />
                  </ListItem>
                ))}
              </List>

              <TextField
                fullWidth
                multiline
                rows={4}
                label="Comments"
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
  );
};

export default ApprovalsPage; 