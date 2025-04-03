'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function CollegeAuthorityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={['COLLEGE_AUTHORITY']}>
      <Layout>{children}</Layout>
    </ProtectedRoute>
  );
} 