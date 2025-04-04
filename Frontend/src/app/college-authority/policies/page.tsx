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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Chip,
  Paper,
  InputAdornment,
} from '@mui/material';
import PolicyIcon from '@mui/icons-material/Policy';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Layout from '@/components/layout/Layout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Mock data
const mockPolicies = [
  {
    id: '1',
    title: 'Event Organization Guidelines',
    category: 'Events',
    lastUpdated: '2024-03-01',
    content: `1. All events must be registered at least 2 weeks in advance
2. Budget proposals must be submitted with event registration
3. Safety protocols must be followed for all events
4. Post-event report must be submitted within 3 days`,
    status: 'active',
  },
  {
    id: '2',
    title: 'Society Registration Policy',
    category: 'Societies',
    lastUpdated: '2024-02-15',
    content: `1. Minimum 30 members required for society registration
2. Must have a faculty advisor
3. Constitution must be submitted
4. Annual report submission mandatory`,
    status: 'active',
  },
  {
    id: '3',
    title: 'Resource Booking Rules',
    category: 'Resources',
    lastUpdated: '2024-03-10',
    content: `1. Venues must be booked at least 1 week in advance
2. Equipment handling guidelines must be followed
3. Damage compensation policy applies
4. Cancellation must be notified 48 hours prior`,
    status: 'active',
  },
];

export default function PoliciesPage() {
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newPolicy, setNewPolicy] = useState({
    title: '',
    category: '',
    content: '',
  });

  const handleEditClick = (policy: any) => {
    setSelectedPolicy(policy);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (policy: any) => {
    setSelectedPolicy(policy);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log('Deleting policy:', selectedPolicy.id);
    setDeleteDialogOpen(false);
  };

  const handleAddPolicy = () => {
    console.log('Adding new policy:', newPolicy);
    setAddDialogOpen(false);
    setNewPolicy({ title: '', category: '', content: '' });
  };

  const handleUpdatePolicy = () => {
    console.log('Updating policy:', selectedPolicy.id);
    setEditDialogOpen(false);
  };

  const filteredPolicies = mockPolicies.filter(policy =>
    policy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    policy.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ProtectedRoute allowedRoles={['COLLEGE_AUTHORITY']}>
      <Layout>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1">
              Policies & Guidelines
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setAddDialogOpen(true)}
            >
              Add New Policy
            </Button>
          </Box>

          <Paper sx={{ mb: 4, p: 2 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search policies..."
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
          </Paper>

          <Grid container spacing={3}>
            {filteredPolicies.map((policy) => (
              <Grid item xs={12} key={policy.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {policy.title}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                          <Chip
                            icon={<PolicyIcon />}
                            label={policy.category}
                            size="small"
                          />
                          <Chip
                            icon={<CalendarMonthIcon />}
                            label={`Updated: ${policy.lastUpdated}`}
                            size="small"
                          />
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton onClick={() => handleEditClick(policy)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteClick(policy)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>

                    <Typography
                      variant="body2"
                      component="pre"
                      sx={{
                        whiteSpace: 'pre-wrap',
                        fontFamily: 'inherit',
                        my: 2,
                      }}
                    >
                      {policy.content}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Add Policy Dialog */}
          <Dialog
            open={addDialogOpen}
            onClose={() => setAddDialogOpen(false)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>Add New Policy</DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Policy Title"
                    value={newPolicy.title}
                    onChange={(e) => setNewPolicy({ ...newPolicy, title: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Category"
                    value={newPolicy.category}
                    onChange={(e) => setNewPolicy({ ...newPolicy, category: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    label="Policy Content"
                    value={newPolicy.content}
                    onChange={(e) => setNewPolicy({ ...newPolicy, content: e.target.value })}
                    required
                    placeholder="Enter policy content..."
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddPolicy} variant="contained">
                Add Policy
              </Button>
            </DialogActions>
          </Dialog>

          {/* Edit Policy Dialog */}
          <Dialog
            open={editDialogOpen}
            onClose={() => setEditDialogOpen(false)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>Edit Policy</DialogTitle>
            <DialogContent>
              {selectedPolicy && (
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Policy Title"
                      defaultValue={selectedPolicy.title}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Category"
                      defaultValue={selectedPolicy.category}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={6}
                      label="Policy Content"
                      defaultValue={selectedPolicy.content}
                      required
                    />
                  </Grid>
                </Grid>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleUpdatePolicy} variant="contained">
                Save Changes
              </Button>
            </DialogActions>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
          >
            <DialogTitle>Delete Policy</DialogTitle>
            <DialogContent>
              Are you sure you want to delete {selectedPolicy?.title}? This action cannot be undone.
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
} 