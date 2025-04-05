'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Box, 
  Container, 
  Typography, 
  IconButton,
  Stack,
  Divider,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { THEME_COLORS } from './Layout';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        backgroundColor: THEME_COLORS.offBlack,
        color: '#E0E0E0',
        py: 1.5,
      }}
    >
      <Container maxWidth="lg">
        <Stack 
          direction="row"
          spacing={2}
          sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Social media */}
          <Box sx={{ display: 'flex' }}>
            <Link href="https://facebook.com/planify" target="_blank" passHref>
              <IconButton 
                size="small"
                sx={{ 
                  color: '#E0E0E0', 
                  bgcolor: 'rgba(255,255,255,0.1)', 
                  mx: 0.5,
                  fontSize: '1.25rem',
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
            
            <Link href="https://twitter.com/planify" target="_blank" passHref>
              <IconButton 
                size="small"
                sx={{ 
                  color: '#E0E0E0', 
                  bgcolor: 'rgba(255,255,255,0.1)', 
                  mx: 0.5,
                  fontSize: '1.25rem',
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
            
            <Link href="https://instagram.com/planify" target="_blank" passHref>
              <IconButton 
                size="small"
                sx={{ 
                  color: '#E0E0E0', 
                  bgcolor: 'rgba(255,255,255,0.1)', 
                  mx: 0.5,
                  fontSize: '1.25rem',
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
            
            <Link href="https://linkedin.com/company/planify" target="_blank" passHref>
              <IconButton 
                size="small"
                sx={{ 
                  color: '#E0E0E0', 
                  bgcolor: 'rgba(255,255,255,0.1)', 
                  mx: 0.5,
                  fontSize: '1.25rem',
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
            
            <Link href="https://youtube.com/planify" target="_blank" passHref>
              <IconButton 
                size="small"
                sx={{ 
                  color: '#E0E0E0', 
                  bgcolor: 'rgba(255,255,255,0.1)', 
                  mx: 0.5,
                  fontSize: '1.25rem',
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

          <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
          
          {/* Policy Links */}
          <Stack direction="row" spacing={2}>
            <Link href="/privacy" passHref style={{ textDecoration: 'none' }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontSize: '0.875rem', 
                  color: '#E0E0E0',
                  '&:hover': { color: THEME_COLORS.orange },
                  cursor: 'pointer'
                }}
              >
                Privacy Policy
              </Typography>
            </Link>
            <Link href="/terms" passHref style={{ textDecoration: 'none' }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontSize: '0.875rem', 
                  color: '#E0E0E0',
                  '&:hover': { color: THEME_COLORS.orange },
                  cursor: 'pointer'
                }}
              >
                Terms of Service
              </Typography>
            </Link>
          </Stack>

          <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
          
          {/* Copyright */}
          <Typography variant="body2" sx={{ fontSize: '0.875rem', color: '#E0E0E0' }}>
            © 2025 Planify
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer; 