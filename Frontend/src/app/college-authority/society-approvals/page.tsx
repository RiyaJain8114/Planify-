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
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
  Checkbox,
  FormControlLabel,
  InputAdornment,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import GroupIcon from '@mui/icons-material/Group';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

// Mock data
const mockPendingSocieties = [
  {
    id: '1',
    name: 'Robotics Society',
    logo: '/robotics-society-logo.png',
    description: 'A society focused on robotics and automation technologies.',
    email: 'robotics.society@college.edu',
    phone: '+91 9876543212',
    location: 'Engineering Building, Room 301',
    establishedYear: '2024',
    memberCount: '30',
    head: 'Alex Johnson',
    facultyAdvisor: 'Dr. Robert Smith',
    status: 'pending',
    documents: [
      { name: 'Constitution', url: '/documents/constitution.pdf', type: 'pdf' },
      { name: 'Member List', url: '/documents/members.pdf', type: 'pdf' },
      { name: 'Proposal', url: '/documents/proposal.docx', type: 'doc' },
    ],
    performance: {
      events: 5,
      members: 30,
      budget: 50000,
      rating: 4.5,
    },
  },
  {
    id: '2',
    name: 'Environmental Society',
    logo: '/environmental-society-logo.png',
    description: 'Promoting environmental awareness and sustainability initiatives.',
    email: 'environmental.society@college.edu',
    phone: '+91 9876543213',
    location: 'Science Building, Room 201',
    establishedYear: '2024',
    memberCount: '45',
    head: 'Sarah Williams',
    facultyAdvisor: 'Dr. Emily Brown',
    status: 'pending',
    documents: [
      { name: 'Constitution', url: '/documents/constitution.pdf', type: 'pdf' },
      { name: 'Member List', url: '/documents/members.pdf', type: 'pdf' },
      { name: 'Proposal', url: '/documents/proposal.docx', type: 'doc' },
    ],
    performance: {
      events: 3,
      members: 45,
      budget: 35000,
      rating: 4.2,
    },
  },
];

const SocietyApprovalsPage = () => {
  const [selectedSociety, setSelectedSociety] = useState<any>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [sendEmail, setSendEmail] = useState(true);
  const [comments, setComments] = useState('');

  const handleReviewClick = (society: any) => {
    setSelectedSociety(society);
    setReviewDialogOpen(true);
  };

  const handleApprove = () => {
    console.log('Approving society:', selectedSociety.id);
    if (sendEmail) {
      console.log('Sending approval email to:', selectedSociety.email);
    }
    setReviewDialogOpen(false);
  };

  const handleReject = () => {
    console.log('Rejecting society:', selectedSociety.id);
    if (sendEmail) {
      console.log('Sending rejection email to:', selectedSociety.email);
    }
    setReviewDialogOpen(false);
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'pending':
        return <Chip icon={<PendingIcon />} label="Pending" color="warning" size="small" />;
      case 'approved':
        return <Chip icon={<CheckCircleIcon />} label="Approved" color="success" size="small" />;
      case 'rejected':
        return <Chip icon={<CancelIcon />} label="Rejected" color="error" size="small" />;
      default:
        return null;
    }
  };

  const handleExport = () => {
    console.log('Exporting society approvals data...');
  };

  const filteredSocieties = mockPendingSocieties.filter(society => {
    if (filterStatus !== 'all' && society.status !== filterStatus) return false;
    if (searchQuery && !society.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Society Approvals
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleExport}
          >
            Export
          </Button>
        </Box>
      </Box>

      <Paper sx={{ mb: 4, p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search societies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
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
          </Grid>
        </Grid>
      </Paper>

      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        sx={{ mb: 3 }}
      >
        <Tab icon={<GroupIcon />} label="Societies" />
        <Tab icon={<DescriptionIcon />} label="Documents" />
      </Tabs>

      {activeTab === 0 && (
        <Grid container spacing={3}>
          {filteredSocieties.map((society) => (
            <Grid item xs={12} key={society.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ display: 'flex', gap: 3 }}>
                      <Avatar
                        src={society.logo}
                        sx={{ width: 100, height: 100 }}
                      />
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {society.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {society.description}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                          {getStatusChip(society.status)}
                          <Chip
                            icon={<GroupIcon />}
                            label={`${society.memberCount} Members`}
                            size="small"
                          />
                          <Chip
                            icon={<CalendarMonthIcon />}
                            label={`Est. ${society.establishedYear}`}
                            size="small"
                          />
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleReviewClick(society)}
                      >
                        Review
                      </Button>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" gutterBottom>
                        Contact Information
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemIcon>
                            <EmailIcon />
                          </ListItemIcon>
                          <ListItemText primary={society.email} />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <PhoneIcon />
                          </ListItemIcon>
                          <ListItemText primary={society.phone} />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <LocationOnIcon />
                          </ListItemIcon>
                          <ListItemText primary={society.location} />
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" gutterBottom>
                        Leadership
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemText
                            primary="Society Head"
                            secondary={society.head}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Faculty Advisor"
                            secondary={society.facultyAdvisor}
                          />
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>

                  <Typography variant="subtitle1" sx={{ mt: 2 }} gutterBottom>
                    Performance Metrics
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="body2" color="text.secondary">
                        Events
                      </Typography>
                      <Typography variant="h6">
                        {society.performance.events}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="body2" color="text.secondary">
                        Members
                      </Typography>
                      <Typography variant="h6">
                        {society.performance.members}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="body2" color="text.secondary">
                        Budget
                      </Typography>
                      <Typography variant="h6">
                        ₹{society.performance.budget.toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="body2" color="text.secondary">
                        Rating
                      </Typography>
                      <Typography variant="h6">
                        {society.performance.rating}/5
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {activeTab === 1 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Society</TableCell>
                <TableCell>Document</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockPendingSocieties.flatMap(society =>
                society.documents.map((doc, index) => (
                  <TableRow key={`${society.id}-${index}`}>
                    <TableCell>{society.name}</TableCell>
                    <TableCell>{doc.name}</TableCell>
                    <TableCell>
                      {doc.type === 'pdf' ? (
                        <PictureAsPdfIcon color="error" />
                      ) : (
                        <InsertDriveFileIcon color="primary" />
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        startIcon={<DescriptionIcon />}
                        onClick={() => window.open(doc.url, '_blank')}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Review Dialog */}
      <Dialog
        open={reviewDialogOpen}
        onClose={() => setReviewDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Review Society Registration</DialogTitle>
        <DialogContent>
          {selectedSociety && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                {selectedSociety.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {selectedSociety.description}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" gutterBottom>
                Society Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">
                    <strong>Society Head:</strong> {selectedSociety.head}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">
                    <strong>Faculty Advisor:</strong> {selectedSociety.facultyAdvisor}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">
                    <strong>Member Count:</strong> {selectedSociety.memberCount}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">
                    <strong>Established Year:</strong> {selectedSociety.establishedYear}
                  </Typography>
                </Grid>
              </Grid>

              <Typography variant="subtitle1" sx={{ mt: 2 }} gutterBottom>
                Contact Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">
                    <strong>Email:</strong> {selectedSociety.email}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">
                    <strong>Phone:</strong> {selectedSociety.phone}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    <strong>Location:</strong> {selectedSociety.location}
                  </Typography>
                </Grid>
              </Grid>

              <Typography variant="subtitle1" sx={{ mt: 2 }} gutterBottom>
                Documents
              </Typography>
              <List dense>
                {selectedSociety.documents.map((doc: any, index: number) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      {doc.type === 'pdf' ? (
                        <PictureAsPdfIcon color="error" />
                      ) : (
                        <InsertDriveFileIcon color="primary" />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={doc.name}
                      secondary={<a href={doc.url} target="_blank" rel="noopener noreferrer">View Document</a>}
                    />
                  </ListItem>
                ))}
              </List>

              <Typography variant="subtitle1" sx={{ mt: 2 }} gutterBottom>
                Performance Metrics
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" color="text.secondary">
                    Events
                  </Typography>
                  <Typography variant="h6">
                    {selectedSociety.performance.events}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" color="text.secondary">
                    Members
                  </Typography>
                  <Typography variant="h6">
                    {selectedSociety.performance.members}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" color="text.secondary">
                    Budget
                  </Typography>
                  <Typography variant="h6">
                    ₹{selectedSociety.performance.budget.toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" color="text.secondary">
                    Rating
                  </Typography>
                  <Typography variant="h6">
                    {selectedSociety.performance.rating}/5
                  </Typography>
                </Grid>
              </Grid>

              <TextField
                fullWidth
                multiline
                rows={4}
                label="Comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                sx={{ mt: 2 }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={sendEmail}
                    onChange={(e) => setSendEmail(e.target.checked)}
                  />
                }
                label="Send email notification"
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

export default SocietyApprovalsPage; 