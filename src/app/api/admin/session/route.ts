import { adminFailure, adminJson, requireAdmin, setupStatus } from '@/features/admin/server/access';

export async function GET() {
  const setup = setupStatus();
  if (!setup.ready) return adminJson({ configured: false });
  try {
    return adminJson({ configured: true, user: await requireAdmin() });
  } catch (error) {
    return adminFailure(error);
  }
}
