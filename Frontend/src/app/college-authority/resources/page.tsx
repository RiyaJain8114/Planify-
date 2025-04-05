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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Tabs,
  Tab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  InputAdornment,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BarChartIcon from '@mui/icons-material/BarChart';
import DownloadIcon from '@mui/icons-material/Download';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TodayIcon from '@mui/icons-material/Today';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { alpha, useTheme } from '@mui/material/styles';

interface ResourceBooking {
  id: string;
  event: string;
  date: string;
  society: string;
  status: 'confirmed' | 'pending' | 'rejected';
}

interface Resource {
  id: string;
  name: string;
  type: 'venue' | 'equipment';
  capacity: string;
  location: string;
  status: 'available' | 'in-use' | 'maintenance';
  usage: number;
  bookings: ResourceBooking[];
}

interface UsageStatistics {
  totalResources: number;
  venues: number;
  equipment: number;
  averageUsage: number;
  topUsedResources: Array<{ name: string; usage: number }>;
  monthlyBookings: Array<{ month: string; bookings: number }>;
}

interface CalendarDay {
  date: Dayjs;
  isToday: boolean;
  isCurrentMonth: boolean;
}

const initialResources: Resource[] = [
  {
    id: '1',
    name: 'Main Auditorium',
    type: 'venue',
    capacity: '500',
    location: 'Main Building, Ground Floor',
    status: 'available',
    usage: 75,
    bookings: [
      { id: '1', event: 'Cultural Night', date: '2024-03-20', society: 'Cultural Society', status: 'confirmed' },
      { id: '2', event: 'Annual Conference', date: '2024-04-15', society: 'Technical Society', status: 'pending' },
    ],
  },
  {
    id: '2',
    name: 'Projector System',
    type: 'equipment',
    capacity: 'N/A',
    location: 'Equipment Room 101',
    status: 'in-use',
    usage: 90,
    bookings: [
      { id: '3', event: 'Technical Workshop', date: '2024-03-15', society: 'Technical Society', status: 'confirmed' },
    ],
  },
  {
    id: '3',
    name: 'Computer Lab 101',
    type: 'venue',
    capacity: '50',
    location: 'Computer Science Building',
    status: 'maintenance',
    usage: 60,
    bookings: [],
  },
];

const initialUsageStats: UsageStatistics = {
  totalResources: 15,
  venues: 8,
  equipment: 7,
  averageUsage: 75,
  topUsedResources: [
    { name: 'Main Auditorium', usage: 90 },
    { name: 'Projector System', usage: 85 },
    { name: 'Computer Lab 101', usage: 80 },
  ],
  monthlyBookings: [
    { month: 'Jan', bookings: 12 },
    { month: 'Feb', bookings: 15 },
    { month: 'Mar', bookings: 18 },
    { month: 'Apr', bookings: 10 },
  ],
};

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function ResourcesPage() {
  const theme = useTheme();
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resourceTypeFilter, setResourceTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [activeTab, setActiveTab] = useState(0);
  const [resources, setResources] = useState<Resource[]>(initialResources);

  const handleEditResource = (resource: Resource) => {
    setSelectedResource(resource);
    setEditDialogOpen(true);
  };

  const handleDeleteResource = (resource: Resource) => {
    setSelectedResource(resource);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmation = () => {
    console.log('Deleting resource:', selectedResource?.id);
    setDeleteDialogOpen(false);
  };

  const handleResourceUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updating resource:', selectedResource?.id);
    setEditDialogOpen(false);
  };

  const handleApproveBooking = (resourceId: string, bookingId: string) => {
    const updatedResources = resources.map(resource =>
      resource.id === resourceId
        ? {
            ...resource,
            bookings: resource.bookings.map(booking =>
              booking.id === bookingId
                ? { ...booking, status: 'confirmed' }
                : booking
            )
          }
        : resource
    );
    setResources(updatedResources);
    // Update the selected resource if it's currently being viewed
    if (selectedResource?.id === resourceId) {
      setSelectedResource({
        ...selectedResource,
        bookings: selectedResource.bookings.map(booking =>
          booking.id === bookingId
            ? { ...booking, status: 'confirmed' }
            : booking
        )
      });
    }
  };

  const handleRejectBooking = (resourceId: string, bookingId: string) => {
    const updatedResources = resources.map(resource =>
      resource.id === resourceId
        ? {
            ...resource,
            bookings: resource.bookings.map(booking =>
              booking.id === bookingId
                ? { ...booking, status: 'rejected' }
                : booking
            )
          }
        : resource
    );
    setResources(updatedResources);
    // Update the selected resource if it's currently being viewed
    if (selectedResource?.id === resourceId) {
      setSelectedResource({
        ...selectedResource,
        bookings: selectedResource.bookings.map(booking =>
          booking.id === bookingId
            ? { ...booking, status: 'rejected' }
            : booking
        )
      });
    }
  };

  const renderBookingStatusChip = (status: ResourceBooking['status']) => {
    const statusConfig = {
      confirmed: { icon: <CheckCircleIcon />, label: 'Confirmed', color: 'success' as const },
      pending: { icon: <WarningIcon />, label: 'Pending', color: 'warning' as const },
      rejected: { icon: <WarningIcon />, label: 'Rejected', color: 'error' as const },
    };

    const config = statusConfig[status];
    return config ? <Chip icon={config.icon} label={config.label} color={config.color} size="small" /> : null;
  };

  const renderResourceBookings = (resource: Resource) => (
    <>
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
        Current Bookings
      </Typography>
      <List>
        {resource.bookings.map((booking) => (
          <ListItem
            key={booking.id}
            secondaryAction={
              booking.status === 'pending' && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    onClick={() => handleApproveBooking(resource.id, booking.id)}
                    disabled={booking.status !== 'pending'}
                  >
                    Approve
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => handleRejectBooking(resource.id, booking.id)}
                    disabled={booking.status !== 'pending'}
                  >
                    Reject
                  </Button>
                </Box>
              )
            }
          >
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography>{booking.event}</Typography>
                  {renderBookingStatusChip(booking.status)}
                </Box>
              }
              secondary={`${booking.society} • ${booking.date}`}
            />
          </ListItem>
        ))}
      </List>
    </>
  );

  const renderStatusChip = (status: Resource['status']) => {
    const statusConfig = {
      available: { icon: <CheckCircleIcon />, label: 'Available', color: 'success' as const },
      'in-use': { icon: <WarningIcon />, label: 'In Use', color: 'warning' as const },
      maintenance: { icon: <WarningIcon />, label: 'Maintenance', color: 'error' as const },
    };

    const config = statusConfig[status];
    return config ? <Chip icon={config.icon} label={config.label} color={config.color} size="small" /> : null;
  };

  const getFilteredResources = () => {
    return initialResources.filter(resource => {
      if (resourceTypeFilter !== 'all' && resource.type !== resourceTypeFilter) return false;
      if (statusFilter !== 'all' && resource.status !== statusFilter) return false;
      if (searchQuery && !resource.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  };

  const handleExportData = () => {
    console.log('Exporting resource data...');
  };

  const generateCalendarDays = (): CalendarDay[] => {
    const days: CalendarDay[] = [];
    const today = dayjs();
    const firstDayOfMonth = selectedDate.startOf('month');
    const firstCalendarDay = firstDayOfMonth.subtract(firstDayOfMonth.day(), 'day');
    
    for (let i = 0; i < 42; i++) {
      const currentDay = firstCalendarDay.add(i, 'day');
      days.push({
        date: currentDay,
        isToday: currentDay.format('YYYY-MM-DD') === today.format('YYYY-MM-DD'),
        isCurrentMonth: currentDay.month() === selectedDate.month()
      });
    }

    return days;
  };

  const getResourceTypeColor = (type: Resource['type']) => {
    return type === 'venue' ? theme.palette.primary.main : theme.palette.secondary.main;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          p: 3,
          borderRadius: 2,
          background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
          backdropFilter: 'blur(8px)',
        }}
      >
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            Resource Management
          </Typography>
          <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary, mt: 1 }}>
            Manage and monitor college resources efficiently
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleExportData}
            sx={{
              borderRadius: 2,
              borderColor: theme.palette.grey[300],
              '&:hover': {
                borderColor: theme.palette.grey[400],
                backgroundColor: alpha(theme.palette.grey[500], 0.08),
              },
            }}
          >
            Export
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              borderRadius: 2,
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.35)}`,
              '&:hover': {
                background: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
              },
            }}
          >
            Add New Resource
          </Button>
        </Box>
      </Box>

      <Paper 
        sx={{ 
          mb: 4, 
          p: 2,
          borderRadius: 2,
          boxShadow: `0 2px 12px ${alpha(theme.palette.common.black, 0.08)}`,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.common.black, 0.02),
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Resource Type</InputLabel>
              <Select
                value={resourceTypeFilter}
                label="Resource Type"
                onChange={(e) => setResourceTypeFilter(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="venue">Venues</MenuItem>
                <MenuItem value="equipment">Equipment</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="in-use">In Use</MenuItem>
                <MenuItem value="maintenance">Maintenance</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        sx={{
          mb: 3,
          '& .MuiTab-root': {
            minHeight: 48,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 500,
            '&.Mui-selected': {
              color: theme.palette.primary.main,
            },
          },
          '& .MuiTabs-indicator': {
            height: 3,
            borderRadius: 1.5,
          },
        }}
      >
        <Tab 
          icon={<EventIcon />} 
          label="Resources" 
          iconPosition="start"
          sx={{ 
            minWidth: 140,
            '& .MuiSvgIcon-root': {
              fontSize: 20,
              mr: 1,
            },
          }}
        />
        <Tab 
          icon={<CalendarMonthIcon />} 
          label="Calendar" 
          iconPosition="start"
          sx={{ 
            minWidth: 140,
            '& .MuiSvgIcon-root': {
              fontSize: 20,
              mr: 1,
            },
          }}
        />
        <Tab 
          icon={<BarChartIcon />} 
          label="Statistics" 
          iconPosition="start"
          sx={{ 
            minWidth: 140,
            '& .MuiSvgIcon-root': {
              fontSize: 20,
              mr: 1,
            },
          }}
        />
      </Tabs>

      {activeTab === 0 && (
        <Grid container spacing={3}>
          {getFilteredResources().map((resource) => (
            <Grid item xs={12} key={resource.id}>
              <Card 
                sx={{ 
                  borderRadius: 2,
                  boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.08)}`,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 6px 16px ${alpha(theme.palette.common.black, 0.12)}`,
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography 
                        variant="h6" 
                        gutterBottom
                        sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          color: getResourceTypeColor(resource.type),
                        }}
                      >
                        {resource.type === 'venue' ? (
                          <LocationOnIcon sx={{ fontSize: 20 }} />
                        ) : (
                          <EventIcon sx={{ fontSize: 20 }} />
                        )}
                        {resource.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {resource.type === 'venue' ? `Capacity: ${resource.capacity} people` : 'Equipment'}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        {renderStatusChip(resource.status)}
                        <Chip
                          icon={<LocationOnIcon />}
                          label={resource.location}
                          size="small"
                          sx={{ 
                            backgroundColor: alpha(theme.palette.grey[500], 0.08),
                            '& .MuiChip-icon': {
                              color: theme.palette.text.secondary,
                            },
                          }}
                        />
                      </Box>
                      <Box sx={{ width: '100%', mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Usage: {resource.usage}%
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={resource.usage}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: alpha(theme.palette.primary.main, 0.08),
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 3,
                              background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                            },
                          }}
                        />
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton 
                        onClick={() => handleEditResource(resource)}
                        sx={{ 
                          color: theme.palette.primary.main,
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.08),
                          },
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        onClick={() => handleDeleteResource(resource)} 
                        sx={{ 
                          color: theme.palette.error.main,
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.error.main, 0.08),
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {renderResourceBookings(resource)}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {activeTab === 1 && (
        <Paper sx={{ p: 3 }}>
          {/* Header */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>Resource Calendar</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                color="primary"
                sx={{ borderRadius: 2 }}
              >
                Book Resource
              </Button>
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
            </Box>
          </Box>

          {/* Calendar Grid */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {WEEK_DAYS.map((day) => (
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
                            {initialResources.flatMap(resource =>
                              resource.bookings
                                .filter(booking => booking.date === day.date.format('YYYY-MM-DD'))
                                .map(booking => (
                                  <Box
                                    key={booking.id}
                                    sx={{
                                      backgroundColor: booking.status === 'confirmed' ? '#E8F5E9' : '#FFF3E0',
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
                                      10:00 AM
                                    </Typography>
                                    <Typography 
                                      variant="caption" 
                                      sx={{ 
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                      }}
                                    >
                                      {`${resource.name} - ${booking.event}`}
                                    </Typography>
                                  </Box>
                                ))
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
      )}

      {activeTab === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Resource Overview
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Total Resources
                    </Typography>
                    <Typography variant="h4">
                      {initialUsageStats.totalResources}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Average Usage
                    </Typography>
                    <Typography variant="h4">
                      {initialUsageStats.averageUsage}%
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Venues
                    </Typography>
                    <Typography variant="h4">
                      {initialUsageStats.venues}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Equipment
                    </Typography>
                    <Typography variant="h4">
                      {initialUsageStats.equipment}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Top Used Resources
                </Typography>
                <List>
                  {initialUsageStats.topUsedResources.map((resource, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={resource.name}
                        secondary={
                          <Box sx={{ width: '100%', mt: 1 }}>
                            <LinearProgress variant="determinate" value={resource.usage} />
                          </Box>
                        }
                      />
                      <Typography variant="body2" color="text.secondary">
                        {resource.usage}%
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Monthly Bookings
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Month</TableCell>
                        <TableCell>Number of Bookings</TableCell>
                        <TableCell>Trend</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {initialUsageStats.monthlyBookings.map((month, index) => (
                        <TableRow key={index}>
                          <TableCell>{month.month}</TableCell>
                          <TableCell>{month.bookings}</TableCell>
                          <TableCell>
                            <LinearProgress
                              variant="determinate"
                              value={(month.bookings / 20) * 100}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Edit Resource Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <form onSubmit={handleResourceUpdate}>
          <DialogTitle>Edit Resource</DialogTitle>
          <DialogContent>
            {selectedResource && (
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Resource Name"
                    defaultValue={selectedResource.name}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select
                      defaultValue={selectedResource.type}
                      label="Type"
                      required
                    >
                      <MenuItem value="venue">Venue</MenuItem>
                      <MenuItem value="equipment">Equipment</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      defaultValue={selectedResource.status}
                      label="Status"
                      required
                    >
                      <MenuItem value="available">Available</MenuItem>
                      <MenuItem value="in-use">In Use</MenuItem>
                      <MenuItem value="maintenance">Maintenance</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Location"
                    defaultValue={selectedResource.location}
                    required
                  />
                </Grid>
                {selectedResource.type === 'venue' && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Capacity"
                      type="number"
                      defaultValue={selectedResource.capacity}
                      required
                    />
                  </Grid>
                )}
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
        <DialogTitle>Delete Resource</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {selectedResource?.name}? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirmation} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
} 