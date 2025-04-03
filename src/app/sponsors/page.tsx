'use client';

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Avatar,
  Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import Layout from '@/components/layout/Layout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Mock data for sponsors
const mockSponsors = [
  {
    id: '1',
    name: 'Tech Solutions Inc.',
    logo: '/tech-solutions.png',
    type: 'Platinum',
    contactPerson: 'John Doe',
    email: 'john@techsolutions.com',
    phone: '+91 9876543210',
    contribution: '100000',
    events: ['Technical Workshop 2024', 'Coding Competition'],
  },
  {
    id: '2',
    name: 'Creative Arts Foundation',
    logo: '/creative-arts.png',
    type: 'Gold',
    contactPerson: 'Jane Smith',
    email: 'jane@creativearts.org',
    phone: '+91 9876543211',
    contribution: '50000',
    events: ['Cultural Night'],
  },
];

interface SponsorFormData {
  name: string;
  type: string;
  contactPerson: string;
  email: string;
  phone: string;
  contribution: string;
}

const initialFormData: SponsorFormData = {
  name: '',
  type: '',
  contactPerson: '',
  email: '',
  phone: '',
  contribution: '',
};

const SponsorsPage = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addEditDialogOpen, setAddEditDialogOpen] = useState(false);
  const [selectedSponsor, setSelectedSponsor] = useState<string | null>(null);
  const [formData, setFormData] = useState<SponsorFormData>(initialFormData);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddSponsor = () => {
    setIsEditing(false);
    setFormData(initialFormData);
    setAddEditDialogOpen(true);
  };

  const handleEditSponsor = (sponsorId: string) => {
    const sponsor = mockSponsors.find(s => s.id === sponsorId);
    if (sponsor) {
      setFormData({
        name: sponsor.name,
        type: sponsor.type,
        contactPerson: sponsor.contactPerson,
        email: sponsor.email,
        phone: sponsor.phone,
        contribution: sponsor.contribution,
      });
      setIsEditing(true);
      setSelectedSponsor(sponsorId);
      setAddEditDialogOpen(true);
    }
  };

  const handleDeleteClick = (sponsorId: string) => {
    setSelectedSponsor(sponsorId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log('Deleting sponsor:', selectedSponsor);
    setDeleteDialogOpen(false);
    setSelectedSponsor(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
    setAddEditDialogOpen(false);
    setFormData(initialFormData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getSponsorTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'platinum':
        return 'primary';
      case 'gold':
        return 'warning';
      case 'silver':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <ProtectedRoute allowedRoles={['SOCIETY_HEAD']}>
      <Layout>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1">
              Sponsors
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddSponsor}
            >
              Add New Sponsor
            </Button>
          </Box>

          <Grid container spacing={3}>
            {mockSponsors.map((sponsor) => (
              <Grid item xs={12} md={6} key={sponsor.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        src={sponsor.logo}
                        sx={{ width: 60, height: 60, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="h6" component="h2">
                          {sponsor.name}
                        </Typography>
                        <Chip
                          label={sponsor.type}
                          color={getSponsorTypeColor(sponsor.type)}
                          size="small"
                          sx={{ mt: 0.5 }}
                        />
                      </Box>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Contact Person:</strong> {sponsor.contactPerson}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                        <EmailIcon fontSize="small" color="action" />
                        <Typography variant="body2">{sponsor.email}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        <PhoneIcon fontSize="small" color="action" />
                        <Typography variant="body2">{sponsor.phone}</Typography>
                      </Box>
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                      <strong>Contribution:</strong> ₹{sponsor.contribution}
                    </Typography>

                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <strong>Sponsored Events:</strong>
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {sponsor.events.map((event, index) => (
                          <Chip
                            key={index}
                            label={event}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Box>
                  </CardContent>

                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <IconButton onClick={() => handleEditSponsor(sponsor.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteClick(sponsor.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Add/Edit Sponsor Dialog */}
          <Dialog
            open={addEditDialogOpen}
            onClose={() => setAddEditDialogOpen(false)}
            maxWidth="sm"
            fullWidth
          >
            <form onSubmit={handleFormSubmit}>
              <DialogTitle>
                {isEditing ? 'Edit Sponsor' : 'Add New Sponsor'}
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Sponsor Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Sponsor Type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Contact Person"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Contribution Amount (₹)"
                      name="contribution"
                      type="number"
                      value={formData.contribution}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setAddEditDialogOpen(false)}>Cancel</Button>
                <Button type="submit" variant="contained">
                  {isEditing ? 'Update' : 'Add'} Sponsor
                </Button>
              </DialogActions>
            </form>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
          >
            <DialogTitle>Delete Sponsor</DialogTitle>
            <DialogContent>
              Are you sure you want to delete this sponsor? This action cannot be undone.
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Layout>
    </ProtectedRoute>
  );
};

export default SponsorsPage; 