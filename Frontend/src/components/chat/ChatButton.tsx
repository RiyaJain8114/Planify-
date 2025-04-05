'use client';

import { Box, IconButton, Tooltip } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  width: '56px',
  height: '56px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
}));

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export const ChatButton = ({ onClick, isOpen }: ChatButtonProps) => {
  return (
    <Tooltip title={isOpen ? "Close Chat" : "Open Chat"} placement="left">
      <StyledIconButton onClick={onClick} aria-label={isOpen ? "close chat" : "open chat"}>
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </StyledIconButton>
    </Tooltip>
  );
}; 