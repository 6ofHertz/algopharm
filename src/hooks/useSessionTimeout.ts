import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  isSessionValid, 
  getRemainingTime, 
  clearSession 
} from '@/lib/localStorage/sessionManager';
import { toast } from 'sonner';

export const useSessionTimeout = () => {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();

  const checkSessionAndLogout = useCallback(async () => {
    if (!isAuthenticated) return;

    if (!isSessionValid() || getRemainingTime() <= 0) {
      clearSession();
      await logout();
      toast.error('Your session has expired. Please log in again.');
      navigate('/login');
    }
  }, [isAuthenticated, logout, navigate]);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Check session immediately
    checkSessionAndLogout();

    // Check every minute
    const interval = setInterval(checkSessionAndLogout, 60000);

    return () => clearInterval(interval);
  }, [isAuthenticated, checkSessionAndLogout]);

  return {
    remainingTime: getRemainingTime(),
    isSessionValid: isSessionValid()
  };
};