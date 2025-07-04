
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/features/UI/alert-dialog";
import { Button } from "@/features/UI/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/features/UI/card";
import { cn } from "@/features/lib/utils";
import { motion, AnimatePresence } from 'framer-motion';

interface InteractionAlertProps {
  interactions: string[];
  onContinue: () => void;
  onCancel: () => void;
}

const containerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export const InteractionAlert = ({
  interactions,
  onContinue,
  onCancel,
}: InteractionAlertProps) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(onCancel, 300); // Match the exit animation duration
    };

  return (
    <AnimatePresence>
            {isOpen && (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="fixed inset-0 flex items-center justify-center z-50"
                >
                  <Card className="w-[350px] max-w-full mx-4">
                        <CardHeader>
                            <CardTitle className={cn("text-warning")}>Potential Drug Interaction Detected</CardTitle>
                            <CardDescription>
                                The following potential drug interactions were detected:
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                        <ul className="mt-2 list-disc pl-5 space-y-1">
                                {interactions.map((interaction, index) => (
                                    <motion.li key={index} variants={itemVariants} className="text-warning">{interaction}</motion.li>
                                ))}
                            </ul>
                            <p className="mt-4">
                                Please review these interactions before proceeding. A pharmacist override may be required.
                            </p>
                            <div className="flex justify-end">
                            <Button onClick={handleClose} variant="outline" className="mr-2">Cancel</Button>
                                <Button onClick={onContinue} variant="destructive">Override & Continue</Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            )}
        </AnimatePresence>
  );
};
