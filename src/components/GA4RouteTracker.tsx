import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ga4PageView } from '@/lib/ga4Client';

/** Fires GA4 page_view on every SPA route change. Mount once inside <BrowserRouter>. */
export default function GA4RouteTracker() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    ga4PageView(pathname + search);
  }, [pathname, search]);
  return null;
}
