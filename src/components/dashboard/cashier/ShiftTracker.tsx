
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "sonner";

export interface ShiftData {
  startTime: Date | null;
  isActive: boolean;
  duration: string;
  seconds: number;
}

interface ShiftTrackerProps {
  onShiftChange?: (shiftData: ShiftData) => void;
}

export const ShiftTracker: React.FC<ShiftTrackerProps> = ({ onShiftChange }) => {
  const { user } = useAuth();
  const [shiftStarted, setShiftStarted] = useState(false);
  const [shiftStartTime, setShiftStartTime] = useState<Date | null>(null);
  const [duration, setDuration] = useState("0h 0m 0s");
  const [seconds, setSeconds] = useState(0);
  
  // Auto-start shift when user logs in
  useEffect(() => {
    if (user && !shiftStarted) {
      startShift();
    }
  }, [user]);
  
  // Calculate shift duration with real-time seconds
  useEffect(() => {
    if (shiftStarted && shiftStartTime) {
      const interval = setInterval(() => {
        const diffMs = new Date().getTime() - shiftStartTime.getTime();
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diffMs % (1000 * 60)) / 1000);
        const totalSeconds = Math.floor(diffMs / 1000);
        
        setSeconds(totalSeconds);
        const newDuration = `${hours}h ${minutes}m ${secs}s`;
        setDuration(newDuration);
        
        if (onShiftChange) {
          onShiftChange({
            startTime: shiftStartTime,
            isActive: shiftStarted,
            duration: newDuration,
            seconds: totalSeconds
          });
        }
      }, 1000); // Update every second for real-time counting
      
      return () => clearInterval(interval);
    }
  }, [shiftStarted, shiftStartTime, onShiftChange]);
  
  const startShift = () => {
    const now = new Date();
    setShiftStarted(true);
    setShiftStartTime(now);
    toast.success("Your shift has started");
    
    if (onShiftChange) {
      onShiftChange({
        startTime: now,
        isActive: true,
        duration: "0h 0m 0s",
        seconds: 0
      });
    }
  };

  const endShift = () => {
    setShiftStarted(false);
    toast.info(`Shift ended. Total duration: ${duration}`);
    
    if (onShiftChange) {
      onShiftChange({
        startTime: null,
        isActive: false,
        duration,
        seconds
      });
    }
    
    // Keep the last duration visible
    setTimeout(() => {
      setShiftStartTime(null);
      setDuration("0h 0m 0s");
      setSeconds(0);
    }, 5000);
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
                <span className="animate-fade-in">{duration}</span>
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
