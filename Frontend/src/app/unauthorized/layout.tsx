'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';

export default function UnauthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
} 