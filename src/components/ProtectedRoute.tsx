import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, type AppRole } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface Props {
  children: ReactNode;
  allowedRoles: AppRole[];
}

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const { user, roles, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  const ok = allowedRoles.some((r) => roles.includes(r));
  if (!ok) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
