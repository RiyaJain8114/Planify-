import React, { useState, useEffect } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  Typography,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Event as EventIcon,
  People as PeopleIcon,
  Message as MessageIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Room as RoomIcon,
  Build as BuildIcon,
  AttachMoney as AttachMoneyIcon,
  CheckCircle as CheckCircleIcon,
  CalendarToday as CalendarIcon,
  Group as GroupIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface User {
  uid: string;
  email: string;
  displayName: string;
  role: 'student' | 'faculty' | 'admin' | 'resource_manager';
  photoURL: string;
}

interface DashboardSidebarProps {
  open: boolean;
  onClose: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ open, onClose }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    router.push('/login');
  };

  const getMenuItems = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
          { text: 'Events', icon: <EventIcon />, path: '/admin/events' },
          { text: 'Venues', icon: <RoomIcon />, path: '/admin/venues' },
          { text: 'Resources', icon: <BuildIcon />, path: '/admin/resources' },
          { text: 'Budget', icon: <AttachMoneyIcon />, path: '/admin/budget' },
          { text: 'Approvals', icon: <CheckCircleIcon />, path: '/admin/approvals' },
          { text: 'Calendar', icon: <CalendarIcon />, path: '/admin/calendar' },
          { text: 'Users', icon: <GroupIcon />, path: '/admin/users' },
          { text: 'Reports', icon: <AssessmentIcon />, path: '/admin/reports' },
        ];
      case 'faculty':
        return [
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/faculty' },
          { text: 'My Events', icon: <EventIcon />, path: '/faculty/events' },
          { text: 'Create Event', icon: <EventIcon />, path: '/events/create' },
          { text: 'Venues', icon: <RoomIcon />, path: '/faculty/venues' },
          { text: 'Resources', icon: <BuildIcon />, path: '/faculty/resources' },
          { text: 'Budget', icon: <AttachMoneyIcon />, path: '/faculty/budget' },
          { text: 'Approvals', icon: <CheckCircleIcon />, path: '/faculty/approvals' },
          { text: 'Calendar', icon: <CalendarIcon />, path: '/faculty/calendar' },
        ];
      case 'resource_manager':
        return [
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/resource-manager' },
          { text: 'Venues', icon: <RoomIcon />, path: '/resource-manager/venues' },
          { text: 'Resources', icon: <BuildIcon />, path: '/resource-manager/resources' },
          { text: 'Calendar', icon: <CalendarIcon />, path: '/resource-manager/calendar' },
          { text: 'Approvals', icon: <CheckCircleIcon />, path: '/resource-manager/approvals' },
        ];
      case 'student':
        return [
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/student' },
          { text: 'Events', icon: <EventIcon />, path: '/student/events' },
          { text: 'Create Event', icon: <EventIcon />, path: '/events/create' },
          { text: 'Venues', icon: <RoomIcon />, path: '/student/venues' },
          { text: 'Resources', icon: <BuildIcon />, path: '/student/resources' },
          { text: 'Budget', icon: <AttachMoneyIcon />, path: '/student/budget' },
          { text: 'Calendar', icon: <CalendarIcon />, path: '/student/calendar' },
        ];
      default:
        return [];
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 220,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 220,
          boxSizing: 'border-box',
          bgcolor: '#f5f5f5',
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
          pt: '64px', // Height of the AppBar
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" noWrap>
          {user?.role?.charAt(0).toUpperCase()}{user?.role?.slice(1)} Dashboard
        </Typography>
      </Box>
      <List>
        {getMenuItems().map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              onClick={() => router.push(item.path)}
              sx={{
                minHeight: 44,
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  fontSize: '0.9rem',
                  fontWeight: 500
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton 
            onClick={handleLogout}
            sx={{
              minHeight: 44,
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Logout" 
              primaryTypographyProps={{ 
                fontSize: '0.9rem',
                fontWeight: 500
              }} 
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default DashboardSidebar; 