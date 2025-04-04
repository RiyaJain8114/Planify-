'use client';

import React from 'react';
import ThemeRegistry from '@/components/theme/ThemeRegistry';
import { AuthProvider } from '@/contexts/AuthContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeRegistry>
          {children}
      </ThemeRegistry>
    </AuthProvider>
  );
}

export default Providers; 