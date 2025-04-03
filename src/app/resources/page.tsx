'use client';

import React from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
  Button,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Description as DescriptionIcon,
  Event as EventIcon,
  School as SchoolIcon,
  Group as GroupIcon,
  Link as LinkIcon,
  Download as DownloadIcon
} from '@mui/icons-material';
import Layout from '@/components/layout/Layout';

const resources = [
  {
    title: 'Event Planning Guide',
    description: 'Comprehensive guide for organizing successful college fests',
    icon: <EventIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    items: [
      'Timeline planning',
      'Budget management',
      'Venue selection',
      'Sponsorship guidelines'
    ],
    downloadUrl: '#'
  },
  {
    title: 'Event Templates',
    description: 'Ready-to-use templates for various event documents',
    icon: <DescriptionIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
    items: [
      'Event proposal template',
      'Budget spreadsheet',
      'Sponsorship proposal',
      'Registration forms'
    ],
    downloadUrl: '#'
  },
  {
    title: 'Student Resources',
    description: 'Resources for student organizers and participants',
    icon: <SchoolIcon sx={{ fontSize: 40, color: 'accent.main' }} />,
    items: [
      'Leadership guidelines',
      'Team management tips',
      'Communication templates',
      'Event checklist'
    ],
    downloadUrl: '#'
  },
  {
    title: 'Community Guidelines',
    description: 'Guidelines for maintaining a positive event environment',
    icon: <GroupIcon sx={{ fontSize: 40, color: 'info.main' }} />,
    items: [
      'Code of conduct',
      'Safety protocols',
      'Emergency procedures',
      'Sustainability guidelines'
    ],
    downloadUrl: '#'
  }
];

const helpfulLinks = [
  {
    title: 'Event Management Software',
    url: '#',
    description: 'Tools for managing registrations and schedules'
  },
  {
    title: 'Venue Directory',
    url: '#',
    description: 'List of approved venues for college events'
  },
  {
    title: 'Sponsor Database',
    url: '#',
    description: 'Database of potential sponsors and partners'
  },
  {
    title: 'Emergency Services',
    url: '#',
    description: 'Important contacts for emergency situations'
  }
];

export default function ResourcesPage() {
  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Header Section */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h2" component="h1" gutterBottom>
            Resources
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
            Everything you need to organize successful college fests
          </Typography>
        </Box>

        {/* Main Resources Grid */}
        <Grid container spacing={4} mb={8}>
          {resources.map((resource, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    {resource.icon}
                    <Typography variant="h5" component="h2" ml={2}>
                      {resource.title}
                    </Typography>
                  </Box>
                  <Typography color="text.secondary" paragraph>
                    {resource.description}
                  </Typography>
                  <List>
                    {resource.items.map((item, itemIndex) => (
                      <ListItem key={itemIndex} disablePadding>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <LinkIcon fontSize="small" color="action" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                <CardActions>
                  <Button 
                    startIcon={<DownloadIcon />}
                    variant="contained"
                    color="primary"
                    href={resource.downloadUrl}
                  >
                    Download Resources
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Helpful Links Section */}
        <Box mb={4}>
          <Typography variant="h4" component="h2" gutterBottom>
            Helpful Links
          </Typography>
          <Divider sx={{ mb: 4 }} />
          <Grid container spacing={3}>
            {helpfulLinks.map((link, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)'
                    }
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {link.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {link.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      color="primary"
                      href={link.url}
                    >
                      Visit Link
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
} 