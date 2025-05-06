tsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/features/UI/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/features/UI/table';
import { cn } from '@/features/lib/utils';
interface UserPerformanceData {
  user: string;
  salesMade: number;
  shiftsWorked: number;
  averageSale: number;
}

const mockPerformanceData: UserPerformanceData[] = [
  { user: 'User 1', salesMade: 150, shiftsWorked: 20, averageSale: 50 },
  { user: 'User 2', salesMade: 120, shiftsWorked: 18, averageSale: 45 },
  { user: 'User 3', salesMade: 180, shiftsWorked: 22, averageSale: 60 },
  { user: 'User 4', salesMade: 90, shiftsWorked: 15, averageSale: 30 },
];

const UserPerformance: React.FC = () => {
  const totalSales = mockPerformanceData.reduce((sum, user) => sum + user.salesMade, 0);
  const totalShifts = mockPerformanceData.reduce((sum, user) => sum + user.shiftsWorked, 0);
  const averageTotalSale = totalSales / mockPerformanceData.length;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AnimatePresence>
      {mounted && (
        <motion.div
          className={cn("w-full p-4")}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{totalSales}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Shifts Worked</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{totalShifts}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Average Sale</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{averageTotalSale.toFixed(2)}</p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>User Performance</CardTitle>
              <CardDescription>Detailed performance statistics for each user</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Sales Made</TableHead>
                    <TableHead>Shifts Worked</TableHead>
                    <TableHead>Average Sale</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPerformanceData.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell>{data.user}</TableCell>
                      <TableCell>{data.salesMade}</TableCell>
                      <TableCell>{data.shiftsWorked}</TableCell>
                      <TableCell>{data.averageSale.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserPerformance;