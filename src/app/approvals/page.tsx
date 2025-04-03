'use client';

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';
import Layout from '@/components/layout/Layout';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`approval-tabpanel-${index}`}
      aria-labelledby={`approval-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// Mock data for pending approvals
const pendingEvents = [
  {
    id: 1,
    name: 'TechFest 2024',
    organizer: 'Computer Science Department',
    date: '2024-03-15',
    type: 'Technical',
    status: 'Pending'
  },
  {
    id: 2,
    name: 'Cultural Night',
    organizer: 'Arts & Culture Club',
    date: '2024-04-20',
    type: 'Cultural',
    status: 'Pending'
  },
  {
    id: 3,
    name: 'Hackathon 2024',
    organizer: 'Coding Club',
    date: '2024-05-10',
    type: 'Technical',
    status: 'Pending'
  }
];

const pendingSponsorships = [
  {
    id: 1,
    event: 'TechFest 2024',
    sponsor: 'TechCorp Inc.',
    amount: 50000,
    type: 'Platinum',
    status: 'Pending'
  },
  {
    id: 2,
    event: 'Cultural Night',
    sponsor: 'Arts Foundation',
    amount: 25000,
    type: 'Gold',
    status: 'Pending'
  },
  {
    id: 3,
    event: 'Hackathon 2024',
    sponsor: 'CodeTech Solutions',
    amount: 75000,
    type: 'Diamond',
    status: 'Pending'
  }
];

export default function ApprovalsPage() {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleApprove = (id: number) => {
    // Handle approval logic
    console.log('Approved:', id);
  };

  const handleReject = (id: number) => {
    // Handle rejection logic
    console.log('Rejected:', id);
  };

  const handleView = (id: number) => {
    // Handle view details logic
    console.log('View details:', id);
  };

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box mb={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Approvals
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Manage event and sponsorship approvals
          </Typography>
        </Box>

        <Paper sx={{ width: '100%', mb: 4 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Event Approvals" />
            <Tab label="Sponsorship Approvals" />
          </Tabs>

          <Box sx={{ p: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Filter">
                      <IconButton>
                        <FilterIcon />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <TabPanel value={tabValue} index={0}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Event Name</TableCell>
                    <TableCell>Organizer</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pendingEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>{event.name}</TableCell>
                      <TableCell>{event.organizer}</TableCell>
                      <TableCell>{event.date}</TableCell>
                      <TableCell>{event.type}</TableCell>
                      <TableCell>
                        <Chip 
                          label={event.status}
                          color="warning"
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="View Details">
                          <IconButton onClick={() => handleView(event.id)}>
                            <ViewIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Approve">
                          <IconButton 
                            color="success"
                            onClick={() => handleApprove(event.id)}
                          >
                            <ApproveIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Reject">
                          <IconButton 
                            color="error"
                            onClick={() => handleReject(event.id)}
                          >
                            <RejectIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Event</TableCell>
                    <TableCell>Sponsor</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pendingSponsorships.map((sponsorship) => (
                    <TableRow key={sponsorship.id}>
                      <TableCell>{sponsorship.event}</TableCell>
                      <TableCell>{sponsorship.sponsor}</TableCell>
                      <TableCell>₹{sponsorship.amount.toLocaleString()}</TableCell>
                      <TableCell>{sponsorship.type}</TableCell>
                      <TableCell>
                        <Chip 
                          label={sponsorship.status}
                          color="warning"
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="View Details">
                          <IconButton onClick={() => handleView(sponsorship.id)}>
                            <ViewIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Approve">
                          <IconButton 
                            color="success"
                            onClick={() => handleApprove(sponsorship.id)}
                          >
                            <ApproveIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Reject">
                          <IconButton 
                            color="error"
                            onClick={() => handleReject(sponsorship.id)}
                          >
                            <RejectIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </Paper>
      </Container>
    </Layout>
  );
} 