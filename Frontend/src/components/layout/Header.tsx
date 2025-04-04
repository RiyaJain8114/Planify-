'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  CardActionArea,
  Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import LogoutIcon from '@mui/icons-material/Logout';
import { THEME_COLORS } from './Layout';
import { useAuth } from '@/contexts/AuthContext';

// Define menu items for different roles
const societyHeadMenuItems = [
  { text: 'Dashboard', path: '/society-head/dashboard' },
  { text: 'Create Event', path: '/society-head/events/create' },
  { text: 'My Events', path: '/society-head/events/my-events' },
  { text: 'Society Profile', path: '/society-head/society-profile' },
  { text: 'Resources', path: '/society-head/resources' },
];

const collegeAuthorityMenuItems = [
  { text: 'Dashboard', path: '/college-authority/dashboard' },
  { text: 'Event Approvals', path: '/college-authority/approvals' },
  { text: 'Resource Management', path: '/college-authority/resources' },
  { text: 'Society Approvals', path: '/college-authority/society-approvals' },
  { text: 'Analytics', path: '/college-authority/analytics' },
  { text: 'Policies', path: '/college-authority/policies' },
];

export default function Header() {
  const { role, login, logout } = useAuth();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  // Select menu items based on role
  const menuItems = role === 'SOCIETY_HEAD' 
    ? societyHeadMenuItems 
    : role === 'COLLEGE_AUTHORITY' 
    ? collegeAuthorityMenuItems 
    : [];

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLoginDialogOpen = () => {
    setLoginDialogOpen(true);
  };

  const handleLoginDialogClose = () => {
    setLoginDialogOpen(false);
  };

  const handleLogin = (selectedRole: 'SOCIETY_HEAD' | 'COLLEGE_AUTHORITY') => {
    login(selectedRole);
    handleLoginDialogClose();
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        College Events
      </Typography>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              href={item.path}
              sx={{
                textAlign: 'center',
                color: pathname === item.path ? THEME_COLORS.accent : 'inherit',
              }}
            >
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="sticky" elevation={1} sx={{ 
        backgroundColor: THEME_COLORS.white, 
        color: THEME_COLORS.offBlack 
      }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              component={Link}
              href="/"
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              College Events
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Navigation Menu */}
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.text}
                    component={Link}
                    href={item.path}
                    sx={{
                      color: pathname === item.path ? THEME_COLORS.accent : 'inherit',
                      '&:hover': {
                        color: THEME_COLORS.accent,
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>

              {/* Login/Logout Button */}
              {role ? (
                <Button
                  color="inherit"
                  onClick={logout}
                  startIcon={<LogoutIcon />}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  color="inherit"
                  onClick={handleLoginDialogOpen}
                  startIcon={<PersonIcon />}
                >
                  Login
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Login Dialog */}
      <Dialog 
        open={loginDialogOpen} 
        onClose={handleLoginDialogClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center' }}>
          Select Role to Login
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, py: 2 }}>
            <Card>
              <CardActionArea onClick={() => handleLogin('SOCIETY_HEAD')}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: THEME_COLORS.accent }}>
                    <PersonIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6">Society Head</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Manage your society and events
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card>
              <CardActionArea onClick={() => handleLogin('COLLEGE_AUTHORITY')}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: THEME_COLORS.accent }}>
                    <SchoolIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6">College Authority</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Oversee all societies and events
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLoginDialogClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
} 