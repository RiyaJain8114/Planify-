'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Divider,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  CardActions,
  Stack,
  AlertTitle,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import FlagIcon from '@mui/icons-material/Flag';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { format, parseISO } from 'date-fns';
import Layout from '../../../components/layout/Layout';
import { sampleEvents } from '../page';
import VolunteerCertificate from '@/components/certificates/VolunteerCertificate';
import PersonIcon from '@mui/icons-material/Person';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import FeedbackIcon from '@mui/icons-material/Feedback';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BusinessIcon from '@mui/icons-material/Business';
import CancelIcon from '@mui/icons-material/Cancel';

// Mock user data
const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: '/images/avatars/user1.jpg',
  registeredEvents: ['1', '3'],
  volunteeredEvents: ['2'],
  points: 250,
};

const EventDetailsPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState(mockUser);
  const [event, setEvent] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRegisteredParticipant, setIsRegisteredParticipant] = useState(false);
  const [isRegisteredVolunteer, setIsRegisteredVolunteer] = useState(false);
  const [certificateDialogOpen, setCertificateDialogOpen] = useState(false);
  const [certificateType, setCertificateType] = useState<'volunteer' | 'participant'>('participant');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sponsorDialogOpen, setSponsorDialogOpen] = useState(false);
  const [newSponsor, setNewSponsor] = useState({
    name: '',
    contact: '',
    contribution: ''
  });
  
  // Define status based on dates
  const isUpcoming = event && new Date(event.startDate) > new Date();
  const isOngoing = event && new Date(event.startDate) <= new Date() && new Date(event.endDate) >= new Date();
  const isCompleted = event && new Date(event.endDate) < new Date();
  
  // Check if the user has already registered for this event
  const isRegisteredForEvent = React.useMemo(() => {
    if (!user || !user.registeredEvents) return false;
    return user.registeredEvents.includes(params.id as string);
  }, [user, params.id]);
  
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        // For now, we'll simulate it with a delay
        setTimeout(() => {
          const eventId = params.id as string;
          const foundEvent = sampleEvents.find(e => e.id === eventId);
          
          if (foundEvent) {
            // Customize image for Indian context
            const customizedEvent = {
              ...foundEvent,
              imageUrl: getIndianEventImage(foundEvent.category),
            };
            setEvent(customizedEvent);
          } else {
            setError('Event not found');
          }
          
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load event details');
        setLoading(false);
      }
    };
    
    fetchEventDetails();
  }, [params.id]);
  
  // Helper function to get Indian context images
  const getIndianEventImage = (category: string) => {
    // Map categories to Indian context images
    const imageMap: Record<string, string> = {
      'Technical': '/images/events/tech-india.jpg',
      'Cultural': '/images/events/cultural-india.jpg',
      'Sports': '/images/events/sports-india.jpg',
      'Academic': '/images/events/academic-india.jpg',
      'Workshop': '/images/events/workshop-india.jpg',
      'Business': '/images/events/business-india.jpg',
    };
    
    return imageMap[category] || '/images/events/default-india.jpg';
  };
  
  const handleRegisterClick = () => {
    // In a real app, this would make an API call
    setIsRegisteredParticipant(true);
    // Update user's registered events
    setUser(prev => ({
      ...prev,
      registeredEvents: [...prev.registeredEvents, params.id],
    }));
  };
  
  const handleOpenCertificate = (type: 'volunteer' | 'participant') => {
    setCertificateType(type);
    setCertificateDialogOpen(true);
  };
  
  const handleCloseCertificate = () => {
    setCertificateDialogOpen(false);
  };

  const handleDelete = () => {
    // Here you would typically make an API call to delete the event
    console.log('Deleting event:', event.id);
    setDeleteDialogOpen(false);
    router.push('/profile');
  };

  const handleAddSponsor = () => {
    // Here you would typically make an API call to add the sponsor
    console.log('Adding sponsor:', newSponsor);
    setSponsorDialogOpen(false);
    setNewSponsor({ name: '', contact: '', contribution: '' });
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
  
  if (loading) {
    return (
      <Layout>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress />
          </Box>
        </Container>
      </Layout>
    );
  }
  
  if (error || !event) {
    return (
      <Layout>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error || 'Event not found'}
          </Alert>
          <Button 
            variant="contained" 
            color="primary" 
            sx={{ mt: 2 }}
            onClick={() => router.push('/events')}
          >
              Back to Events
            </Button>
        </Container>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
          {/* Event Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" fontWeight="bold">
              {event.title}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => router.push(`/events/${event.id}/edit`)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => setDeleteDialogOpen(true)}
              >
                Delete
              </Button>
        </Box>
      </Box>
      
        <Grid container spacing={4}>
            {/* Event Image */}
            <Grid item xs={12}>
              <Box 
                sx={{ 
                  height: 300, 
                  width: '100%', 
                  borderRadius: 2, 
                  overflow: 'hidden', 
                  position: 'relative',
                  backgroundImage: `url(${event.imageUrl || event.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </Grid>
            
            {/* Event Details */}
          <Grid item xs={12} md={8}>
              <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Event Details
              </Typography>
              <Typography variant="body1" paragraph>
                {event.description}
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CalendarTodayIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                      primary="Date" 
                      secondary={`${new Date(event.startDate).toLocaleDateString()} - ${new Date(event.endDate).toLocaleDateString()}`} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LocationOnIcon color="primary" />
                  </ListItemIcon>
                    <ListItemText primary="Venue" secondary={event.venue} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <GroupIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                      primary="Organizer" 
                      secondary={`${event.organizer.society} (Coordinator: ${event.organizer.coordinator})`} 
                  />
                </ListItem>
                </List>
              </Paper>

              {/* Requirements */}
              <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Requirements
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <AttachMoneyIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Budget" 
                      secondary={`₹${event.requirements.budget}`} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <GroupIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Participants" 
                      secondary={event.requirements.participants} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <EventIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Equipment" 
                      secondary={event.requirements.equipment.join(', ')} 
                    />
                  </ListItem>
                <ListItem>
                  <ListItemIcon>
                      <BusinessIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                      primary="Permissions" 
                      secondary={event.requirements.permissions.join(', ')} 
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          
            {/* Approvals and Sponsors */}
          <Grid item xs={12} md={4}>
              {/* Status */}
              <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                  Status
                </Typography>
                <Chip 
                  label={event.status.toUpperCase()} 
                  color={getStatusColor(event.status) as any}
                  sx={{ mb: 2 }}
                />
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Faculty Approval" 
                      secondary={
                        <Box>
                          <Typography variant="body2">
                            Status: {event.approvals.faculty.status}
              </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {event.approvals.faculty.comment}
                  </Typography>
                          <Typography variant="caption">
                            {new Date(event.approvals.faculty.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Admin Approval" 
                      secondary={
                        <Box>
                          <Typography variant="body2">
                            Status: {event.approvals.admin.status}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {event.approvals.admin.comment}
                          </Typography>
                          <Typography variant="caption">
                            {new Date(event.approvals.admin.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                      }
                    />
                  </ListItem>
                </List>
              </Paper>

              {/* Sponsors */}
              <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" fontWeight="bold">
                    Sponsors
                </Typography>
                <Button 
                  variant="outlined" 
                    size="small"
                    onClick={() => setSponsorDialogOpen(true)}
                  >
                    Add Sponsor
                </Button>
                </Box>
                <List>
                  {event.sponsors.map((sponsor, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <BusinessIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={sponsor.name}
                        secondary={
                          <Box>
                            <Typography variant="body2">
                              Contact: {sponsor.contact}
                            </Typography>
                            <Typography variant="body2">
                              Contribution: {sponsor.contribution}
                </Typography>
                            <Chip 
                              label={sponsor.status}
                              size="small"
                              color={getStatusColor(sponsor.status) as any}
                            />
              </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
            </Paper>
          </Grid>
        </Grid>
        </Paper>
        
        {/* Event Schedule */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Event Schedule
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <AccessTimeIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Registration & Check-in" 
                secondary={format(parseISO(event.startDate), 'h:mm a')}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AccessTimeIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Opening Ceremony" 
                secondary={`${format(parseISO(event.startDate), 'h:mm a')} - ${format(new Date(new Date(event.startDate).getTime() + 60 * 60 * 1000), 'h:mm a')}`}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AccessTimeIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Main Event" 
                secondary={`${format(new Date(new Date(event.startDate).getTime() + 60 * 60 * 1000), 'h:mm a')} - ${format(new Date(new Date(event.endDate).getTime() - 60 * 60 * 1000), 'h:mm a')}`}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AccessTimeIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Closing Ceremony" 
                secondary={`${format(new Date(new Date(event.endDate).getTime() - 60 * 60 * 1000), 'h:mm a')} - ${format(parseISO(event.endDate), 'h:mm a')}`}
              />
            </ListItem>
          </List>
        </Paper>
        
        {/* Event Rules */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Event Rules
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Participants must arrive 15 minutes before the event start time." />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Valid ID proof is mandatory for entry." />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Participants must follow all safety protocols." />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="The organizers reserve the right to disqualify any participant for misconduct." />
            </ListItem>
          </List>
        </Paper>
      </Container>
      
      {/* Certificate Dialog */}
        <VolunteerCertificate
          open={certificateDialogOpen}
          onClose={handleCloseCertificate}
        event={event}
        user={user}
        type={certificateType}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Event</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this event? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Add Sponsor Dialog */}
      <Dialog
        open={sponsorDialogOpen}
        onClose={() => setSponsorDialogOpen(false)}
      >
        <DialogTitle>Add New Sponsor</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Sponsor Name"
              value={newSponsor.name}
              onChange={(e) => setNewSponsor(prev => ({ ...prev, name: e.target.value }))}
              fullWidth
            />
            <TextField
              label="Contact Email"
              value={newSponsor.contact}
              onChange={(e) => setNewSponsor(prev => ({ ...prev, contact: e.target.value }))}
              fullWidth
            />
            <TextField
              label="Contribution Amount"
              value={newSponsor.contribution}
              onChange={(e) => setNewSponsor(prev => ({ ...prev, contribution: e.target.value }))}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSponsorDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddSponsor} color="primary">Add Sponsor</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default EventDetailsPage; 