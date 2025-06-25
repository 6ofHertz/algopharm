
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/features/UI/card';
import { Button } from '@/features/UI/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/features/UI/tabs';
import { Calendar, Download, FileText, TrendingUp } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/features/UI/select';
import { 
  LineChart, Line, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie
} from "recharts";
import { motion } from 'framer-motion';

export const FinancialReporting = () => {
  const [reportType, setReportType] = useState("daily");
  const [reportPeriod, setReportPeriod] = useState("current-month");
  
  // Sample data for financial reports
  const salesData = [
    { name: "Mon", sales: 1200, profit: 480, tax: 96 },
    { name: "Tue", sales: 1500, profit: 600, tax: 120 },
    { name: "Wed", sales: 1300, profit: 520, tax: 104 },
    { name: "Thu", sales: 1600, profit: 640, tax: 128 },
    { name: "Fri", sales: 1800, profit: 720, tax: 144 },
    { name: "Sat", sales: 2100, profit: 840, tax: 168 },
    { name: "Sun", sales: 1400, profit: 560, tax: 112 }
  ];
  
  const categoryData = [
    { name: "Prescription", value: 45 },
    { name: "OTC Medications", value: 30 },
    { name: "Medical Supplies", value: 15 },
    { name: "Health & Beauty", value: 10 }
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid gap-4 md:grid-cols-3"
      >
        <Card className="border-2 border-gray-200 dark:border-gray-700 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-800 dark:text-gray-200">Monthly Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">$42,567.89</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
            <FileText className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">32.4%</div>
            <p className="text-xs text-muted-foreground text-gray-600 dark:text-gray-400">+2.1% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tax Liability</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">$3,405.43</div>
            <p className="text-xs text-muted-foreground">Due by the 15th</p>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border-2 border-gray-200 dark:border-gray-700 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>
                Analyze sales, profits, and tax data
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Report Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              
              <Select value={reportPeriod} onValueChange={setReportPeriod}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="current-month">Current Month</SelectItem>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="q1">Q1 2025</SelectItem>
                    <SelectItem value="q2">Q2 2025</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="summary" className="space-y-4">
              <TabsList>
                <TabsTrigger value="summary" className="text-gray-800 dark:text-gray-200">Summary</TabsTrigger>
                <TabsTrigger value="profitability" className="text-gray-800 dark:text-gray-200">Profitability</TabsTrigger>
                <TabsTrigger value="tax" className="text-gray-800 dark:text-gray-200">Tax Reports</TabsTrigger>
                <TabsTrigger value="regulatory" className="text-gray-800 dark:text-gray-200">Regulatory</TabsTrigger>
              </TabsList>
              
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <TabsContent value="summary" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border rounded-md p-4">
                      <h4 className="text-sm font-medium mb-2">Sales Breakdown</h4>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={salesData}
                            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="sales" fill="#0088FE" name="Sales ($)" />
                            <Bar dataKey="profit" fill="#00C49F" name="Profit ($)" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h4 className="text-sm font-medium mb-2">Sales by Category</h4>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={categoryData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h4 className="text-sm font-medium mb-2">Weekly Trends</h4>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={salesData}
                          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="sales" stroke="#0088FE" activeDot={{ r: 8 }} name="Sales ($)" />
                          <Line type="monotone" dataKey="tax" stroke="#FF8042" name="Tax ($)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </TabsContent>
              </motion.div>
              
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
                <TabsContent value="profitability">
                  <div className="border rounded-md p-4 flex justify-center items-center min-h-[400px]">
                    <p className="text-muted-foreground">Profitability analysis will be available soon.</p>
                  </div>
                </TabsContent>
              </motion.div>
              
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <TabsContent value="tax">
                  <div className="border rounded-md p-4 flex justify-center items-center min-h-[400px]">
                    <p className="text-muted-foreground">Tax reports will be available soon.</p>
                  </div>
                </TabsContent>
              </motion.div>
              
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
                <TabsContent value="regulatory">
                  <div className="border rounded-md p-4 flex justify-center items-center min-h-[400px]">
                    <p className="text-muted-foreground">Regulatory reports will be available soon.</p>
                  </div>
                </TabsContent>
              </motion.div>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};
