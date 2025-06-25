
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface InteractionAlertProps {
  message: string;
  severity: 'warning' | 'danger';
}

export const InteractionAlert: React.FC<InteractionAlertProps> = ({ message, severity }) => {
  return (
    <Alert variant={severity === 'danger' ? 'destructive' : 'default'}>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Drug Interaction Alert</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};
