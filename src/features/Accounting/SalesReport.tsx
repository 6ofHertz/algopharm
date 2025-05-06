
import React, { useState } from 'react';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from '@/features/UI/card';
import { Button } from '@/features/UI/button';
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from '@/features/UI/tabs';
import { Input } from '@/features/UI/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/features/UI/table';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/features/UI/select';
import { Download, FileText, Printer, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export const SalesReport = () => {
  const [dateRange, setDateRange] = useState("today");
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState("all");
  
  // Sample transaction data
  const transactions = [
    { id: "TX245789", time: "09:45 AM", customer: "John Doe", total: 126.45, method: "Credit Card", items: 3, cashier: "Emma W.", status: "Completed" },
    { id: "TX245790", time: "10:12 AM", customer: "Sarah Johnson", total: 85.20, method: "Cash", items: 2, cashier: "Emma W.", status: "Completed" },
    { id: "TX245791", time: "10:30 AM", customer: "Michael Brown", total: 220.75, method: "Insurance", items: 1, cashier: "David R.", status: "Completed" },
    { id: "TX245792", time: "11:05 AM", customer: "Jessica Miller", total: 45.99, method: "Credit Card", items: 1, cashier: "Emma W.", status: "Completed" },
    { id: "TX245793", time: "11:23 AM", customer: "Robert Williams", total: 167.50, method: "Split Payment", items: 4, cashier: "David R.", status: "Completed" },
    { id: "TX245794", time: "11:45 AM", customer: "Linda Garcia", total: 32.75, method: "Debit Card", items: 1, cashier: "Emma W.", status: "Completed" }
  ];

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div whileHover={{ scale: 1.05 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,458.75</div>
              <p className="text-xs text-muted-foreground">+18.2% from yesterday</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">32 completed, 10 insurance pending</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tax Collected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$116.70</div>
              <p className="text-xs text-muted-foreground">8% of total sales</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Sale</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$34.73</div>
              <p className="text-xs text-muted-foreground">+$2.45 from yesterday</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Sales & Transaction Tracking</CardTitle>
              <CardDescription>
                View and manage all transactions and receipts
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-1" />
                Print
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
              <Button className="pill-gradient" size="sm">
                <FileText className="h-4 w-4 mr-1" />
                Z-Report
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="transactions" className="space-y-4">
              <TabsList>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="receipts">Receipts</TabsTrigger>
                <TabsTrigger value="tax">Tax Reports</TabsTrigger>
              </TabsList>

              <TabsContent value="transactions" className="space-y-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center">
                    <Select value={dateRange} onValueChange={setDateRange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="yesterday">Yesterday</SelectItem>
                          <SelectItem value="week">This Week</SelectItem>
                          <SelectItem value="month">This Month</SelectItem>
                          <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    {dateRange === "custom" && (
                      <>
                        <Input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-[140px]"
                        />
                        <span className="hidden md:inline">to</span>
                        <Input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="w-[140px]"
                        />
                      </>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 md:flex-row md:items-center">
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Payment Method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="all">All Methods</SelectItem>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="card">Credit/Debit</SelectItem>
                          <SelectItem value="insurance">Insurance</SelectItem>
                          <SelectItem value="split">Split Payment</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search transactions..."
                        className="pl-8 w-full md:w-[200px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Cashier</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.id}</TableCell>
                          <TableCell>{transaction.time}</TableCell>
                          <TableCell>{transaction.customer}</TableCell>
                          <TableCell className="text-right">${transaction.total.toFixed(2)}</TableCell>
                          <TableCell>{transaction.method}</TableCell>
                          <TableCell>{transaction.items}</TableCell>
                          <TableCell>{transaction.cashier}</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-800">
                              {transaction.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="receipts">
                <div className="space-y-4">
                  <div className="border rounded-md p-4 flex justify-center items-center min-h-[400px]">
                    <p className="text-muted-foreground">Receipt management view will be available soon.</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tax">
                <div className="space-y-4">
                  <div className="border rounded-md p-4 flex justify-center items-center min-h-[400px]">
                    <p className="text-muted-foreground">Tax reports will be available soon.</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Sales & Transaction Tracking</CardTitle>
            <CardDescription>
              View and manage all transactions and receipts
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-1" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button className="pill-gradient" size="sm">
              <FileText className="h-4 w-4 mr-1" />
              Z-Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="transactions" className="space-y-4">
            <TabsList>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="receipts">Receipts</TabsTrigger>
              <TabsTrigger value="tax">Tax Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="transactions" className="space-y-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-2 md:flex-row md:items-center">
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="yesterday">Yesterday</SelectItem>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  
                  {dateRange === "custom" && (
                    <>
                      <Input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-[140px]"
                      />
                      <span className="hidden md:inline">to</span>
                      <Input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-[140px]"
                      />
                    </>
                  )}
                </div>
                
                <div className="flex flex-col gap-2 md:flex-row md:items-center">
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Payment Method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all">All Methods</SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="card">Credit/Debit</SelectItem>
                        <SelectItem value="insurance">Insurance</SelectItem>
                        <SelectItem value="split">Split Payment</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search transactions..."
                      className="pl-8 w-full md:w-[200px]"
                    />
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Cashier</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>{transaction.time}</TableCell>
                        <TableCell>{transaction.customer}</TableCell>
                        <TableCell className="text-right">${transaction.total.toFixed(2)}</TableCell>
                        <TableCell>{transaction.method}</TableCell>
                        <TableCell>{transaction.items}</TableCell>
                        <TableCell>{transaction.cashier}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-800">
                            {transaction.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="receipts">
              <div className="space-y-4">
                <div className="border rounded-md p-4 flex justify-center items-center min-h-[400px]">
                  <p className="text-muted-foreground">Receipt management view will be available soon.</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="tax">
              <div className="space-y-4">
                <div className="border rounded-md p-4 flex justify-center items-center min-h-[400px]">
                  <p className="text-muted-foreground">Tax reports will be available soon.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
