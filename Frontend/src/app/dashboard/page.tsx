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
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  IconButton,
  Paper,
  Stack,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import GroupsIcon from '@mui/icons-material/Groups';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import TodayIcon from '@mui/icons-material/Today';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Badge } from '@mui/material';
import dayjs from 'dayjs';

// Mock data
const mockData = {
  upcomingEvents: [
    {
      id: '1',
      title: 'Technical Workshop 2024',
      date: '2024-03-15',
      time: '10:00 AM - 2:00 PM',
      location: 'Computer Lab 101',
      society: 'Technical Society',
      status: 'approved',
      description: 'A comprehensive workshop on modern web development technologies.',
    },
    {
      id: '2',
      title: 'Cultural Night',
      date: '2024-03-20',
      time: '6:00 PM - 9:00 PM',
      location: 'Main Auditorium',
      society: 'Cultural Society',
      status: 'pending',
      description: 'Annual cultural night showcasing various performances.',
    },
    {
      id: '3',
      title: 'Coding Competition',
      date: '2024-03-25',
      time: '9:00 AM - 5:00 PM',
      location: 'Computer Lab 102',
      society: 'Technical Society',
      status: 'approved',
      description: 'Inter-college coding competition with exciting prizes.',
    },
  ],
  notifications: [
    {
      id: '1',
      message: 'Your event "Technical Workshop" has been approved',
      type: 'success',
      time: '2 hours ago',
    },
    {
      id: '2',
      message: 'New resource booking request received',
      type: 'info',
      time: '5 hours ago',
    },
  ],
};

// Mock data for recurring events
const mockRecurringEvents = [
  {
    id: 1,
    title: 'Monday standup',
    time: '9:00 AM',
    type: 'recurring',
  },
  {
    id: 2,
    title: 'Product planning',
    time: '9:30 AM',
    type: 'meeting',
  },
  {
    id: 3,
    title: 'Design sync',
    time: '10:30 AM',
    type: 'meeting',
  },
];

// Updated mock events with more realistic data and categories
const mockEvents = [
  {
    id: 1,
    title: 'Monday standup',
    time: '9:00 AM',
    type: 'recurring',
    color: '#E3F2FD'
  },
  {
    id: 2,
    title: 'One-on-one with Alex',
    time: '10:30 AM',
    type: 'meeting',
    color: '#FCE4EC'
  },
  {
    id: 3,
    title: 'Marketing strategy',
    time: '2:30 PM',
    type: 'meeting',
    color: '#E8F5E9'
  },
  {
    id: 4,
    title: 'Deep work',
    time: '9:00 AM',
    type: 'focus',
    color: '#E3F2FD'
  },
  {
    id: 5,
    title: 'Product planning',
    time: '9:30 AM',
    type: 'meeting',
    color: '#E8F5E9'
  },
  {
    id: 6,
    title: 'Design sync',
    time: '10:30 AM',
    type: 'meeting',
    color: '#E8F5E9'
  },
  {
    id: 7,
    title: 'Team lunch',
    time: '12:15 PM',
    type: 'social',
    color: '#FFF3E0'
  }
];

export default function DashboardPage() {
  const router = useRouter();
  const { role } = useAuth();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('month');

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'approved':
        return <Chip label="Approved" color="success" size="small" />;
      case 'pending':
        return <Chip label="Pending" color="warning" size="small" />;
      default:
        return null;
    }
  };

  const handleAction = () => {
    if (role === 'SOCIETY_HEAD') {
      router.push('/events/create');
    } else if (role === 'COLLEGE_AUTHORITY') {
      router.push('/college-authority/approvals');
    }
  };

  // Function to check if a date has events
  const hasEvents = (date: dayjs.Dayjs) => {
    return mockData.upcomingEvents.some(
      event => dayjs(event.date).format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
    );
  };

  // Get events for selected date
  const getEventsForDate = (date: dayjs.Dayjs) => {
    return mockData.upcomingEvents.filter(
      event => dayjs(event.date).format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
    );
  };

  // Get week days
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Get the first day of the month
  const firstDay = selectedDate.startOf('month');
  const daysInMonth = selectedDate.daysInMonth();
  const startingDay = firstDay.day();

  // Generate calendar days
  const generateCalendarDays = () => {
    const days = [];
    const today = dayjs();

    // Previous month days
    for (let i = 0; i < (startingDay === 0 ? 6 : startingDay - 1); i++) {
      days.push({
        date: firstDay.subtract(startingDay - i, 'day'),
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: firstDay.add(i - 1, 'day'),
        isCurrentMonth: true,
        isToday: firstDay.add(i - 1, 'day').format('YYYY-MM-DD') === today.format('YYYY-MM-DD'),
      });
    }

    // Next month days
    const remainingDays = 42 - days.length; // 6 rows * 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: firstDay.add(daysInMonth - 1 + i, 'day'),
        isCurrentMonth: false,
      });
    }

    return days;
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Paper sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 500 }}>Calendar</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              color="primary"
              sx={{ borderRadius: 2 }}
            >
              Add event
            </Button>
          </Box>

          {/* Tabs and Search */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Tabs 
              value={currentTab} 
              onChange={(_, newValue) => setCurrentTab(newValue)}
              sx={{ 
                mb: -1,
                '& .MuiTab-root': {
                  textTransform: 'none',
                  minWidth: 'auto',
                  px: 2,
                  mr: 1,
                }
              }}
            >
              <Tab label="All events" />
              <Tab label="Shared" />
              <Tab label="Public" />
              <Tab label="Archived" />
            </Tabs>
            <TextField
              size="small"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                width: 200,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
          </Box>
        </Box>

        {/* Calendar Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ textTransform: 'uppercase', mb: 0.5 }}
              >
                {selectedDate.format('MMM')}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                {selectedDate.format('D')}
              </Typography>
            </Box>
            <Box sx={{ ml: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                {selectedDate.format('MMMM YYYY')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedDate.startOf('month').format('MMM D')} - {selectedDate.endOf('month').format('MMM D, YYYY')}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton 
              onClick={() => setSelectedDate(selectedDate.subtract(1, 'month'))}
              sx={{ color: 'text.secondary' }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setSelectedDate(dayjs())}
              startIcon={<TodayIcon />}
              sx={{ 
                textTransform: 'none',
                borderRadius: 2,
                mx: 1
              }}
            >
              Today
            </Button>
            <IconButton 
              onClick={() => setSelectedDate(selectedDate.add(1, 'month'))}
              sx={{ color: 'text.secondary' }}
            >
              <ChevronRightIcon />
            </IconButton>
            <Button
              variant="outlined"
              size="small"
              endIcon={<ChevronRightIcon />}
              sx={{ 
                textTransform: 'none',
                borderRadius: 2,
                ml: 1
              }}
            >
              Month view
            </Button>
          </Box>
        </Box>

        {/* Calendar Grid */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {weekDays.map((day) => (
                  <TableCell 
                    key={day} 
                    align="center"
                    sx={{ 
                      fontWeight: 'medium',
                      color: 'text.secondary',
                      py: 1,
                      borderBottom: '2px solid',
                      borderColor: 'divider',
                      fontSize: '0.875rem'
                    }}
                  >
                    {day}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from({ length: 6 }).map((_, weekIndex) => (
                <TableRow key={weekIndex}>
                  {generateCalendarDays()
                    .slice(weekIndex * 7, (weekIndex + 1) * 7)
                    .map((day, dayIndex) => (
                      <TableCell
                        key={dayIndex}
                        align="left"
                        sx={{
                          height: 120,
                          position: 'relative',
                          verticalAlign: 'top',
                          p: 1,
                          ...(day.isToday && {
                            backgroundColor: 'action.hover',
                          }),
                          ...(!day.isCurrentMonth && {
                            color: 'text.disabled',
                            backgroundColor: 'grey.50',
                          }),
                          borderBottom: '1px solid',
                          borderColor: 'divider',
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: day.isToday ? 600 : 400,
                            color: !day.isCurrentMonth ? 'text.disabled' : 'text.primary',
                            mb: 1
                          }}
                        >
                          {day.date.format('D')}
                        </Typography>
                        <Box sx={{ 
                          display: 'flex', 
                          flexDirection: 'column', 
                          gap: 0.5,
                          maxHeight: 85,
                          overflow: 'hidden'
                        }}>
                          {mockEvents.map((event, index) => (
                            <Box
                              key={event.id}
                              sx={{
                                backgroundColor: event.color,
                                color: 'text.primary',
                                p: '2px 4px',
                                borderRadius: 0.5,
                                fontSize: '0.75rem',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5
                              }}
                            >
                              <Typography 
                                variant="caption" 
                                sx={{ 
                                  color: 'text.secondary',
                                  minWidth: 'fit-content'
                                }}
                              >
                                {event.time}
                              </Typography>
                              <Typography 
                                variant="caption" 
                                sx={{ 
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }}
                              >
                                {event.title}
                              </Typography>
                            </Box>
                          ))}
                          {mockEvents.length > 3 && (
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                color: 'text.secondary',
                                cursor: 'pointer',
                                '&:hover': {
                                  color: 'primary.main'
                                }
                              }}
                            >
                              {mockEvents.length - 3} more...
                            </Typography>
                          )}
                        </Box>
                      </TableCell>
                    ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
} 