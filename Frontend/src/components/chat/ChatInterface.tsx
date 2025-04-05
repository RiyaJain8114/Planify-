'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Button,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

const ChatContainer = styled(Paper)({
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  width: '350px',
  height: '500px',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  borderRadius: '12px',
  overflow: 'hidden',
  backgroundColor: '#fff',
  zIndex: 1000,
});

const MessageContainer = styled(Box)({
  flex: 1,
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  overflow: 'hidden',
  backgroundColor: '#f5f5f5',
});

const MessageBubble = styled(Box)<{ isUser: boolean }>(({ isUser }) => ({
  maxWidth: '85%',
  padding: '8px 12px',
  borderRadius: '12px',
  backgroundColor: isUser ? '#1976d2' : '#fff',
  color: isUser ? '#fff' : '#000',
  alignSelf: isUser ? 'flex-end' : 'flex-start',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
  wordBreak: 'break-word',
  fontSize: '13px',
  lineHeight: '1.3',
}));

const InputContainer = styled(Box)({
  padding: '8px 12px',
  borderTop: '1px solid #e0e0e0',
  display: 'flex',
  gap: '8px',
  backgroundColor: 'white',
  alignItems: 'center',
});

const QuickActionButton = styled(Button)({
  textTransform: 'none',
  justifyContent: 'center',
  padding: '8px 16px',
  fontSize: '13px',
  minHeight: '36px',
  backgroundColor: '#ffffff',
  color: '#1976d2',
  border: '1px solid #e0e0e0',
  borderRadius: '20px',
  transition: 'all 0.2s ease',
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  '&:hover': {
    backgroundColor: '#f8f9ff',
    borderColor: '#1976d2',
    transform: 'translateY(-1px)',
    boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
  },
  '&:active': {
    transform: 'translateY(0)',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  }
});

const QuickActionsContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '12px',
  backgroundColor: '#fff',
  borderTop: '1px solid #e0e0e0',
});

interface FollowUpQuestions {
  [key: string]: string[];
}

const followUpQuestions: FollowUpQuestions = {
  "Event Approval": [
    "How to submit a new event request?",
    "What documents are required?",
    "How long is the approval process?",
    "Can I edit my submitted request?"
  ],
  "Venue Booking": [
    "Show available venues",
    "What are the venue capacities?",
    "What are the booking charges?",
    "View venue amenities"
  ],
  "Budget Query": [
    "View budget template",
    "Check remaining budget",
    "Submit expense report",
    "Request additional funds"
  ],
  "Resources": [
    "Check equipment availability",
    "Book audio/visual equipment",
    "Request technical support",
    "View setup instructions"
  ],
  "Guidelines": [
    "View safety protocols",
    "Check noise regulations",
    "See cleaning requirements",
    "Read complete guidelines"
  ],
  "Track Status": [
    "Check pending requests",
    "View approved events",
    "See rejected requests",
    "Track venue availability"
  ],
  "Cancel Booking": [
    "Cancel upcoming event",
    "View cancellation policy",
    "Request date change",
    "Get refund information"
  ],
  "Others": [
    "Contact support",
    "Report an issue",
    "Give feedback",
    "Schedule a consultation"
  ]
};

interface Message {
  text: string;
  isUser: boolean;
  showQuickActions?: boolean;
  category?: string;
}

interface ChatInterfaceProps {
  onClose: () => void;
}

const quickActions = [
  "Event Approval",
  "Venue Booking",
  "Budget Query",
  "Resources",
  "Guidelines",
  "Track Status",
  "Cancel Booking",
  "Others"
];

export const ChatInterface = ({ onClose }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: "Hi! Welcome to Event Management System. How can I help you today?", 
      isUser: false,
      showQuickActions: true
    }
  ]);
  const [currentCategory, setCurrentCategory] = useState<string | undefined>(undefined);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getResponseForAction = (action: string, subAction?: string): string => {
    if (subAction) {
      switch(action) {
        case "Event Approval":
          if (subAction === "How to submit a new event request?") {
            return "To submit a new event request:\n1. Go to Dashboard\n2. Click 'New Event'\n3. Fill all required fields\n4. Attach necessary documents\n5. Click Submit\n\nWould you like to start a new request now?";
          }
          break;
      }
      return "Let me help you with that specific query. Please provide any additional details if needed.";
    }

    switch(action) {
      case "Event Approval":
        return "To request event approval:\n1. Log in to your account\n2. Go to 'Event Management'\n3. Click 'New Event Request'\n4. Fill in event details\n5. Submit for approval\n\nWould you like to know more about any specific part of the process?";
      case "Venue Booking":
        return "Here's how venue booking works:\n1. Check available venues in the system\n2. Select your preferred date and time\n3. Submit a booking request\n\nWould you like to see the list of available venues?";
      case "Budget Query":
        return "For event funding:\n1. Submit a detailed budget proposal\n2. Include all expected expenses\n3. Attach any relevant quotations\n\nWould you like to see a budget template?";
      case "Resources":
        return "Available equipment includes:\n- Audio systems\n- Projectors\n- Chairs and tables\n- Decorative items\n\nWould you like to check availability for specific equipment?";
      case "Guidelines":
        return "Here are the key event hosting rules:\n1. Submit requests 2 weeks in advance\n2. Follow safety protocols\n3. Clean up after events\n4. Respect noise regulations\n\nWould you like more specific details about any of these rules?";
      case "Track Status":
        return "You can track your event approval status by:\n1. Going to 'My Requests'\n2. Checking the status indicator\n\nWould you like me to check a specific event status for you?";
      case "Cancel Booking":
        return "To cancel a booking:\n1. Go to 'My Bookings'\n2. Select the booking\n3. Click 'Cancel Booking'\n\nNote: Cancellations must be made at least 48 hours in advance.";
      default:
        return "Please let me know what specific information you're looking for, and I'll be happy to help.";
    }
  };

  const handleQuickAction = (action: string, isFollowUp: boolean = false) => {
    if (!isFollowUp) {
      setCurrentCategory(action);
      const query = `I want to know about ${action.toLowerCase()}`;
      setMessages(prev => [...prev, { text: query, isUser: true, showQuickActions: false }]);

      setTimeout(() => {
        const response = getResponseForAction(action);
        setMessages(prev => [...prev, { 
          text: response, 
          isUser: false,
          showQuickActions: true,
          category: action 
        }]);
      }, 1000);
    } else {
      setMessages(prev => [...prev, { text: action, isUser: true, showQuickActions: false }]);

      setTimeout(() => {
        const response = getResponseForAction(currentCategory || '', action);
        setMessages(prev => [...prev, { 
          text: response, 
          isUser: false,
          showQuickActions: true,
          category: currentCategory || undefined 
        }]);
      }, 1000);
    }
  };

  const handleSendMessage = (text: string = inputMessage) => {
    if (text.trim()) {
      setMessages(prev => [...prev, { text, isUser: true, showQuickActions: false }]);
      setInputMessage('');
      
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: "I'll help you with that query. Please provide more details if needed.",
          isUser: false,
          showQuickActions: true,
          category: currentCategory || undefined 
        }]);
      }, 1000);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const renderQuickActions = () => {
    if (messages.length === 1) {
      // Group main actions into rows of 3
      const mainActions = Object.keys(followUpQuestions);
      const rows = [];
      for (let i = 0; i < mainActions.length; i += 3) {
        rows.push(mainActions.slice(i, i + 3));
      }

      return (
        <QuickActionsContainer>
          {rows.map((row, rowIndex) => (
            <Box 
              key={rowIndex} 
              sx={{ 
                display: 'flex', 
                gap: '8px', 
                marginBottom: rowIndex < rows.length - 1 ? '8px' : 0,
                justifyContent: 'center'
              }}
            >
              {row.map((action) => (
                <QuickActionButton
                  key={action}
                  variant="outlined"
                  onClick={() => handleQuickAction(action)}
                  sx={{ 
                    flex: 1,
                    maxWidth: '160px',
                    minWidth: '100px'
                  }}
                >
                  {action}
                </QuickActionButton>
              ))}
            </Box>
          ))}
        </QuickActionsContainer>
      );
    }

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.category && followUpQuestions[lastMessage.category]) {
      // Group follow-up questions into rows of 2
      const questions = followUpQuestions[lastMessage.category];
      const rows = [];
      for (let i = 0; i < questions.length; i += 2) {
        rows.push(questions.slice(i, i + 2));
      }

      return (
        <QuickActionsContainer>
          {rows.map((row, rowIndex) => (
            <Box 
              key={rowIndex} 
              sx={{ 
                display: 'flex', 
                gap: '8px', 
                marginBottom: rowIndex < rows.length - 1 ? '8px' : 0,
                justifyContent: 'center'
              }}
            >
              {row.map((question) => (
                <QuickActionButton
                  key={question}
                  variant="outlined"
                  onClick={() => handleQuickAction(question, true)}
                  sx={{ 
                    flex: 1,
                    maxWidth: '200px',
                    minWidth: '120px'
                  }}
                >
                  {question}
                </QuickActionButton>
              ))}
            </Box>
          ))}
        </QuickActionsContainer>
      );
    }

    return null;
  };

  return (
    <ChatContainer>
      <Box sx={{ 
        p: 2, 
        borderBottom: '1px solid #e0e0e0', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        backgroundColor: '#1976d2',
        color: 'white',
        minHeight: '56px'
      }}>
        <Typography variant="h6" sx={{ fontWeight: 500, fontSize: '1.1rem' }}>Ask Assistant</Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <MessageContainer>
        {messages.map((message, index) => (
          <Box key={index}>
            <MessageBubble isUser={message.isUser}>
              <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
                {message.text}
              </Typography>
            </MessageBubble>
            {message.showQuickActions && !message.isUser && index === messages.length - 1 && (
              renderQuickActions()
            )}
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </MessageContainer>

      <InputContainer>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
              backgroundColor: '#fff',
              height: '40px',
              '& fieldset': {
                borderColor: '#e0e0e0',
              },
              '&:hover fieldset': {
                borderColor: '#1976d2',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#1976d2',
              }
            },
            '& .MuiOutlinedInput-input': {
              padding: '8px 14px',
            }
          }}
        />
        <IconButton
          onClick={() => handleSendMessage()}
          disabled={!inputMessage.trim()}
          sx={{
            backgroundColor: '#1976d2',
            color: 'white',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
            '&.Mui-disabled': {
              backgroundColor: '#e0e0e0',
              color: '#9e9e9e',
            },
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            padding: '8px',
          }}
        >
          <SendIcon fontSize="small" />
        </IconButton>
      </InputContainer>
    </ChatContainer>
  );
}; 