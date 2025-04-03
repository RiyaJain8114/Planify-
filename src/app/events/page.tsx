'use client';

import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Tabs, 
  Tab, 
  CircularProgress, 
  Alert 
} from '@mui/material';
import Layout from '../../components/layout/Layout';
import EventsList from '../../components/events/EventsList';
import { EventData } from '../../components/events/EventCard';

// Sample data for demo purposes
export const sampleEvents: EventData[] = [
  {
    id: '1',
    title: 'Hackathon 2024',
    description: 'Join our annual hackathon to showcase your coding skills and win exciting prizes.',
    image: '/images/events/hackathon.jpg',
    startDate: '2024-06-15T08:00:00',
    endDate: '2024-06-17T18:00:00',
    location: 'Computer Science Department, Main Campus',
    category: 'Technical',
    status: 'upcoming',
    participantLimit: 200,
    currentParticipants: 150,
    points: 100,
    festName: 'TechFest 2024',
    festOrganizer: 'Computer Science Department'
  },
  {
    id: '2',
    title: 'Dance Competition',
    description: 'Showcase your dance moves in solo, duet, or group performances.',
    image: '/images/events/dance.jpg',
    startDate: '2024-05-20T14:00:00',
    endDate: '2024-05-20T22:00:00',
    location: 'Auditorium, Cultural Center',
    category: 'Cultural',
    status: 'upcoming',
    participantLimit: 50,
    currentParticipants: 35,
    points: 50,
    festName: 'Cultural Fest 2024',
    festOrganizer: 'Cultural Committee'
  },
  {
    id: '3',
    title: 'Paper Presentation',
    description: 'Present your research papers on emerging technologies and innovations.',
    image: '/images/events/paper.jpg',
    startDate: '2024-04-22T09:00:00',
    endDate: '2024-04-22T17:00:00',
    location: 'Seminar Hall, Engineering Block',
    category: 'Academic',
    status: 'upcoming',
    participantLimit: 30,
    currentParticipants: 25,
    points: 75,
    festName: 'Research Fest 2024',
    festOrganizer: 'Research and Development Cell'
  },
  {
    id: '4',
    title: 'Cricket Tournament',
    description: 'Inter-department cricket tournament with exciting prizes.',
    image: '/images/events/cricket.jpg',
    startDate: '2024-03-10T08:00:00',
    endDate: '2024-03-15T18:00:00',
    location: 'University Sports Ground',
    category: 'Sports',
    status: 'completed',
    participantLimit: 16,
    currentParticipants: 16,
    points: 150,
    festName: 'Sports Fest 2024',
    festOrganizer: 'Sports Committee'
  },
  {
    id: '5',
    title: 'AI Workshop',
    description: 'Hands-on workshop on artificial intelligence and machine learning.',
    image: '/images/events/ai-workshop.jpg',
    startDate: '2024-05-05T10:00:00',
    endDate: '2024-05-05T17:00:00',
    location: 'Lab 101, Computer Science Block',
    category: 'Workshop',
    status: 'upcoming',
    participantLimit: 40,
    currentParticipants: 30,
    points: 80,
    festName: 'TechFest 2024',
    festOrganizer: 'Computer Science Department'
  },
  {
    id: '6',
    title: 'Music Festival',
    description: 'Annual music festival featuring performances from various college bands.',
    image: '/images/events/music.jpg',
    startDate: '2024-06-01T16:00:00',
    endDate: '2024-06-02T23:00:00',
    location: 'Open Air Theater, Campus Ground',
    category: 'Cultural',
    status: 'upcoming',
    participantLimit: 500,
    currentParticipants: 300,
    points: 60,
    festName: 'Cultural Fest 2024',
    festOrganizer: 'Cultural Committee'
  },
  {
    id: '7',
    title: 'Robotics Competition',
    description: 'Design and build robots to complete various challenges.',
    image: '/images/events/robotics.jpg',
    startDate: '2024-05-15T09:00:00',
    endDate: '2024-05-15T18:00:00',
    location: 'Robotics Lab, Engineering Block',
    category: 'Technical',
    status: 'upcoming',
    participantLimit: 20,
    currentParticipants: 15,
    points: 120,
    festName: 'TechFest 2024',
    festOrganizer: 'Mechanical Engineering Department'
  },
  {
    id: '8',
    title: 'Fashion Show',
    description: 'Annual fashion show showcasing student designs and creativity.',
    image: '/images/events/fashion.jpg',
    startDate: '2024-05-25T19:00:00',
    endDate: '2024-05-25T22:00:00',
    location: 'Auditorium, Cultural Center',
    category: 'Cultural',
    status: 'upcoming',
    participantLimit: 30,
    currentParticipants: 25,
    points: 70,
    festName: 'Cultural Fest 2024',
    festOrganizer: 'Fashion Design Department'
  },
  {
    id: '9',
    title: 'Basketball Tournament',
    description: 'Inter-college basketball tournament with teams from across the state.',
    image: '/images/events/basketball.jpg',
    startDate: '2024-04-10T08:00:00',
    endDate: '2024-04-15T18:00:00',
    location: 'Indoor Sports Complex',
    category: 'Sports',
    status: 'upcoming',
    participantLimit: 24,
    currentParticipants: 20,
    points: 100,
    festName: 'Sports Fest 2024',
    festOrganizer: 'Sports Committee'
  },
  {
    id: '10',
    title: 'Startup Pitch Competition',
    description: 'Pitch your startup ideas to industry experts and win seed funding.',
    image: '/images/events/startup.jpg',
    startDate: '2024-06-10T10:00:00',
    endDate: '2024-06-10T18:00:00',
    location: 'Innovation Hub, Business School',
    category: 'Business',
    status: 'upcoming',
    participantLimit: 15,
    currentParticipants: 12,
    points: 90,
    festName: 'Business Fest 2024',
    festOrganizer: 'Business School'
  },
  {
    id: '11',
    title: 'Photography Exhibition',
    description: 'Exhibition of student photography work with various themes.',
    image: '/images/events/photography.jpg',
    startDate: '2024-05-15T11:00:00',
    endDate: '2024-05-17T17:00:00',
    location: 'Art Gallery, Fine Arts Block',
    category: 'Cultural',
    status: 'upcoming',
    participantLimit: 50,
    currentParticipants: 40,
    points: 40,
    festName: 'Cultural Fest 2024',
    festOrganizer: 'Fine Arts Department'
  }
];

// Mock API call
const fetchEvents = async (): Promise<EventData[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return sampleEvents;
};

export default function EventsPage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (err) {
        setError('Failed to load events. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadEvents();
  }, []);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  const filterEventsByTab = (tabIndex: number): EventData[] => {
    switch (tabIndex) {
      case 0: // All
        return events;
      case 1: // Upcoming
        return events.filter(event => event.status === 'upcoming');
      case 2: // Ongoing
        return events.filter(event => event.status === 'ongoing');
      case 3: // Completed
        return events.filter(event => event.status === 'completed');
      default:
        return events;
    }
  };
  
  return (
    <Layout>
      <Box sx={{ bgcolor: 'background.paper', pt: 6, pb: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" gutterBottom>
            Events
          </Typography>
          
          <Typography variant="h6" component="p" color="text.secondary" paragraph>
            Explore volunteer opportunities and events organized by Samarthanam Trust
          </Typography>
          
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="event tabs"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="All Events" />
              <Tab label="Upcoming" />
              <Tab label="Ongoing" />
              <Tab label="Completed" />
            </Tabs>
          </Box>
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <EventsList 
              events={filterEventsByTab(tabValue)} 
              showFilters={true}
              title={''} // No title as we already have tabs
            />
          )}
        </Container>
      </Box>
    </Layout>
  );
} 