'use client';

import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

// Theme colors for consistent application design
export const THEME_COLORS = {
  white: '#FFFFFF',
  offBlack: '#37474F', // Subtle dark gray
  orange: '#607D8B', // Subtle blue-gray for accents
  offWhiteGrey: '#F5F7F9',
  secondary: '#90A4AE', // Light blue-gray for accents
  accent: '#546E7A' // Medium blue-gray for highlights
};

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showHeader = true }) => {
  const pathname = usePathname();

  return (
    <>
      <CssBaseline />
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          width: '100%',
        }}
      >
        {showHeader && <Header />}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default Layout; 