'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
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
  Alert,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Room as RoomIcon,
  Event as EventIcon,
  Build as BuildIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { THEME_COLORS } from '@/components/layout/Layout';
import Layout from '@/components/layout/Layout';

interface Venue {
  id: string;
  name: string;
  capacity: number;
  type: 'hall' | 'classroom' | 'auditorium' | 'outdoor';
  resources: string[];
  availability: boolean;
  bookings: Booking[];
}

interface Resource {
  id: string;
  name: string;
  type: 'projector' | 'microphone' | 'speaker' | 'screen' | 'other';
  availability: boolean;
  bookings: Booking[];
}

interface Booking {
  id: string;
  venueId: string;
  resourceIds: string[];
  eventName: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  requestedBy: string;
  status: 'pending' | 'approved' | 'rejected';
}

// Mock data
const mockVenues: Venue[] = [
  {
    id: '1',
    name: 'Main Auditorium',
    capacity: 500,
    type: 'auditorium',
    resources: ['1', '2', '3'],
    availability: true,
    bookings: [
      {
        id: 'b1',
        venueId: '1',
        resourceIds: ['1', '2'],
        eventName: 'Annual College Day',
        eventDate: '2023-12-15',
        startTime: '09:00',
        endTime: '17:00',
        requestedBy: 'admin@college.edu',
        status: 'approved',
      },
    ],
  },
  {
    id: '2',
    name: 'Seminar Hall A',
    capacity: 100,
    type: 'hall',
    resources: ['1', '4'],
    availability: true,
    bookings: [],
  },
  {
    id: '3',
    name: 'Classroom 101',
    capacity: 50,
    type: 'classroom',
    resources: ['1'],
    availability: true,
    bookings: [],
  },
  {
    id: '4',
    name: 'Sports Ground',
    capacity: 1000,
    type: 'outdoor',
    resources: ['5'],
    availability: true,
    bookings: [],
  },
];

const mockResources: Resource[] = [
  {
    id: '1',
    name: 'HD Projector',
    type: 'projector',
    availability: true,
    bookings: [],
  },
  {
    id: '2',
    name: 'Wireless Microphone Set',
    type: 'microphone',
    availability: true,
    bookings: [],
  },
  {
    id: '3',
    name: 'Sound System',
    type: 'speaker',
    availability: true,
    bookings: [],
  },
  {
    id: '4',
    name: 'Large Screen',
    type: 'screen',
    availability: true,
    bookings: [],
  },
  {
    id: '5',
    name: 'Portable Stage',
    type: 'other',
    availability: true,
    bookings: [],
  },
];

const VenuesPage = () => {
  const [venues, setVenues] = useState<Venue[]>(mockVenues);
  const [resources, setResources] = useState<Resource[]>(mockResources);
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'venue' | 'resource' | 'booking'>('venue');
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
    type: '',
    resources: [] as string[],
    eventName: '',
    eventDate: '',
    startTime: '',
    endTime: '',
  });
  const [alert, setAlert] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (type: 'venue' | 'resource' | 'booking', item?: Venue | Resource) => {
    setDialogType(type);
    if (type === 'venue' && item) {
      setSelectedVenue(item as Venue);
      setFormData({
        name: item.name,
        capacity: item.capacity.toString(),
        type: item.type,
        resources: item.resources,
        eventName: '',
        eventDate: '',
        startTime: '',
        endTime: '',
      });
    } else if (type === 'resource' && item) {
      setSelectedResource(item as Resource);
      setFormData({
        name: item.name,
        capacity: '',
        type: item.type,
        resources: [],
        eventName: '',
        eventDate: '',
        startTime: '',
        endTime: '',
      });
    } else {
      setSelectedVenue(null);
      setSelectedResource(null);
      setFormData({
        name: '',
        capacity: '',
        type: '',
        resources: [],
        eventName: '',
        eventDate: '',
        startTime: '',
        endTime: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedVenue(null);
    setSelectedResource(null);
    setFormData({
      name: '',
      capacity: '',
      type: '',
      resources: [],
      eventName: '',
      eventDate: '',
      startTime: '',
      endTime: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name as string]: value,
    });
  };

  const handleResourceToggle = (resourceId: string) => {
    setFormData({
      ...formData,
      resources: formData.resources.includes(resourceId)
        ? formData.resources.filter(id => id !== resourceId)
        : [...formData.resources, resourceId],
    });
  };

  const handleSubmit = () => {
    if (dialogType === 'venue') {
      if (selectedVenue) {
        // Update existing venue
        const updatedVenues = venues.map(venue => 
          venue.id === selectedVenue.id 
            ? { 
                ...venue, 
                name: formData.name, 
                capacity: parseInt(formData.capacity), 
                type: formData.type as 'hall' | 'classroom' | 'auditorium' | 'outdoor',
                resources: formData.resources,
              } 
            : venue
        );
        setVenues(updatedVenues);
        setAlert({ type: 'success', message: 'Venue updated successfully!' });
      } else {
        // Add new venue
        const newVenue: Venue = {
          id: (venues.length + 1).toString(),
          name: formData.name,
          capacity: parseInt(formData.capacity),
          type: formData.type as 'hall' | 'classroom' | 'auditorium' | 'outdoor',
          resources: formData.resources,
          availability: true,
          bookings: [],
        };
        setVenues([...venues, newVenue]);
        setAlert({ type: 'success', message: 'Venue added successfully!' });
      }
    } else if (dialogType === 'resource') {
      if (selectedResource) {
        // Update existing resource
        const updatedResources = resources.map(resource => 
          resource.id === selectedResource.id 
            ? { 
                ...resource, 
                name: formData.name, 
                type: formData.type as 'projector' | 'microphone' | 'speaker' | 'screen' | 'other',
              } 
            : resource
        );
        setResources(updatedResources);
        setAlert({ type: 'success', message: 'Resource updated successfully!' });
      } else {
        // Add new resource
        const newResource: Resource = {
          id: (resources.length + 1).toString(),
          name: formData.name,
          type: formData.type as 'projector' | 'microphone' | 'speaker' | 'screen' | 'other',
          availability: true,
          bookings: [],
        };
        setResources([...resources, newResource]);
        setAlert({ type: 'success', message: 'Resource added successfully!' });
      }
    } else if (dialogType === 'booking') {
      if (selectedVenue) {
        // Add new booking
        const newBooking: Booking = {
          id: `b${selectedVenue.bookings.length + 1}`,
          venueId: selectedVenue.id,
          resourceIds: formData.resources,
          eventName: formData.eventName,
          eventDate: formData.eventDate,
          startTime: formData.startTime,
          endTime: formData.endTime,
          requestedBy: 'user@college.edu', // In a real app, this would be the logged-in user
          status: 'pending',
        };
        
        const updatedVenues = venues.map(venue => 
          venue.id === selectedVenue.id 
            ? { ...venue, bookings: [...venue.bookings, newBooking] } 
            : venue
        );
        
        setVenues(updatedVenues);
        setAlert({ type: 'success', message: 'Booking request submitted successfully!' });
      }
    }
    
    handleCloseDialog();
  };

  const handleDeleteVenue = (venueId: string) => {
    setVenues(venues.filter(venue => venue.id !== venueId));
    setAlert({ type: 'success', message: 'Venue deleted successfully!' });
  };

  const handleDeleteResource = (resourceId: string) => {
    setResources(resources.filter(resource => resource.id !== resourceId));
    setAlert({ type: 'success', message: 'Resource deleted successfully!' });
  };

  const handleBookingStatusChange = (venueId: string, bookingId: string, status: 'approved' | 'rejected') => {
    const updatedVenues = venues.map(venue => {
      if (venue.id === venueId) {
        const updatedBookings = venue.bookings.map(booking => 
          booking.id === bookingId ? { ...booking, status } : booking
        );
        return { ...venue, bookings: updatedBookings };
      }
      return venue;
    });
    
    setVenues(updatedVenues);
    setAlert({ 
      type: 'success', 
      message: `Booking ${status === 'approved' ? 'approved' : 'rejected'} successfully!` 
    });
  };

  const getVenueTypeLabel = (type: string) => {
    switch (type) {
      case 'hall': return 'Seminar Hall';
      case 'classroom': return 'Classroom';
      case 'auditorium': return 'Auditorium';
      case 'outdoor': return 'Outdoor Venue';
      default: return type;
    }
  };

  const getResourceTypeLabel = (type: string) => {
    switch (type) {
      case 'projector': return 'Projector';
      case 'microphone': return 'Microphone';
      case 'speaker': return 'Speaker';
      case 'screen': return 'Screen';
      case 'other': return 'Other';
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'success';
      case 'rejected': return 'error';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Venues & Resources Management
        </Typography>
        
        {alert && (
          <Alert 
            severity={alert.type} 
            sx={{ mb: 2 }}
            onClose={() => setAlert(null)}
          >
            {alert.message}
          </Alert>
        )}
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Venues" icon={<RoomIcon />} iconPosition="start" />
            <Tab label="Resources" icon={<BuildIcon />} iconPosition="start" />
            <Tab label="Bookings" icon={<EventIcon />} iconPosition="start" />
          </Tabs>
        </Box>
        
        {/* Venues Tab */}
        <Box role="tabpanel" hidden={tabValue !== 0}>
          {tabValue === 0 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenDialog('venue')}
                  sx={{ 
                    backgroundColor: THEME_COLORS.orange,
                    '&:hover': {
                      backgroundColor: '#e66000',
                    },
                  }}
                >
                  Add Venue
                </Button>
              </Box>
              
              <Grid container spacing={3}>
                {venues.map((venue) => (
                  <Grid item xs={12} sm={6} md={4} key={venue.id}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="h6" component="div">
                            {venue.name}
                          </Typography>
                          <Chip 
                            label={getVenueTypeLabel(venue.type)} 
                            size="small" 
                            color="primary" 
                            variant="outlined" 
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Capacity: {venue.capacity} people
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Resources: {venue.resources.length > 0 
                            ? venue.resources.map(id => 
                                resources.find(r => r.id === id)?.name
                              ).join(', ') 
                            : 'None'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Bookings: {venue.bookings.length}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button 
                          size="small" 
                          onClick={() => handleOpenDialog('booking', venue)}
                        >
                          Book
                        </Button>
                        <Button 
                          size="small" 
                          onClick={() => handleOpenDialog('venue', venue)}
                        >
                          Edit
                        </Button>
                        <Button 
                          size="small" 
                          color="error" 
                          onClick={() => handleDeleteVenue(venue.id)}
                        >
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
        
        {/* Resources Tab */}
        <Box role="tabpanel" hidden={tabValue !== 1}>
          {tabValue === 1 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenDialog('resource')}
                  sx={{ 
                    backgroundColor: THEME_COLORS.orange,
                    '&:hover': {
                      backgroundColor: '#e66000',
                    },
                  }}
                >
                  Add Resource
                </Button>
              </Box>
              
              <Grid container spacing={3}>
                {resources.map((resource) => (
                  <Grid item xs={12} sm={6} md={4} key={resource.id}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="h6" component="div">
                            {resource.name}
                          </Typography>
                          <Chip 
                            label={getResourceTypeLabel(resource.type)} 
                            size="small" 
                            color="primary" 
                            variant="outlined" 
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          Status: {resource.availability ? 'Available' : 'In Use'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Bookings: {resource.bookings.length}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button 
                          size="small" 
                          onClick={() => handleOpenDialog('resource', resource)}
                        >
                          Edit
                        </Button>
                        <Button 
                          size="small" 
                          color="error" 
                          onClick={() => handleDeleteResource(resource.id)}
                        >
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
        
        {/* Bookings Tab */}
        <Box role="tabpanel" hidden={tabValue !== 2}>
          {tabValue === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                All Bookings
              </Typography>
              
              <Grid container spacing={3}>
                {venues.map((venue) => (
                  venue.bookings.map((booking) => (
                    <Grid item xs={12} sm={6} md={4} key={booking.id}>
                      <Card>
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="h6" component="div">
                              {booking.eventName}
                            </Typography>
                            <Chip 
                              label={booking.status} 
                              size="small" 
                              color={getStatusColor(booking.status) as any} 
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Venue: {venue.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Date: {booking.eventDate}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Time: {booking.startTime} - {booking.endTime}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Resources: {booking.resourceIds.length > 0 
                              ? booking.resourceIds.map(id => 
                                  resources.find(r => r.id === id)?.name
                                ).join(', ') 
                              : 'None'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Requested by: {booking.requestedBy}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          {booking.status === 'pending' && (
                            <>
                              <Button 
                                size="small" 
                                color="success" 
                                startIcon={<CheckCircleIcon />}
                                onClick={() => handleBookingStatusChange(venue.id, booking.id, 'approved')}
                              >
                                Approve
                              </Button>
                              <Button 
                                size="small" 
                                color="error" 
                                startIcon={<CancelIcon />}
                                onClick={() => handleBookingStatusChange(venue.id, booking.id, 'rejected')}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                        </CardActions>
                      </Card>
                    </Grid>
                  ))
                ))}
              </Grid>
            </Box>
          )}
        </Box>
        
        {/* Add/Edit Venue Dialog */}
        <Dialog open={openDialog && dialogType === 'venue'} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>{selectedVenue ? 'Edit Venue' : 'Add New Venue'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Venue Name"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="capacity"
              label="Capacity"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.capacity}
              onChange={handleInputChange}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel id="venue-type-label">Venue Type</InputLabel>
              <Select
                labelId="venue-type-label"
                name="type"
                value={formData.type}
                label="Venue Type"
                onChange={handleInputChange}
              >
                <MenuItem value="hall">Seminar Hall</MenuItem>
                <MenuItem value="classroom">Classroom</MenuItem>
                <MenuItem value="auditorium">Auditorium</MenuItem>
                <MenuItem value="outdoor">Outdoor Venue</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
              Available Resources
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {resources.map((resource) => (
                <Chip
                  key={resource.id}
                  label={resource.name}
                  onClick={() => handleResourceToggle(resource.id)}
                  color={formData.resources.includes(resource.id) ? 'primary' : 'default'}
                  variant={formData.resources.includes(resource.id) ? 'filled' : 'outlined'}
                />
              ))}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              {selectedVenue ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
        
        {/* Add/Edit Resource Dialog */}
        <Dialog open={openDialog && dialogType === 'resource'} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>{selectedResource ? 'Edit Resource' : 'Add New Resource'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Resource Name"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={handleInputChange}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel id="resource-type-label">Resource Type</InputLabel>
              <Select
                labelId="resource-type-label"
                name="type"
                value={formData.type}
                label="Resource Type"
                onChange={handleInputChange}
              >
                <MenuItem value="projector">Projector</MenuItem>
                <MenuItem value="microphone">Microphone</MenuItem>
                <MenuItem value="speaker">Speaker</MenuItem>
                <MenuItem value="screen">Screen</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              {selectedResource ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
        
        {/* Booking Dialog */}
        <Dialog open={openDialog && dialogType === 'booking'} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>Book Venue</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="eventName"
              label="Event Name"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.eventName}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="eventDate"
              label="Event Date"
              type="date"
              fullWidth
              variant="outlined"
              value={formData.eventDate}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                margin="dense"
                name="startTime"
                label="Start Time"
                type="time"
                fullWidth
                variant="outlined"
                value={formData.startTime}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                margin="dense"
                name="endTime"
                label="End Time"
                type="time"
                fullWidth
                variant="outlined"
                value={formData.endTime}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
              Select Resources
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {resources.map((resource) => (
                <Chip
                  key={resource.id}
                  label={resource.name}
                  onClick={() => handleResourceToggle(resource.id)}
                  color={formData.resources.includes(resource.id) ? 'primary' : 'default'}
                  variant={formData.resources.includes(resource.id) ? 'filled' : 'outlined'}
                />
              ))}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Submit Booking
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Layout>
  );
};

export default VenuesPage; 