import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Clock, RefreshCw } from 'lucide-react';
import { 
  shouldShowSessionWarning, 
  formatRemainingTime, 
  extendSession,
  getRemainingTime 
} from '@/lib/localStorage/sessionManager';
import { useAuth } from '@/contexts/AuthContext';

export const SessionWarning: React.FC = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [remainingTime, setRemainingTime] = useState('');
  const { logout } = useAuth();

  useEffect(() => {
    const checkSession = () => {
      const shouldShow = shouldShowSessionWarning();
      setShowWarning(shouldShow);
      setRemainingTime(formatRemainingTime());

      // Auto logout when session expires
      if (getRemainingTime() <= 0) {
        logout();
      }
    };

    // Check immediately
    checkSession();

    // Check every minute
    const interval = setInterval(checkSession, 60000);

    return () => clearInterval(interval);
  }, [logout]);

  const handleExtendSession = () => {
    extendSession(12); // Extend by 12 hours
    setShowWarning(false);
    setRemainingTime(formatRemainingTime());
  };

  if (!showWarning) return null;

  return (
    <Alert className="mb-4 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
      <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
      <AlertDescription className="flex items-center justify-between">
        <span className="text-amber-800 dark:text-amber-200">
          Your session will expire soon. {remainingTime}
        </span>
        <Button 
          size="sm" 
          variant="outline"
          onClick={handleExtendSession}
          className="ml-4"
        >
          <RefreshCw className="h-3 w-3 mr-1" />
          Extend Session
        </Button>
      </AlertDescription>
    </Alert>
  );
};