import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/features/UI/card';
import { Button } from '@/features/UI/button';
import { Badge } from '@/features/UI/badge';
import { Calendar, Download, Filter, Search, TrendingUp, TrendingDown, DollarSign, Package } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/features/UI/select';
import { Input } from '@/components/ui/input';

export const SalesReport = () => {
  const [dateRange, setDateRange] = useState('today');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  const salesData = [
    {
      id: 'TXN-001',
      time: '09:15 AM',
      customer: 'John Smith',
      items: 3,
      total: 45.99,
      payment: 'Card',
      status: 'Completed'
    },
    {
      id: 'TXN-002',
      time: '10:30 AM',
      customer: 'Sarah Johnson',
      items: 1,
      total: 12.50,
      payment: 'Cash',
      status: 'Completed'
    },
    {
      id: 'TXN-003',
      time: '11:45 AM',
      customer: 'Mike Wilson',
      items: 2,
      total: 28.75,
      payment: 'Insurance',
      status: 'Pending'
    }
  ];

  const summaryStats = {
    totalSales: 1247.50,
    totalTransactions: 23,
    averageTransaction: 54.24,
    cashSales: 456.75,
    cardSales: 623.25,
    insuranceSales: 167.50
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
                <p className="text-2xl font-bold">${summaryStats.totalSales}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Package className="h-4 w-4 text-muted-foreground" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Transactions</p>
                <p className="text-2xl font-bold">{summaryStats.totalTransactions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Avg Transaction</p>
                <p className="text-2xl font-bold">${summaryStats.averageTransaction}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Period</p>
                <p className="text-2xl font-bold">Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Report</CardTitle>
          <CardDescription>View and analyze sales transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="cash">Cash Only</SelectItem>
                <SelectItem value="card">Card Only</SelectItem>
                <SelectItem value="insurance">Insurance Only</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Sales Table */}
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Transaction ID</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Time</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Customer</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Items</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Total</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Payment</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.map((transaction) => (
                    <tr key={transaction.id} className="border-b">
                      <td className="p-4 align-middle">{transaction.id}</td>
                      <td className="p-4 align-middle">{transaction.time}</td>
                      <td className="p-4 align-middle">{transaction.customer}</td>
                      <td className="p-4 align-middle">{transaction.items}</td>
                      <td className="p-4 align-middle font-medium">${transaction.total}</td>
                      <td className="p-4 align-middle">
                        <Badge variant="outline">{transaction.payment}</Badge>
                      </td>
                      <td className="p-4 align-middle">
                        <Badge variant={transaction.status === 'Completed' ? 'default' : 'secondary'}>
                          {transaction.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cash Sales</p>
                <p className="text-2xl font-bold">${summaryStats.cashSales}</p>
              </div>
              <div className="text-green-600">
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Card Sales</p>
                <p className="text-2xl font-bold">${summaryStats.cardSales}</p>
              </div>
              <div className="text-blue-600">
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Insurance Sales</p>
                <p className="text-2xl font-bold">${summaryStats.insuranceSales}</p>
              </div>
              <div className="text-purple-600">
                <TrendingDown className="h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
