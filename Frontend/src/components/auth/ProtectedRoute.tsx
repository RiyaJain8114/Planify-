'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: ('SOCIETY_HEAD' | 'COLLEGE_AUTHORITY')[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
      return;
    }

    if (!role || !allowedRoles.includes(role)) {
      router.push('/unauthorized');
    }
  }, [isAuthenticated, role, router, allowedRoles]);

  // Don't render anything if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Don't render if user doesn't have required role
  if (!role || !allowedRoles.includes(role)) {
    return null;
  }

  return <>{children}</>;
} 