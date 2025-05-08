import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";

interface TimeEntry {
  userId: string;
  clockInTime: number;
  clockOutTime?: number;
}

const formatTime = (timestamp: number | undefined): string => {
  if (!timestamp) return "-";
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const milliseconds = date.getMilliseconds().toString().padStart(3, "0");
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};

const formatDuration = (startTime: number, endTime: number | undefined): string => {
  if (!endTime) return "-";
  const durationMs = endTime - startTime;
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((durationMs % (1000 * 60)) / 1000);
  const milliseconds = durationMs % 1000;

  const formatUnit = (unit: number) => unit.toString().padStart(2, "0");
  const formatMilliseconds = (ms: number) => ms.toString().padStart(3, "0");


  return `${formatUnit(hours)}:${formatUnit(minutes)}:${formatUnit(seconds)}.${formatMilliseconds(milliseconds)}`;
};

export const TimeClockHistory: React.FC = () => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const { user: currentUser, login, logout, isAuthenticated, hasRole, ...authContext } = useAuth();

   // Assuming authContext might have a way to access all users or you have mock data
   // For this client-side example, we'll use mock users from the AuthProvider if available
   const mockUsers = (authContext as any).mockUsers || {}; // Access mockUsers if exposed


  useEffect(() => {
    const storedEntries = localStorage.getItem("timeEntries");
    if (storedEntries) {
      setTimeEntries(JSON.parse(storedEntries));
    }
  }, []);

   // Helper to get user name
   const getUserName = (userId: string): string => {
      const user = Object.values(mockUsers).find((u: any) => u.id === userId) as any;
      return user ? user.name : 'Unknown User';
    };


  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Time Clock History</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Clock In</TableHead>
            <TableHead>Clock Out</TableHead>
            <TableHead>Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {timeEntries.map((entry, index) => (
            <TableRow key={index}>
              <TableCell>{getUserName(entry.userId)}</TableCell>
              <TableCell>{formatTime(entry.clockInTime)}</TableCell>
              <TableCell>{formatTime(entry.clockOutTime)}</TableCell>
              <TableCell>{formatDuration(entry.clockInTime, entry.clockOutTime)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};