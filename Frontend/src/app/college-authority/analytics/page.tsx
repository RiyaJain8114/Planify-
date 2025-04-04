'use client';

import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import EventIcon from '@mui/icons-material/Event';
import GroupsIcon from '@mui/icons-material/Groups';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AssessmentIcon from '@mui/icons-material/Assessment';

// Mock data
const analyticsData = {
  overview: {
    totalEvents: 45,
    activeSocieties: 12,
    resourceUtilization: 80,
    totalParticipants: 2500,
  },
  eventStats: {
    monthly: [
      { month: 'Jan', count: 5, participants: 300 },
      { month: 'Feb', count: 8, participants: 450 },
      { month: 'Mar', count: 12, participants: 800 },
      { month: 'Apr', count: 6, participants: 400 },
    ],
    byType: [
      { type: 'Technical', count: 15, percentage: 33 },
      { type: 'Cultural', count: 12, percentage: 27 },
      { type: 'Sports', count: 10, percentage: 22 },
      { type: 'Academic', count: 8, percentage: 18 },
    ],
  },
  societyPerformance: [
    {
      name: 'Technical Society',
      events: 8,
      participants: 600,
      rating: 4.5,
      trend: 'up',
    },
    {
      name: 'Cultural Society',
      events: 6,
      participants: 450,
      rating: 4.2,
      trend: 'up',
    },
    {
      name: 'Sports Club',
      events: 5,
      participants: 300,
      rating: 4.0,
      trend: 'down',
    },
  ],
  resourceUtilization: [
    { name: 'Main Auditorium', usage: 85, bookings: 15 },
    { name: 'Computer Labs', usage: 75, bookings: 12 },
    { name: 'Sports Ground', usage: 70, bookings: 10 },
    { name: 'Conference Room', usage: 60, bookings: 8 },
  ],
};

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Analytics Dashboard
      </Typography>

      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Events
              </Typography>
              <Typography variant="h4">
                {analyticsData.overview.totalEvents}
              </Typography>
              <EventIcon color="primary" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Active Societies
              </Typography>
              <Typography variant="h4">
                {analyticsData.overview.activeSocieties}
              </Typography>
              <GroupsIcon color="primary" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Resource Utilization
              </Typography>
              <Typography variant="h4">
                {analyticsData.overview.resourceUtilization}%
              </Typography>
              <LocationOnIcon color="primary" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Participants
              </Typography>
              <Typography variant="h4">
                {analyticsData.overview.totalParticipants}
              </Typography>
              <AssessmentIcon color="primary" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        sx={{ mb: 3 }}
      >
        <Tab label="Events" />
        <Tab label="Societies" />
        <Tab label="Resources" />
      </Tabs>

      {activeTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Monthly Event Statistics
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Month</TableCell>
                        <TableCell>Events</TableCell>
                        <TableCell>Participants</TableCell>
                        <TableCell>Trend</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {analyticsData.eventStats.monthly.map((month) => (
                        <TableRow key={month.month}>
                          <TableCell>{month.month}</TableCell>
                          <TableCell>{month.count}</TableCell>
                          <TableCell>{month.participants}</TableCell>
                          <TableCell>
                            <LinearProgress
                              variant="determinate"
                              value={(month.count / 15) * 100}
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
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Events by Type
                </Typography>
                <List>
                  {analyticsData.eventStats.byType.map((type) => (
                    <ListItem key={type.type}>
                      <ListItemText
                        primary={type.type}
                        secondary={`${type.count} events (${type.percentage}%)`}
                      />
                      <Box sx={{ width: '50%', ml: 2 }}>
                        <LinearProgress
                          variant="determinate"
                          value={type.percentage}
                        />
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {activeTab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Society Performance
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Society</TableCell>
                        <TableCell>Events</TableCell>
                        <TableCell>Participants</TableCell>
                        <TableCell>Rating</TableCell>
                        <TableCell>Trend</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {analyticsData.societyPerformance.map((society) => (
                        <TableRow key={society.name}>
                          <TableCell>{society.name}</TableCell>
                          <TableCell>{society.events}</TableCell>
                          <TableCell>{society.participants}</TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {society.rating}
                              <LinearProgress
                                variant="determinate"
                                value={society.rating * 20}
                                sx={{ ml: 1, width: 100 }}
                              />
                            </Box>
                          </TableCell>
                          <TableCell>
                            {society.trend === 'up' ? (
                              <TrendingUpIcon color="success" />
                            ) : (
                              <TrendingDownIcon color="error" />
                            )}
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

      {activeTab === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Resource Utilization
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Resource</TableCell>
                        <TableCell>Usage</TableCell>
                        <TableCell>Bookings</TableCell>
                        <TableCell>Utilization</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {analyticsData.resourceUtilization.map((resource) => (
                        <TableRow key={resource.name}>
                          <TableCell>{resource.name}</TableCell>
                          <TableCell>{resource.usage}%</TableCell>
                          <TableCell>{resource.bookings}</TableCell>
                          <TableCell>
                            <Box sx={{ width: '100%' }}>
                              <LinearProgress
                                variant="determinate"
                                value={resource.usage}
                                color={resource.usage > 75 ? 'warning' : 'primary'}
                              />
                            </Box>
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
    </Container>
  );
} 