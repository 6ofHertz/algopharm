
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/features/UI/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const ShiftOverview = () => {
  const shifts = [
    { id: 1, employee: 'John Doe', role: 'Pharmacist', start: '08:00', end: '16:00', status: 'Active' },
    { id: 2, employee: 'Jane Smith', role: 'Technician', start: '10:00', end: '18:00', status: 'Active' },
    { id: 3, employee: 'Bob Johnson', role: 'Cashier', start: '12:00', end: '20:00', status: 'Scheduled' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Shift Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>End Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shifts.map((shift) => (
              <TableRow key={shift.id}>
                <TableCell>{shift.employee}</TableCell>
                <TableCell>{shift.role}</TableCell>
                <TableCell>{shift.start}</TableCell>
                <TableCell>{shift.end}</TableCell>
                <TableCell>
                  <Badge variant={shift.status === 'Active' ? 'default' : 'secondary'}>
                    {shift.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ShiftOverview;
