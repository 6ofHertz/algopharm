
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface InteractionAlertProps {
  interactions: string[];
  onContinue: () => void;
  onCancel: () => void;
}

export const InteractionAlert: React.FC<InteractionAlertProps> = ({ interactions, onContinue, onCancel }) => {
  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Drug Interaction Alert</AlertTitle>
      <AlertDescription>
        <div className="space-y-2">
          <p>The following potential drug interactions were detected:</p>
          <ul className="list-disc pl-5">
            {interactions.map((interaction, index) => (
              <li key={index}>{interaction}</li>
            ))}
          </ul>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={onContinue}>
              Continue Anyway
            </Button>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
};
