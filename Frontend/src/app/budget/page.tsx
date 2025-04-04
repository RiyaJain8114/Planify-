'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  LinearProgress,
} from '@mui/material';
import {
  AttachMoney as AttachMoneyIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Business as BusinessIcon,
  Event as EventIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import { THEME_COLORS } from '@/components/layout/Layout';
import Layout from '@/components/layout/Layout';

interface Budget {
  id: string;
  eventId: string;
  eventName: string;
  totalAmount: number;
  allocatedAmount: number;
  spentAmount: number;
  status: 'pending' | 'approved' | 'rejected';
  items: BudgetItem[];
  sponsors: Sponsor[];
  createdAt: string;
  updatedAt: string;
}

interface BudgetItem {
  id: string;
  name: string;
  amount: number;
  category: 'venue' | 'equipment' | 'food' | 'marketing' | 'other';
  status: 'pending' | 'approved' | 'rejected';
}

interface Sponsor {
  id: string;
  name: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'rejected';
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
}

interface Event {
  id: string;
  name: string;
  date: string;
  venue: string;
  organizer: string;
}

// Mock data
const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Annual College Day',
    date: '2023-12-15',
    venue: 'Main Auditorium',
    organizer: 'admin@college.edu',
  },
  {
    id: '2',
    name: 'Tech Symposium',
    date: '2023-11-20',
    venue: 'Seminar Hall A',
    organizer: 'faculty@college.edu',
  },
  {
    id: '3',
    name: 'Cultural Festival',
    date: '2024-01-10',
    venue: 'Sports Ground',
    organizer: 'student@college.edu',
  },
];

const mockBudgets: Budget[] = [
  {
    id: '1',
    eventId: '1',
    eventName: 'Annual College Day',
    totalAmount: 50000,
    allocatedAmount: 50000,
    spentAmount: 25000,
    status: 'approved',
    items: [
      {
        id: 'i1',
        name: 'Venue Decoration',
        amount: 10000,
        category: 'venue',
        status: 'approved',
      },
      {
        id: 'i2',
        name: 'Sound System',
        amount: 15000,
        category: 'equipment',
        status: 'approved',
      },
      {
        id: 'i3',
        name: 'Refreshments',
        amount: 10000,
        category: 'food',
        status: 'approved',
      },
    ],
    sponsors: [
      {
        id: 's1',
        name: 'TechCorp Inc.',
        amount: 30000,
        status: 'confirmed',
        contactPerson: 'John Doe',
        contactEmail: 'john@techcorp.com',
        contactPhone: '123-456-7890',
      },
      {
        id: 's2',
        name: 'EduFund Foundation',
        amount: 20000,
        status: 'confirmed',
        contactPerson: 'Jane Smith',
        contactEmail: 'jane@edufund.org',
        contactPhone: '098-765-4321',
      },
    ],
    createdAt: '2023-10-01',
    updatedAt: '2023-10-15',
  },
  {
    id: '2',
    eventId: '2',
    eventName: 'Tech Symposium',
    totalAmount: 30000,
    allocatedAmount: 30000,
    spentAmount: 5000,
    status: 'approved',
    items: [
      {
        id: 'i4',
        name: 'Venue Setup',
        amount: 5000,
        category: 'venue',
        status: 'approved',
      },
      {
        id: 'i5',
        name: 'Projector Rental',
        amount: 5000,
        category: 'equipment',
        status: 'pending',
      },
    ],
    sponsors: [
      {
        id: 's3',
        name: 'InnovateTech',
        amount: 20000,
        status: 'confirmed',
        contactPerson: 'Mike Johnson',
        contactEmail: 'mike@innovatetech.com',
        contactPhone: '555-123-4567',
      },
      {
        id: 's4',
        name: 'FutureTech Solutions',
        amount: 10000,
        status: 'pending',
        contactPerson: 'Sarah Williams',
        contactEmail: 'sarah@futuretech.com',
        contactPhone: '555-987-6543',
      },
    ],
    createdAt: '2023-11-01',
    updatedAt: '2023-11-05',
  },
  {
    id: '3',
    eventId: '3',
    eventName: 'Cultural Festival',
    totalAmount: 40000,
    allocatedAmount: 20000,
    spentAmount: 0,
    status: 'pending',
    items: [
      {
        id: 'i6',
        name: 'Stage Setup',
        amount: 10000,
        category: 'venue',
        status: 'pending',
      },
      {
        id: 'i7',
        name: 'Sound Equipment',
        amount: 15000,
        category: 'equipment',
        status: 'pending',
      },
    ],
    sponsors: [
      {
        id: 's5',
        name: 'Arts Council',
        amount: 20000,
        status: 'pending',
        contactPerson: 'David Brown',
        contactEmail: 'david@artscouncil.org',
        contactPhone: '777-888-9999',
      },
    ],
    createdAt: '2023-12-01',
    updatedAt: '2023-12-01',
  },
];

const BudgetPage = () => {
  const [budgets, setBudgets] = useState<Budget[]>(mockBudgets);
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'budget' | 'item' | 'sponsor'>('budget');
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
  const [selectedItem, setSelectedItem] = useState<BudgetItem | null>(null);
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);
  const [formData, setFormData] = useState({
    eventId: '',
    totalAmount: '',
    itemName: '',
    itemAmount: '',
    itemCategory: '',
    sponsorName: '',
    sponsorAmount: '',
    sponsorContactPerson: '',
    sponsorContactEmail: '',
    sponsorContactPhone: '',
  });
  const [alert, setAlert] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (type: 'budget' | 'item' | 'sponsor', budget?: Budget, item?: BudgetItem, sponsor?: Sponsor) => {
    setDialogType(type);
    if (budget) {
      setSelectedBudget(budget);
    } else {
      setSelectedBudget(null);
    }
    
    if (item) {
      setSelectedItem(item);
      setFormData({
        ...formData,
        itemName: item.name,
        itemAmount: item.amount.toString(),
        itemCategory: item.category,
      });
    } else {
      setSelectedItem(null);
      setFormData({
        ...formData,
        itemName: '',
        itemAmount: '',
        itemCategory: '',
      });
    }
    
    if (sponsor) {
      setSelectedSponsor(sponsor);
      setFormData({
        ...formData,
        sponsorName: sponsor.name,
        sponsorAmount: sponsor.amount.toString(),
        sponsorContactPerson: sponsor.contactPerson,
        sponsorContactEmail: sponsor.contactEmail,
        sponsorContactPhone: sponsor.contactPhone,
      });
    } else {
      setSelectedSponsor(null);
      setFormData({
        ...formData,
        sponsorName: '',
        sponsorAmount: '',
        sponsorContactPerson: '',
        sponsorContactEmail: '',
        sponsorContactPhone: '',
      });
    }
    
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBudget(null);
    setSelectedItem(null);
    setSelectedSponsor(null);
    setFormData({
      eventId: '',
      totalAmount: '',
      itemName: '',
      itemAmount: '',
      itemCategory: '',
      sponsorName: '',
      sponsorAmount: '',
      sponsorContactPerson: '',
      sponsorContactEmail: '',
      sponsorContactPhone: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name as string]: value,
    });
  };

  const handleSubmit = () => {
    if (dialogType === 'budget') {
      if (selectedBudget) {
        // Update existing budget
        const updatedBudgets = budgets.map(budget => 
          budget.id === selectedBudget.id 
            ? { 
                ...budget, 
                totalAmount: parseInt(formData.totalAmount), 
                allocatedAmount: parseInt(formData.totalAmount),
              } 
            : budget
        );
        setBudgets(updatedBudgets);
        setAlert({ type: 'success', message: 'Budget updated successfully!' });
      } else {
        // Add new budget
        const event = events.find(e => e.id === formData.eventId);
        if (event) {
          const newBudget: Budget = {
            id: (budgets.length + 1).toString(),
            eventId: formData.eventId,
            eventName: event.name,
            totalAmount: parseInt(formData.totalAmount),
            allocatedAmount: parseInt(formData.totalAmount),
            spentAmount: 0,
            status: 'pending',
            items: [],
            sponsors: [],
            createdAt: new Date().toISOString().split('T')[0],
            updatedAt: new Date().toISOString().split('T')[0],
          };
          setBudgets([...budgets, newBudget]);
          setAlert({ type: 'success', message: 'Budget created successfully!' });
        }
      }
    } else if (dialogType === 'item' && selectedBudget) {
      if (selectedItem) {
        // Update existing item
        const updatedBudgets = budgets.map(budget => {
          if (budget.id === selectedBudget.id) {
            const updatedItems = budget.items.map(item => 
              item.id === selectedItem.id 
                ? { 
                    ...item, 
                    name: formData.itemName, 
                    amount: parseInt(formData.itemAmount),
                    category: formData.itemCategory as 'venue' | 'equipment' | 'food' | 'marketing' | 'other',
                  } 
                : item
            );
            return { ...budget, items: updatedItems };
          }
          return budget;
        });
        setBudgets(updatedBudgets);
        setAlert({ type: 'success', message: 'Budget item updated successfully!' });
      } else {
        // Add new item
        const updatedBudgets = budgets.map(budget => {
          if (budget.id === selectedBudget.id) {
            const newItem: BudgetItem = {
              id: `i${budget.items.length + 1}`,
              name: formData.itemName,
              amount: parseInt(formData.itemAmount),
              category: formData.itemCategory as 'venue' | 'equipment' | 'food' | 'marketing' | 'other',
              status: 'pending',
            };
            return { ...budget, items: [...budget.items, newItem] };
          }
          return budget;
        });
        setBudgets(updatedBudgets);
        setAlert({ type: 'success', message: 'Budget item added successfully!' });
      }
    } else if (dialogType === 'sponsor' && selectedBudget) {
      if (selectedSponsor) {
        // Update existing sponsor
        const updatedBudgets = budgets.map(budget => {
          if (budget.id === selectedBudget.id) {
            const updatedSponsors = budget.sponsors.map(sponsor => 
              sponsor.id === selectedSponsor.id 
                ? { 
                    ...sponsor, 
                    name: formData.sponsorName, 
                    amount: parseInt(formData.sponsorAmount),
                    contactPerson: formData.sponsorContactPerson,
                    contactEmail: formData.sponsorContactEmail,
                    contactPhone: formData.sponsorContactPhone,
                  } 
                : sponsor
            );
            return { ...budget, sponsors: updatedSponsors };
          }
          return budget;
        });
        setBudgets(updatedBudgets);
        setAlert({ type: 'success', message: 'Sponsor updated successfully!' });
      } else {
        // Add new sponsor
        const updatedBudgets = budgets.map(budget => {
          if (budget.id === selectedBudget.id) {
            const newSponsor: Sponsor = {
              id: `s${budget.sponsors.length + 1}`,
              name: formData.sponsorName,
              amount: parseInt(formData.sponsorAmount),
              status: 'pending',
              contactPerson: formData.sponsorContactPerson,
              contactEmail: formData.sponsorContactEmail,
              contactPhone: formData.sponsorContactPhone,
            };
            return { ...budget, sponsors: [...budget.sponsors, newSponsor] };
          }
          return budget;
        });
        setBudgets(updatedBudgets);
        setAlert({ type: 'success', message: 'Sponsor added successfully!' });
      }
    }
    
    handleCloseDialog();
  };

  const handleDeleteBudget = (budgetId: string) => {
    setBudgets(budgets.filter(budget => budget.id !== budgetId));
    setAlert({ type: 'success', message: 'Budget deleted successfully!' });
  };

  const handleDeleteItem = (budgetId: string, itemId: string) => {
    const updatedBudgets = budgets.map(budget => {
      if (budget.id === budgetId) {
        return { ...budget, items: budget.items.filter(item => item.id !== itemId) };
      }
      return budget;
    });
    setBudgets(updatedBudgets);
    setAlert({ type: 'success', message: 'Budget item deleted successfully!' });
  };

  const handleDeleteSponsor = (budgetId: string, sponsorId: string) => {
    const updatedBudgets = budgets.map(budget => {
      if (budget.id === budgetId) {
        return { ...budget, sponsors: budget.sponsors.filter(sponsor => sponsor.id !== sponsorId) };
      }
      return budget;
    });
    setBudgets(updatedBudgets);
    setAlert({ type: 'success', message: 'Sponsor deleted successfully!' });
  };

  const handleStatusChange = (budgetId: string, status: 'approved' | 'rejected') => {
    const updatedBudgets = budgets.map(budget => 
      budget.id === budgetId ? { ...budget, status } : budget
    );
    setBudgets(updatedBudgets);
    setAlert({ 
      type: 'success', 
      message: `Budget ${status === 'approved' ? 'approved' : 'rejected'} successfully!` 
    });
  };

  const handleItemStatusChange = (budgetId: string, itemId: string, status: 'approved' | 'rejected') => {
    const updatedBudgets = budgets.map(budget => {
      if (budget.id === budgetId) {
        const updatedItems = budget.items.map(item => 
          item.id === itemId ? { ...item, status } : item
        );
        return { ...budget, items: updatedItems };
      }
      return budget;
    });
    setBudgets(updatedBudgets);
    setAlert({ 
      type: 'success', 
      message: `Budget item ${status === 'approved' ? 'approved' : 'rejected'} successfully!` 
    });
  };

  const handleSponsorStatusChange = (budgetId: string, sponsorId: string, status: 'confirmed' | 'rejected') => {
    const updatedBudgets = budgets.map(budget => {
      if (budget.id === budgetId) {
        const updatedSponsors = budget.sponsors.map(sponsor => 
          sponsor.id === sponsorId ? { ...sponsor, status } : sponsor
        );
        return { ...budget, sponsors: updatedSponsors };
      }
      return budget;
    });
    setBudgets(updatedBudgets);
    setAlert({ 
      type: 'success', 
      message: `Sponsor ${status === 'confirmed' ? 'confirmed' : 'rejected'} successfully!` 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'confirmed':
        return 'success';
      case 'rejected':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'venue': return 'Venue';
      case 'equipment': return 'Equipment';
      case 'food': return 'Food';
      case 'marketing': return 'Marketing';
      case 'other': return 'Other';
      default: return category;
    }
  };

  const calculateProgress = (budget: Budget) => {
    return (budget.spentAmount / budget.totalAmount) * 100;
  };

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Budget Management
        </Typography>
        
        {alert && (
          <Alert 
            severity={alert.type} 
            sx={{ mb: 2 }}
            onClose={() => setAlert(null)}
          >
            {alert.message}
          </Alert>
        )}
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Budgets" icon={<AttachMoneyIcon />} iconPosition="start" />
            <Tab label="Sponsors" icon={<BusinessIcon />} iconPosition="start" />
            <Tab label="Reports" icon={<AssessmentIcon />} iconPosition="start" />
          </Tabs>
        </Box>
        
        {/* Budgets Tab */}
        <Box role="tabpanel" hidden={tabValue !== 0}>
          {tabValue === 0 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenDialog('budget')}
                  sx={{ 
                    backgroundColor: THEME_COLORS.orange,
                    '&:hover': {
                      backgroundColor: '#e66000',
                    },
                  }}
                >
                  Create Budget
                </Button>
              </Box>
              
              <Grid container spacing={3}>
                {budgets.map((budget) => (
                  <Grid item xs={12} key={budget.id}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                          <Typography variant="h6" component="div">
                            {budget.eventName}
                          </Typography>
                          <Chip 
                            label={budget.status} 
                            color={getStatusColor(budget.status) as any} 
                          />
                        </Box>
                        
                        <Grid container spacing={2} sx={{ mb: 2 }}>
                          <Grid item xs={12} sm={4}>
                            <Typography variant="body2" color="text.secondary">
                              Total Budget: ₹{budget.totalAmount.toLocaleString()}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Typography variant="body2" color="text.secondary">
                              Allocated: ₹{budget.allocatedAmount.toLocaleString()}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Typography variant="body2" color="text.secondary">
                              Spent: ₹{budget.spentAmount.toLocaleString()}
                            </Typography>
                          </Grid>
                        </Grid>
                        
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Budget Progress
                          </Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={calculateProgress(budget)} 
                            sx={{ 
                              height: 10, 
                              borderRadius: 5,
                              backgroundColor: '#e0e0e0',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: calculateProgress(budget) > 100 ? 'error.main' : 'primary.main',
                              },
                            }} 
                          />
                        </Box>
                        
                        <Typography variant="subtitle1" gutterBottom>
                          Budget Items
                        </Typography>
                        
                        <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>Item</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="right">Actions</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {budget.items.length > 0 ? (
                                budget.items.map((item) => (
                                  <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{getCategoryLabel(item.category)}</TableCell>
                                    <TableCell align="right">₹{item.amount.toLocaleString()}</TableCell>
                                    <TableCell>
                                      <Chip 
                                        label={item.status} 
                                        size="small" 
                                        color={getStatusColor(item.status) as any} 
                                      />
                                    </TableCell>
                                    <TableCell align="right">
                                      {item.status === 'pending' && (
                                        <>
                                          <Tooltip title="Approve">
                                            <IconButton 
                                              size="small" 
                                              color="success" 
                                              onClick={() => handleItemStatusChange(budget.id, item.id, 'approved')}
                                            >
                                              <CheckCircleIcon fontSize="small" />
                                            </IconButton>
                                          </Tooltip>
                                          <Tooltip title="Reject">
                                            <IconButton 
                                              size="small" 
                                              color="error" 
                                              onClick={() => handleItemStatusChange(budget.id, item.id, 'rejected')}
                                            >
                                              <CancelIcon fontSize="small" />
                                            </IconButton>
                                          </Tooltip>
                                        </>
                                      )}
                                      <Tooltip title="Edit">
                                        <IconButton 
                                          size="small" 
                                          onClick={() => handleOpenDialog('item', budget, item)}
                                        >
                                          <EditIcon fontSize="small" />
                                        </IconButton>
                                      </Tooltip>
                                      <Tooltip title="Delete">
                                        <IconButton 
                                          size="small" 
                                          color="error" 
                                          onClick={() => handleDeleteItem(budget.id, item.id)}
                                        >
                                          <DeleteIcon fontSize="small" />
                                        </IconButton>
                                      </Tooltip>
                                    </TableCell>
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell colSpan={5} align="center">No budget items</TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                          <Button 
                            size="small" 
                            startIcon={<AddIcon />}
                            onClick={() => handleOpenDialog('item', budget)}
                          >
                            Add Item
                          </Button>
                          
                          <Box>
                            {budget.status === 'pending' && (
                              <>
                                <Button 
                                  size="small" 
                                  color="success" 
                                  startIcon={<CheckCircleIcon />}
                                  onClick={() => handleStatusChange(budget.id, 'approved')}
                                  sx={{ mr: 1 }}
                                >
                                  Approve
                                </Button>
                                <Button 
                                  size="small" 
                                  color="error" 
                                  startIcon={<CancelIcon />}
                                  onClick={() => handleStatusChange(budget.id, 'rejected')}
                                >
                                  Reject
                                </Button>
                              </>
                            )}
                          </Box>
                        </Box>
                      </CardContent>
                      <CardActions>
                        <Button 
                          size="small" 
                          onClick={() => handleOpenDialog('budget', budget)}
                        >
                          Edit Budget
                        </Button>
                        <Button 
                          size="small" 
                          color="error" 
                          onClick={() => handleDeleteBudget(budget.id)}
                        >
                          Delete Budget
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
        
        {/* Sponsors Tab */}
        <Box role="tabpanel" hidden={tabValue !== 1}>
          {tabValue === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                All Sponsors
              </Typography>
              
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Event</TableCell>
                      <TableCell>Sponsor</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell>Contact Person</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {budgets.map((budget) => (
                      budget.sponsors.map((sponsor) => (
                        <TableRow key={sponsor.id}>
                          <TableCell>{budget.eventName}</TableCell>
                          <TableCell>{sponsor.name}</TableCell>
                          <TableCell align="right">₹{sponsor.amount.toLocaleString()}</TableCell>
                          <TableCell>{sponsor.contactPerson}</TableCell>
                          <TableCell>
                            <Chip 
                              label={sponsor.status} 
                              color={getStatusColor(sponsor.status) as any} 
                            />
                          </TableCell>
                          <TableCell align="right">
                            {sponsor.status === 'pending' && (
                              <>
                                <Tooltip title="Confirm">
                                  <IconButton 
                                    size="small" 
                                    color="success" 
                                    onClick={() => handleSponsorStatusChange(budget.id, sponsor.id, 'confirmed')}
                                  >
                                    <CheckCircleIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Reject">
                                  <IconButton 
                                    size="small" 
                                    color="error" 
                                    onClick={() => handleSponsorStatusChange(budget.id, sponsor.id, 'rejected')}
                                  >
                                    <CancelIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </>
                            )}
                            <Tooltip title="Edit">
                              <IconButton 
                                size="small" 
                                onClick={() => handleOpenDialog('sponsor', budget, undefined, sponsor)}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton 
                                size="small" 
                                color="error" 
                                onClick={() => handleDeleteSponsor(budget.id, sponsor.id)}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => {
                    if (budgets.length > 0) {
                      handleOpenDialog('sponsor', budgets[0]);
                    }
                  }}
                  sx={{ 
                    backgroundColor: THEME_COLORS.orange,
                    '&:hover': {
                      backgroundColor: '#e66000',
                    },
                  }}
                >
                  Add Sponsor
                </Button>
              </Box>
            </Box>
          )}
        </Box>
        
        {/* Reports Tab */}
        <Box role="tabpanel" hidden={tabValue !== 2}>
          {tabValue === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Budget Reports
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Budget Overview
                      </Typography>
                      <TableContainer>
                        <Table size="small">
                          <TableBody>
                            <TableRow>
                              <TableCell>Total Budgets</TableCell>
                              <TableCell align="right">{budgets.length}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Total Amount</TableCell>
                              <TableCell align="right">
                                ₹{budgets.reduce((sum, budget) => sum + budget.totalAmount, 0).toLocaleString()}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Total Allocated</TableCell>
                              <TableCell align="right">
                                ₹{budgets.reduce((sum, budget) => sum + budget.allocatedAmount, 0).toLocaleString()}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Total Spent</TableCell>
                              <TableCell align="right">
                                ₹{budgets.reduce((sum, budget) => sum + budget.spentAmount, 0).toLocaleString()}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Total Sponsors</TableCell>
                              <TableCell align="right">
                                {budgets.reduce((sum, budget) => sum + budget.sponsors.length, 0)}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Total Sponsor Amount</TableCell>
                              <TableCell align="right">
                                ₹{budgets.reduce((sum, budget) => 
                                  sum + budget.sponsors.reduce((s, sponsor) => s + sponsor.amount, 0), 0
                                ).toLocaleString()}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Budget Status
                      </Typography>
                      <TableContainer>
                        <Table size="small">
                          <TableBody>
                            <TableRow>
                              <TableCell>Approved Budgets</TableCell>
                              <TableCell align="right">
                                {budgets.filter(budget => budget.status === 'approved').length}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Pending Budgets</TableCell>
                              <TableCell align="right">
                                {budgets.filter(budget => budget.status === 'pending').length}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Rejected Budgets</TableCell>
                              <TableCell align="right">
                                {budgets.filter(budget => budget.status === 'rejected').length}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
        
        {/* Add/Edit Budget Dialog */}
        <Dialog open={openDialog && dialogType === 'budget'} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>{selectedBudget ? 'Edit Budget' : 'Create New Budget'}</DialogTitle>
          <DialogContent>
            {!selectedBudget && (
              <FormControl fullWidth margin="dense">
                <InputLabel id="event-select-label">Event</InputLabel>
                <Select
                  labelId="event-select-label"
                  name="eventId"
                  value={formData.eventId}
                  label="Event"
                  onChange={handleInputChange}
                >
                  {events.map((event) => (
                    <MenuItem key={event.id} value={event.id}>
                      {event.name} ({event.date})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <TextField
              autoFocus
              margin="dense"
              name="totalAmount"
              label="Total Budget Amount"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.totalAmount}
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              {selectedBudget ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
        
        {/* Add/Edit Budget Item Dialog */}
        <Dialog open={openDialog && dialogType === 'item'} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>{selectedItem ? 'Edit Budget Item' : 'Add Budget Item'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="itemName"
              label="Item Name"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.itemName}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="itemAmount"
              label="Amount"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.itemAmount}
              onChange={handleInputChange}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel id="item-category-label">Category</InputLabel>
              <Select
                labelId="item-category-label"
                name="itemCategory"
                value={formData.itemCategory}
                label="Category"
                onChange={handleInputChange}
              >
                <MenuItem value="venue">Venue</MenuItem>
                <MenuItem value="equipment">Equipment</MenuItem>
                <MenuItem value="food">Food</MenuItem>
                <MenuItem value="marketing">Marketing</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              {selectedItem ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
        
        {/* Add/Edit Sponsor Dialog */}
        <Dialog open={openDialog && dialogType === 'sponsor'} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>{selectedSponsor ? 'Edit Sponsor' : 'Add Sponsor'}</DialogTitle>
          <DialogContent>
            {!selectedSponsor && selectedBudget && (
              <FormControl fullWidth margin="dense">
                <InputLabel id="budget-select-label">Event Budget</InputLabel>
                <Select
                  labelId="budget-select-label"
                  name="budgetId"
                  value={selectedBudget.id}
                  label="Event Budget"
                  disabled
                >
                  <MenuItem value={selectedBudget.id}>
                    {selectedBudget.eventName}
                  </MenuItem>
                </Select>
              </FormControl>
            )}
            <TextField
              autoFocus
              margin="dense"
              name="sponsorName"
              label="Sponsor Name"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.sponsorName}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="sponsorAmount"
              label="Amount"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.sponsorAmount}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="sponsorContactPerson"
              label="Contact Person"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.sponsorContactPerson}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="sponsorContactEmail"
              label="Contact Email"
              type="email"
              fullWidth
              variant="outlined"
              value={formData.sponsorContactEmail}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="sponsorContactPhone"
              label="Contact Phone"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.sponsorContactPhone}
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              {selectedSponsor ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Layout>
  );
};

export default BudgetPage; 