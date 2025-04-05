'use client';

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

// Mock resources data
const mockResources = [
  {
    id: '1',
    name: 'Main Auditorium',
    type: 'Venue',
    capacity: 500,
    description: 'Fully air-conditioned auditorium with modern audio-visual equipment',
    availability: 'available',
    image: '/images/auditorium.jpg',
  },
  {
    id: '2',
    name: 'Conference Room A',
    type: 'Venue',
    capacity: 50,
    description: 'Meeting room with projector and whiteboard',
    availability: 'booked',
    image: '/images/conference-room.jpg',
  },
  {
    id: '3',
    name: 'Sound System',
    type: 'Equipment',
    description: 'Professional sound system with speakers and mixer',
    availability: 'available',
    image: '/images/sound-system.jpg',
  },
  {
    id: '4',
    name: 'Projector Set',
    type: 'Equipment',
    description: 'HD projector with screen',
    availability: 'maintenance',
    image: '/images/projector.jpg',
  },
];

interface BookingFormData {
  startDate: dayjs.Dayjs | null;
  endDate: dayjs.Dayjs | null;
  purpose: string;
  attendees: string;
}

export default function ResourcesPage() {
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState<BookingFormData>({
    startDate: null,
    endDate: null,
    purpose: '',
    attendees: '',
  });

  const handleBookingSubmit = () => {
    // Here you would typically make an API call to submit the booking
    console.log('Booking submitted:', { resource: selectedResource, ...bookingForm });
    setBookingDialogOpen(false);
    setBookingForm({
      startDate: null,
      endDate: null,
      purpose: '',
      attendees: '',
    });
  };

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'success';
      case 'booked':
        return 'error';
      case 'maintenance':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Resources
      </Typography>

      <Grid container spacing={3}>
        {mockResources.map((resource) => (
          <Grid item xs={12} sm={6} md={4} key={resource.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {resource.name}
                </Typography>
                <Chip
                  label={resource.availability.charAt(0).toUpperCase() + resource.availability.slice(1)}
                  color={getAvailabilityColor(resource.availability) as any}
                  size="small"
                  sx={{ mb: 2 }}
                />
                <Typography variant="body2" color="text.secondary" paragraph>
                  {resource.description}
                </Typography>
                {resource.type === 'Venue' && (
                  <Typography variant="body2" color="text.secondary">
                    Capacity: {resource.capacity} people
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  disabled={resource.availability !== 'available'}
                  onClick={() => {
                    setSelectedResource(resource);
                    setBookingDialogOpen(true);
                  }}
                >
                  Book Now
                </Button>
                <Button size="small">View Details</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Booking Dialog */}
      <Dialog
        open={bookingDialogOpen}
        onClose={() => setBookingDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Book {selectedResource?.name}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <DateTimePicker
                    label="Start Date & Time"
                    value={bookingForm.startDate}
                    onChange={(newValue) => setBookingForm(prev => ({ ...prev, startDate: newValue }))}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required: true
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DateTimePicker
                    label="End Date & Time"
                    value={bookingForm.endDate}
                    onChange={(newValue) => setBookingForm(prev => ({ ...prev, endDate: newValue }))}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required: true
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </LocalizationProvider>

            <TextField
              fullWidth
              label="Purpose"
              multiline
              rows={3}
              value={bookingForm.purpose}
              onChange={(e) => setBookingForm(prev => ({ ...prev, purpose: e.target.value }))}
              sx={{ mt: 3 }}
              required
            />

            {selectedResource?.type === 'Venue' && (
              <TextField
                fullWidth
                label="Expected Attendees"
                type="number"
                value={bookingForm.attendees}
                onChange={(e) => setBookingForm(prev => ({ ...prev, attendees: e.target.value }))}
                sx={{ mt: 3 }}
                required
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBookingDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleBookingSubmit}>
            Submit Booking
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
} 