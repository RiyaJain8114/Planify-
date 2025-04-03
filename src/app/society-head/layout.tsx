'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function SocietyHeadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={['SOCIETY_HEAD']}>
      <Layout>{children}</Layout>
    </ProtectedRoute>
  );
} 