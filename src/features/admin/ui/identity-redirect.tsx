'use client';

import { useEffect } from 'react';

export function IdentityRedirect() {
  useEffect(() => {
    if (
      window.location.pathname !== '/admin' &&
      /^#(?:invite_token|recovery_token|confirmation_token|email_change_token)=/.test(
        window.location.hash,
      )
    ) {
      window.location.replace(`/admin${window.location.hash}`);
    }
  }, []);
  return null;
}
