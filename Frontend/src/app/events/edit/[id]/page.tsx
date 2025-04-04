'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  SelectChangeEvent,
  Alert,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Layout from '@/components/layout/Layout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useRouter } from 'next/navigation';

// Event categories (same as create page)
const categories = [
  'Technical',
  'Cultural',
  'Sports',
  'Academic',
  'Workshop',
  'Seminar',
  'Competition',
  'Other'
];

interface EventFormData {
  title: string;
  description: string;
  category: string;
  startDate: dayjs.Dayjs | null;
  endDate: dayjs.Dayjs | null;
  venue: string;
  maxParticipants: string;
  requirements: string[];
  budget: string;
  sponsorshipNeeded: boolean;
}

const EditEventPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    category: '',
    startDate: null,
    endDate: null,
    venue: '',
    maxParticipants: '',
    requirements: [],
    budget: '',
    sponsorshipNeeded: false,
  });

  const [newRequirement, setNewRequirement] = useState('');

  useEffect(() => {
    // Here you would typically fetch the event data from your API
    // For now, we'll use mock data
    const mockEvent = {
      title: 'Technical Workshop 2024',
      description: 'A hands-on workshop on web development',
      category: 'Technical',
      startDate: dayjs('2024-03-15T10:00:00'),
      endDate: dayjs('2024-03-15T16:00:00'),
      venue: 'Computer Lab 1',
      maxParticipants: '50',
      requirements: ['Laptop', 'Software Installation'],
      budget: '5000',
      sponsorshipNeeded: false,
    };

    setFormData(mockEvent);
    setLoading(false);
  }, [params.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setFormData(prev => ({
      ...prev,
      category: event.target.value
    }));
  };

  const handleAddRequirement = () => {
    if (newRequirement.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()]
      }));
      setNewRequirement('');
    }
  };

  const handleRemoveRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Here you would typically make an API call to update the event
      console.log('Event data to be updated:', formData);
      
      // Show success message and redirect
      alert('Event updated successfully!');
      router.push('/events/my-events');
    } catch (err) {
      setError('Failed to update event. Please try again.');
    }
  };

  if (loading) {
    return (
      <Layout>
        <Container>
          <Typography>Loading...</Typography>
        </Container>
      </Layout>
    );
  }

  return (
    <ProtectedRoute allowedRoles={['SOCIETY_HEAD']}>
      <Layout>
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Edit Event
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Event Title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    multiline
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={formData.category}
                      label="Category"
                      onChange={handleCategoryChange}
                      required
                    >
                      {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Grid item xs={12} sm={6}>
                    <DateTimePicker
                      label="Start Date & Time"
                      value={formData.startDate}
                      onChange={(newValue) => setFormData(prev => ({ ...prev, startDate: newValue }))}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          required: true
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <DateTimePicker
                      label="End Date & Time"
                      value={formData.endDate}
                      onChange={(newValue) => setFormData(prev => ({ ...prev, endDate: newValue }))}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          required: true
                        }
                      }}
                    />
                  </Grid>
                </LocalizationProvider>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Venue"
                    name="venue"
                    value={formData.venue}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Maximum Participants"
                    name="maxParticipants"
                    type="number"
                    value={formData.maxParticipants}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Budget (₹)"
                    name="budget"
                    type="number"
                    value={formData.budget}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Requirements
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <TextField
                        fullWidth
                        size="small"
                        value={newRequirement}
                        onChange={(e) => setNewRequirement(e.target.value)}
                        placeholder="Add requirement"
                      />
                      <Button variant="contained" onClick={handleAddRequirement}>
                        Add
                      </Button>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {formData.requirements.map((req, index) => (
                        <Chip
                          key={index}
                          label={req}
                          onDelete={() => handleRemoveRequirement(index)}
                        />
                      ))}
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      type="button"
                      variant="outlined"
                      size="large"
                      onClick={() => router.push('/events/my-events')}
                      sx={{ flex: 1 }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      sx={{ flex: 1 }}
                    >
                      Update Event
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </Layout>
    </ProtectedRoute>
  );
};

export default EditEventPage; 