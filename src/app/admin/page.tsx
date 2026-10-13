import type { Metadata } from 'next';

import { adminEntries } from '@/features/admin/model/content-registry';
import { AdminPanel } from '@/features/admin/ui/admin-panel';

export const metadata: Metadata = {
  title: 'Управление сайтом',
  robots: { index: false, follow: false },
  alternates: { canonical: '/admin' },
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ demo?: string }>;
}) {
  return <AdminPanel entries={adminEntries} demo={(await searchParams).demo === '1'} />;
}
