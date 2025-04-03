'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Box, 
  Container, 
  Typography, 
  Stack,
  IconButton,
  Divider,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { THEME_COLORS } from './Layout';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        backgroundColor: THEME_COLORS.offBlack,
        color: '#E0E0E0',
      }}
    >
      {/* Main navigation */}
      <Container maxWidth={false}>
        <Box 
          sx={{
            display: 'flex',
            justifyContent: 'center',
            py: 3,
          }}
        >
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={{ xs: 2, md: 4 }}
            alignItems="center"
          >
            <Link href="/about" passHref>
              <Typography 
                component="span" 
                sx={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 500,
                  cursor: 'pointer',
                  color: '#E0E0E0',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    color: THEME_COLORS.orange,
                    transform: 'scale(1.1)',
                  },
                }}
              >
                About Us
              </Typography>
            </Link>
            <Link href="/events" passHref>
              <Typography 
                component="span" 
                sx={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 500,
                  cursor: 'pointer',
                  color: '#E0E0E0',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    color: THEME_COLORS.orange,
                    transform: 'scale(1.1)',
                  },
                }}
              >
                Events
              </Typography>
            </Link>
            <Link href="/resources" passHref>
              <Typography 
                component="span" 
                sx={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 500,
                  cursor: 'pointer',
                  color: '#E0E0E0',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    color: THEME_COLORS.orange,
                    transform: 'scale(1.1)',
                  },
                }}
              >
                Resources
              </Typography>
            </Link>
            <Link href="/sponsors" passHref>
              <Typography 
                component="span" 
                sx={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 500,
                  cursor: 'pointer',
                  color: '#E0E0E0',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    color: THEME_COLORS.orange,
                    transform: 'scale(1.1)',
                  },
                }}
              >
                Sponsors
              </Typography>
            </Link>
            <Link href="/contact" passHref>
              <Typography 
                component="span" 
                sx={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 500,
                  cursor: 'pointer',
                  color: '#E0E0E0',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    color: THEME_COLORS.orange,
                    transform: 'scale(1.1)',
                  },
                }}
              >
                Contact
              </Typography>
            </Link>
          </Stack>
        </Box>
        
        {/* Contact information */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'center', alignItems: 'center', gap: { xs: 2, md: 6 }, py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmailIcon sx={{ color: THEME_COLORS.orange, fontSize: '1.5rem' }} />
            <Link href="mailto:info@collegefest.com" passHref>
              <Typography
                component="span"
                sx={{
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  color: '#E0E0E0',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': { 
                    textDecoration: 'underline',
                    color: THEME_COLORS.orange,
                    transform: 'scale(1.05)',
                  },
                }}
              >
                info@collegefest.com
              </Typography>
            </Link>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PhoneIcon sx={{ color: THEME_COLORS.orange, fontSize: '1.5rem' }} />
            <Link href="tel:+918023545555" passHref>
              <Typography
                component="span"
                sx={{
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  color: '#E0E0E0',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': { 
                    textDecoration: 'underline',
                    color: THEME_COLORS.orange,
                    transform: 'scale(1.05)',
                  },
                }}
              >
                +91 80 2354 5555
              </Typography>
            </Link>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOnIcon sx={{ color: THEME_COLORS.orange, fontSize: '1.5rem' }} />
            <Link 
              href="https://maps.google.com/?q=CA: 39, 16th Main Road, 15th Cross Rd, Sector 4, HSR Layout, Bengaluru" 
              target="_blank"
              passHref
            >
              <Typography
                component="span"
                sx={{
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  color: '#E0E0E0',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': { 
                    textDecoration: 'underline',
                    color: THEME_COLORS.orange,
                    transform: 'scale(1.05)',
                  },
                }}
              >
                CA: 39, 16th Main Road, 15th Cross Rd, Sector 4, HSR Layout, Bengaluru
              </Typography>
            </Link>
          </Box>
        </Box>
        
        {/* Social media */}
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <Link href="https://facebook.com/collegefest" target="_blank" passHref>
            <IconButton 
              sx={{ 
                color: '#E0E0E0', 
                bgcolor: 'rgba(255,255,255,0.1)', 
                mx: 1,
                fontSize: '1.5rem',
                transition: 'all 0.2s ease-in-out',
                '&:hover': { 
                  bgcolor: THEME_COLORS.orange,
                  transform: 'scale(1.15)',
                }
              }}
              aria-label="Facebook"
            >
              <FacebookIcon fontSize="inherit" />
            </IconButton>
          </Link>
          
          <Link href="https://twitter.com/collegefest" target="_blank" passHref>
            <IconButton 
              sx={{ 
                color: '#E0E0E0', 
                bgcolor: 'rgba(255,255,255,0.1)', 
                mx: 1,
                fontSize: '1.5rem',
                transition: 'all 0.2s ease-in-out',
                '&:hover': { 
                  bgcolor: THEME_COLORS.orange,
                  transform: 'scale(1.15)',
                }
              }}
              aria-label="Twitter"
            >
              <TwitterIcon fontSize="inherit" />
            </IconButton>
          </Link>
          
          <Link href="https://instagram.com/collegefest" target="_blank" passHref>
            <IconButton 
              sx={{ 
                color: '#E0E0E0', 
                bgcolor: 'rgba(255,255,255,0.1)', 
                mx: 1,
                fontSize: '1.5rem',
                transition: 'all 0.2s ease-in-out',
                '&:hover': { 
                  bgcolor: THEME_COLORS.orange,
                  transform: 'scale(1.15)',
                }
              }}
              aria-label="Instagram"
            >
              <InstagramIcon fontSize="inherit" />
            </IconButton>
          </Link>
          
          <Link href="https://linkedin.com/company/collegefest" target="_blank" passHref>
            <IconButton 
              sx={{ 
                color: '#E0E0E0', 
                bgcolor: 'rgba(255,255,255,0.1)', 
                mx: 1,
                fontSize: '1.5rem',
                transition: 'all 0.2s ease-in-out',
                '&:hover': { 
                  bgcolor: THEME_COLORS.orange,
                  transform: 'scale(1.15)',
                }
              }}
              aria-label="LinkedIn"
            >
              <LinkedInIcon fontSize="inherit" />
            </IconButton>
          </Link>
          
          <Link href="https://youtube.com/collegefest" target="_blank" passHref>
            <IconButton 
              sx={{ 
                color: '#E0E0E0', 
                bgcolor: 'rgba(255,255,255,0.1)', 
                mx: 1,
                fontSize: '1.5rem',
                transition: 'all 0.2s ease-in-out',
                '&:hover': { 
                  bgcolor: THEME_COLORS.orange,
                  transform: 'scale(1.15)',
                }
              }}
              aria-label="YouTube"
            >
              <YouTubeIcon fontSize="inherit" />
            </IconButton>
          </Link>
        </Box>
        
        <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        
        {/* Copyright */}
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Typography variant="body2" sx={{ fontSize: '1rem', color: '#E0E0E0' }}>
            © 2025 College Fest Management System
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 