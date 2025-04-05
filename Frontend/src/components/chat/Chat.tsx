'use client';

import { useState } from 'react';
import { ChatButton } from './ChatButton';
import { ChatInterface } from './ChatInterface';

export const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ChatButton onClick={handleToggle} isOpen={isOpen} />
      {isOpen && <ChatInterface onClose={handleClose} />}
    </>
  );
}; 