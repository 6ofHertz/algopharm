
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface InteractionAlertProps {
  interactions: string[];
  onContinue: () => void;
  onCancel: () => void;
}

export const InteractionAlert = ({
  interactions,
  onContinue,
  onCancel,
}: InteractionAlertProps) => {
  return (
    <AlertDialog defaultOpen={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-warning">Potential Drug Interaction Detected</AlertDialogTitle>
          <AlertDialogDescription>
            The following potential drug interactions were detected:
            <ul className="mt-2 list-disc pl-5 space-y-1">
              {interactions.map((interaction, index) => (
                <li key={index} className="text-warning">{interaction}</li>
              ))}
            </ul>
            <p className="mt-4">
              Please review these interactions before proceeding. A pharmacist override may be required.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onContinue} className="bg-warning hover:bg-warning/90">
            Override & Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
