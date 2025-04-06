'use client';

import React, { useState } from 'react';
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
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Event categories
const categories = [
  'Technical',
  'Cultural',
  'Sports',
  'Academic',
  'Workshop',
  'Seminar',
  'Competition',
  'Other',
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
}

const CreateEventPage = () => {
  const router = useRouter();
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
  });

  const [newRequirement, setNewRequirement] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setFormData((prev) => ({
      ...prev,
      category: event.target.value,
    }));
  };

  const handleAddRequirement = () => {
    if (newRequirement.trim()) {
      setFormData((prev) => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()],
      }));
      setNewRequirement('');
    }
  };

  const handleRemoveRequirement = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const eventData = {
        ...formData,
        startDate: formData.startDate?.toISOString(),
        endDate: formData.endDate?.toISOString(),
        maxParticipants: parseInt(formData.maxParticipants),
        budget: parseFloat(formData.budget),
        createdBy: '66051c6c51b7c5f3dcf3ba95', // Replace with actual user ID dynamically
      };

      const response = await axios.post('http://localhost:5000/api/event', eventData);

      if (response.status === 201) {
        alert('Event created successfully!');
        router.push('/society-head/events/my-events');
      }
    } catch (error: any) {
      console.error('Error creating event:', error.response?.data || error.message);
      alert('Failed to create event. Please try again.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create New Event
        </Typography>

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
                  onChange={(newValue) => setFormData((prev) => ({ ...prev, startDate: newValue }))}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <DateTimePicker
                  label="End Date & Time"
                  value={formData.endDate}
                  onChange={(newValue) => setFormData((prev) => ({ ...prev, endDate: newValue }))}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                    },
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
                <Typography variant="subtitle1" gutterBottom>
                  Requirements
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Add requirement"
                    value={newRequirement}
                    onChange={(e) => setNewRequirement(e.target.value)}
                  />
                  <Button variant="outlined" onClick={handleAddRequirement}>
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
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="outlined" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained">
                  Create Event
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateEventPage;


