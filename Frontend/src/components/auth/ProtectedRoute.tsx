'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: ('SOCIETY_HEAD' | 'COLLEGE_AUTHORITY')[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (role && !allowedRoles.includes(role)) {
      router.push('/unauthorized');
    }
  }, [role, router, allowedRoles]);

  if (role && !allowedRoles.includes(role)) {
    return null;
  }

  return <>{children}</>;
} 