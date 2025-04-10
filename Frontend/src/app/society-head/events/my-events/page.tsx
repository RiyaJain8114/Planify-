'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const dummySocieties = [
  { _id: 'soc1', name: 'Coding Club' },
  { _id: 'soc2', name: 'Dance Society' },
  { _id: 'soc3', name: 'Drama Club' },
];

const MyEventsPage = () => {
  const router = useRouter();
  const [societyId, setSocietyId] = useState<string | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  useEffect(() => {
    const savedId = localStorage.getItem('societyId');
    if (savedId) {
      setSocietyId(savedId);
    }
  }, []);

  useEffect(() => {
    if (societyId) {
      fetchEvents(societyId);
    }
  }, [societyId]);

  const fetchEvents = async (id: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/event/mine/${id}`);
      setEvents(response.data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
      alert('Failed to fetch events from the server.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocietyChange = (event: any) => {
    const id = event.target.value;
    setSocietyId(id);
    localStorage.setItem('societyId', id);
  };

  const handleCreateEvent = () => {
    router.push('/society-head/events/create');
  };

  const handleEditEvent = (eventId: string) => {
    router.push(`/society-head/events/edit/${eventId}`);
  };

  const handleDeleteClick = (eventId: string) => {
    setSelectedEventId(eventId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedEventId) return;
    try {
      await axios.delete(`http://localhost:5000/api/event/${selectedEventId}`);
      alert('Event deleted successfully.');
      fetchEvents(societyId!);
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete the event.');
    } finally {
      setDeleteDialogOpen(false);
      setSelectedEventId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ mb: 4 }}>
        <FormControl fullWidth>
          <InputLabel>Select Society</InputLabel>
          <Select
            value={societyId || ''}
            label="Select Society"
            onChange={handleSocietyChange}
          >
            {dummySocieties.map((society) => (
              <MenuItem key={society._id} value={society._id}>
                {society.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, alignItems: 'center' }}>
        <Typography variant="h4">
          My Events {societyId && `- ${dummySocieties.find(s => s._id === societyId)?.name}`}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateEvent}
          disabled={!societyId}
        >
          Create New Event
        </Button>
      </Box>

      {societyId && (
        <>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
              <CircularProgress />
            </Box>
          ) : events.length === 0 ? (
            <Typography>No events found.</Typography>
          ) : (
            <Grid container spacing={3}>
              {events.map((event) => (
                <Grid item xs={12} md={6} lg={4} key={event._id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6">{event.title}</Typography>
                        <Chip
                          label={event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                          color={getStatusColor(event.status) as any}
                          size="small"
                        />
                      </Box>
                      <Typography variant="body2" paragraph>{event.description}</Typography>
                      <Typography variant="body2"><strong>Category:</strong> {event.category}</Typography>
                      <Typography variant="body2"><strong>Venue:</strong> {event.venue}</Typography>
                      <Typography variant="body2"><strong>Date:</strong> {formatDate(event.startDate)}</Typography>
                      <Typography variant="body2"><strong>Participants:</strong> {event.maxParticipants}</Typography>
                      <Typography variant="body2"><strong>Budget:</strong> ₹{event.budget}</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1, gap: 0.5 }}>
                        {event.requirements?.map((req: string, index: number) => (
                          <Chip key={index} label={req} size="small" variant="outlined" />
                        ))}
                      </Box>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                      <IconButton onClick={() => handleEditEvent(event._id)} disabled={event.status === 'approved'}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteClick(event._id)} color="error" disabled={event.status === 'approved'}>
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Event</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this event? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyEventsPage;



// 'use client';

// import React, { useState } from 'react';
// import {
//   Container,
//   Typography,
//   Paper,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   Button,
//   Chip,
//   Box,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   IconButton,
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
// import { useRouter } from 'next/navigation';

// // Mock data for events (replace with actual data later)
// const mockEvents = [
//   {
//     id: '1',
//     title: 'Technical Workshop 2024',
//     description: 'A hands-on workshop on web development',
//     category: 'Technical',
//     startDate: '2024-03-15T10:00:00',
//     endDate: '2024-03-15T16:00:00',
//     venue: 'Computer Lab 1',
//     maxParticipants: '50',
//     status: 'pending',
//     requirements: ['Laptop', 'Software Installation'],
//     budget: '5000',
//   },
//   {
//     id: '2',
//     title: 'Cultural Night',
//     description: 'Annual cultural celebration',
//     category: 'Cultural',
//     startDate: '2024-03-20T18:00:00',
//     endDate: '2024-03-20T22:00:00',
//     venue: 'College Auditorium',
//     maxParticipants: '200',
//     status: 'approved',
//     requirements: ['Performance Costume', 'Music System'],
//     budget: '15000',
//   },
//   {
//     id: '3',
//     title: 'Coding Competition',
//     description: 'Inter-college coding competition',
//     category: 'Technical',
//     startDate: '2024-04-05T09:00:00',
//     endDate: '2024-04-05T17:00:00',
//     venue: 'Computer Center',
//     maxParticipants: '100',
//     status: 'rejected',
//     requirements: ['Laptop', 'Internet Connection'],
//     budget: '10000',
//   },
// ];

// const MyEventsPage = () => {
//   const router = useRouter();
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

//   const handleCreateEvent = () => {
//     router.push('/society-head/events/create');
//   };

//   const handleEditEvent = (eventId: string) => {
//     router.push(`/society-head/events/edit/${eventId}`);
//   };

//   const handleDeleteClick = (eventId: string) => {
//     setSelectedEvent(eventId);
//     setDeleteDialogOpen(true);
//   };

//   const handleDeleteConfirm = () => {
//     // Here you would typically make an API call to delete the event
//     console.log('Deleting event:', selectedEvent);
//     setDeleteDialogOpen(false);
//     setSelectedEvent(null);
//     // Add success message or refresh the events list
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'approved':
//         return 'success';
//       case 'pending':
//         return 'warning';
//       case 'rejected':
//         return 'error';
//       default:
//         return 'default';
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleString('en-US', {
//       dateStyle: 'medium',
//       timeStyle: 'short',
//     });
//   };

//   return (
//     <Container maxWidth="lg" sx={{ py: 8 }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
//         <Typography variant="h4" component="h1">
//           My Events
//         </Typography>
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           onClick={handleCreateEvent}
//         >
//           Create New Event
//         </Button>
//       </Box>

//       <Grid container spacing={3}>
//         {mockEvents.map((event) => (
//           <Grid item xs={12} md={6} lg={4} key={event.id}>
//             <Card>
//               <CardContent>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
//                   <Typography variant="h6" component="h2" gutterBottom>
//                     {event.title}
//                   </Typography>
//                   <Chip
//                     label={event.status.charAt(0).toUpperCase() + event.status.slice(1)}
//                     color={getStatusColor(event.status) as any}
//                     size="small"
//                   />
//                 </Box>

//                 <Typography variant="body2" color="text.secondary" paragraph>
//                   {event.description}
//                 </Typography>

//                 <Box sx={{ mb: 1 }}>
//                   <Typography variant="body2" color="text.secondary">
//                     <strong>Category:</strong> {event.category}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     <strong>Venue:</strong> {event.venue}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     <strong>Date:</strong> {formatDate(event.startDate)}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     <strong>Participants:</strong> {event.maxParticipants}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     <strong>Budget:</strong> ₹{event.budget}
//                   </Typography>
//                 </Box>

//                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                   {event.requirements.map((req, index) => (
//                     <Chip
//                       key={index}
//                       label={req}
//                       size="small"
//                       variant="outlined"
//                     />
//                   ))}
//                 </Box>
//               </CardContent>

//               <CardActions sx={{ justifyContent: 'flex-end' }}>
//                 <IconButton
//                   onClick={() => handleEditEvent(event.id)}
//                   disabled={event.status === 'approved'}
//                 >
//                   <EditIcon />
//                 </IconButton>
//                 <IconButton
//                   onClick={() => handleDeleteClick(event.id)}
//                   disabled={event.status === 'approved'}
//                   color="error"
//                 >
//                   <DeleteIcon />
//                 </IconButton>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Delete Confirmation Dialog */}
//       <Dialog
//         open={deleteDialogOpen}
//         onClose={() => setDeleteDialogOpen(false)}
//       >
//         <DialogTitle>Delete Event</DialogTitle>
//         <DialogContent>
//           <Typography>
//             Are you sure you want to delete this event? This action cannot be undone.
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
//           <Button onClick={handleDeleteConfirm} color="error" variant="contained">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default MyEventsPage; 