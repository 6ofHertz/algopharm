tsx
import React from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/features/UI/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/features/UI/table';
import UserPerformance from './UserPerformance';

interface Shift { 

  user: string;
  startTime: string;
  endTime: string;
}

const mockShifts: Shift[] = [
  { user: 'User 1', startTime: '08:00', endTime: '16:00' },
  { user: 'User 2', startTime: '09:00', endTime: '17:00' },
  { user: 'User 3', startTime: '10:00', endTime: '18:00' },
  { user: 'User 4', startTime: '11:00', endTime: '19:00' },
  { user: 'User 5', startTime: '12:00', endTime: '20:00' },
];

const ShiftOverview: React.FC = () => {
  const totalShifts = mockShifts.length;
  const averageShiftDuration = '8 hours';

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }, 
  };
  
  const tableVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, delay: 0.2 } },
  };

  const tableRowVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, delay: index * 0.1 },
    }),
  };

return (
<motion.div
  className="w-full p-4"
  initial="hidden"
  animate="visible"
  variants={{
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  }}
>
  <motion.div
    className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
    variants={{
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
    }}
    initial="hidden"
    animate="visible"
  >
    <motion.div variants={cardVariants}>
      <Card>
        <CardHeader>
          <CardTitle>Total Shifts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{totalShifts}</p>
        </CardContent>
      </Card>
    </motion.div>
    <motion.div variants={cardVariants}>
      <Card>
        <CardHeader>
          <CardTitle>Average Shift Duration</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{averageShiftDuration}</p>
        </CardContent>
      </Card>
    </motion.div>
  </motion.div>
  <motion.div variants={tableVariants} initial="hidden" animate="visible">
    <Card>
      <CardHeader>
        <CardTitle>Shifts Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>End Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockShifts.map((shift, index) => (
              <motion.TableRow key={index} custom={index} variants={tableRowVariants}>
                <TableCell>{shift.user}</TableCell>
                <TableCell>{shift.startTime}</TableCell>
                <TableCell>{shift.endTime}</TableCell>
              </motion.TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </motion.div>
    <UserPerformance/>
</motion.div>
);
};

export default ShiftOverview;