import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';

export interface ShiftData {
  startTime: Date | null;
  isActive: boolean;
  duration: string;
}

interface ShiftTrackerProps {
  onShiftChange?: (shiftData: ShiftData) => void;
}

export const ShiftTracker: React.FC<ShiftTrackerProps> = ({ onShiftChange }) => {
  const { user } = useAuth();
  const [shiftStarted, setShiftStarted] = useState(false);
  const [shiftStartTime, setShiftStartTime] = useState<Date | null>(null);
  const [duration, setDuration] = useState("0h 0m");
  
  // Auto-start shift when user logs in
  useEffect(() => {
    if (user && !shiftStarted) {
      startShift();
    }
  }, [user]);
  
  // Calculate shift duration
  useEffect(() => {
    if (shiftStarted && shiftStartTime) {
      const interval = setInterval(() => {
        const diffMs = new Date().getTime() - shiftStartTime.getTime();
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const newDuration = `${hours}h ${minutes}m`;
        setDuration(newDuration);
        
        if (onShiftChange) {
          onShiftChange({
            startTime: shiftStartTime,
            isActive: shiftStarted,
            duration: newDuration
          });
        }
      }, 60000); // Update every minute
      
      return () => clearInterval(interval);
    }
  }, [shiftStarted, shiftStartTime]);
  
  const startShift = () => {
    const now = new Date();
    setShiftStarted(true);
    setShiftStartTime(now);
    
    if (onShiftChange) {
      onShiftChange({
        startTime: now,
        isActive: true,
        duration: "0h 0m"
      });
    }
  };

  const endShift = () => {
    setShiftStarted(false);
    
    if (onShiftChange) {
      onShiftChange({
        startTime: null,
        isActive: false,
        duration
      });
    }
    
    // Keep the last duration visible
    setTimeout(() => {
      setShiftStartTime(null);
      setDuration("0h 0m");
    }, 5000);
  };

  // Get current shift duration
  const getShiftDuration = () => {
    if (!shiftStartTime) return "0h 0m";
    
    const diffMs = new Date().getTime() - shiftStartTime.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };
  
  return (
    <Card className={`${shiftStarted ? "border-green-500 dark:border-green-700" : ""} transition-colors`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Shift Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-start gap-3">
          <div className="flex items-center text-2xl font-bold">
            {shiftStarted ? (
              <>
                <Clock className="mr-2 h-5 w-5 text-green-500" />
                <span className="animate-fade-in">{getShiftDuration()}</span>
              </>
            ) : (
              <>
                <Clock className="mr-2 h-5 w-5 text-gray-400" />
                <span>Not Started</span>
              </>
            )}
          </div>
          <Button 
            className="w-full transition-colors" 
            variant={shiftStarted ? "destructive" : "default"}
            onClick={shiftStarted ? endShift : startShift}
          >
            {shiftStarted ? "End Shift" : "Start Shift"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
