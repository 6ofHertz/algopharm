
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/features/UI/card';
import { Button } from '@/features/UI/button';
import {
  Users,
  Settings,
  BarChart,
  Package,
  Shield,
  Download,
  History,
  User,
  Upload,
} from "lucide-react";
import TimeClockHistory from './TimeClockHistory'; // Import the TimeClockHistory component
import { AskAI } from '@/features/Dashboard/AskAI';
import ShiftOverview from '@/features/Dashboard/ShiftOverview';
import { UserPerformance } from '@/features/Dashboard/UserPerformance';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/features/UI/tabs';
import { useAuth } from '@/features/Auth/AuthContext';

export const AdminDashboard = () => {
  const { user } = useAuth();
  const [isClockedIn, setIsClockedIn] = useState(false);

  useEffect(() => {
    if (user) {
      const timeEntries = JSON.parse(localStorage.getItem('timeEntries') || '[]') as any[];
      const lastEntry = timeEntries
        .filter(entry => entry.userId === user.id)
        .pop();
      if (lastEntry && !lastEntry.clockOutTime) {
        setIsClockedIn(true);
      } else {
        setIsClockedIn(false);
      }
    }
  }, [user]);

  const handleClockIn = () => {
    if (user) {
      const timeEntries = JSON.parse(localStorage.getItem('timeEntries') || '[]') as any[];
      timeEntries.push({ userId: user.id, clockInTime: Date.now() });
      localStorage.setItem('timeEntries', JSON.stringify(timeEntries));
      setIsClockedIn(true);
    }
  };

  const handleClockOut = () => {
    if (user) {
      const timeEntries = JSON.parse(localStorage.getItem('timeEntries') || '[]') as any[];
      const lastEntry = timeEntries.filter(entry => entry.userId === user.id && !entry.clockOutTime).pop();
      if (lastEntry) {
        lastEntry.clockOutTime = Date.now();
        localStorage.setItem('timeEntries', JSON.stringify(timeEntries));
        setIsClockedIn(false);
      }
    }
  };
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Admin Dashboard</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span>8 Pharmacists</span>
              <span>•</span>
              <span>14 Cashiers</span>
              <span>•</span>
              <span>2 Admins</span>
            </div>
          </CardContent>
        </Card>


        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-green-500">All Systems Normal</div>
            <p className="text-xs text-muted-foreground">Last backup: 2 hours ago</p>
          </CardContent>
        </Card>
        <Card>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$89,452.25</div>
            <p className="text-xs text-muted-foreground">+12.3% from last month</p>
          </CardContent>
        </Card>
        <Card>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$124,576.00</div>
            <p className="text-xs text-muted-foreground">2,506 products in stock</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="management">

        <TabsList>
          <TabsTrigger value="management">Management</TabsTrigger>
          <TabsTrigger value="reports">Reports & Analytics</TabsTrigger>
          <TabsTrigger value="time-clock">Time Clock</TabsTrigger> {/* New tab for Time Clock History */}
          <TabsTrigger value="system">
            <div className="flex items-center">
              System
              <Button size="sm" variant="outline" className="ml-2" onClick={isClockedIn ? handleClockOut : handleClockIn}>
                {isClockedIn ? 'Clock Out' : 'Clock In'}
              </Button>
            </div>
          </TabsTrigger>
          <TabsTrigger value="ai">AI Assistant</TabsTrigger>
        </TabsList>


        <TabsContent value="management" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
              <ShiftOverview />
              <UserPerformance/>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Add, edit or deactivate user accounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Dr. Sarah Johnson</p>
                        <p className="text-xs text-muted-foreground">Pharmacist • PHR-001</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 bg-muted rounded-md ">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">John Doe</p>
                        <p className="text-xs text-muted-foreground">Cashier • CSH-001</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Alex Smith</p>
                        <p className="text-xs text-muted-foreground">Admin • ADM-001</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div> 
                
                <Button className="w-full mt-4">
                  <Users className="h-4 w-4 mr-2" />
                  Manage All Users
                </Button>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>
                  Configure global system settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full justify-start" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Tax Configuration
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Discount Programs
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Payment Methods
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Insurance Providers
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Receipt Templates
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* New content for Reports & Analytics */}
        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Inventory Value Breakdown Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Inventory Value Breakdown</CardTitle>
                <CardDescription>Distribution of inventory value by category</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                {/* Placeholder for Pie Chart component */}
                {/* Replace with your charting library's Pie Chart component */}
                <div className="text-muted-foreground">Pie Chart Placeholder (e.g., from recharts)</div>
                {/* Data fetching for this chart would occur here or in a parent component */}
              </CardContent>
            </Card>

            {/* Monthly Sales Trend Bar Chart */}
            <Card>
              <CardHeader><CardTitle>Monthly Sales Trend</CardTitle><CardDescription>Revenue trend over the past few months</CardDescription></CardHeader>
              <CardContent className="flex items-center justify-center">
                {/* Placeholder for Bar Chart component */}
                {/* Replace with your charting library's Bar Chart component */}
                <div className="text-muted-foreground">Bar Chart Placeholder (e.g., from recharts)</div>
                {/* Data fetching for this chart would occur here or in a parent component */}
              </CardContent>
            </Card>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Sales Reports</CardTitle>
                <CardDescription>
                  Generate and export sales reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart className="h-4 w-4 mr-2" />
                    Daily Sales Summary
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart className="h-4 w-4 mr-2" />
                    Monthly Revenue Analysis
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart className="h-4 w-4 mr-2" />
                    Product Performance
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart className="h-4 w-4 mr-2" />
                    Cashier Performance
                  </Button>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Export Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Inventory Reports</CardTitle>
                <CardDescription>
                  Track and analyze inventory data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full justify-start" variant="outline">
                    <Package className="h-4 w-4 mr-2" />
                    Current Inventory Value
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Package className="h-4 w-4 mr-2" />
                    Stock Movement Analysis
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Package className="h-4 w-4 mr-2" />
                    Expiration Report
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Package className="h-4 w-4 mr-2" />
                    Reorder Recommendations
                  </Button>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Export Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        </TabsContent>

        {/* New content for Time Clock History */}
        <TabsContent value="time-clock" className="space-y-4">
          <TimeClockHistory />
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Maintenance</CardTitle>
              <CardDescription>
                Backup, restore, and system logs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Backup & Restore</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Button size="sm" className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Create Backup
                        </Button>
                        <Button size="sm" variant="outline" className="w-full">
                          <Upload className="h-4 w-4 mr-2" />
                          Restore Data
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">System Logs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Button size="sm" className="w-full">
                          <History className="h-4 w-4 mr-2" />
                          View Audit Logs
                        </Button>
                        <Button size="sm" variant="outline" className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Export Logs
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-muted p-4 rounded-md">
                  <h4 className="text-sm font-medium mb-2">Recent System Events</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span>Automatic backup completed</span>
                      <span className="text-muted-foreground">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>System update installed</span>
                      <span className="text-muted-foreground">Yesterday</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Database optimization completed</span>
                      <span className="text-muted-foreground">2 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>
                Get intelligent insights from your pharmacy data

              </CardDescription>
            </CardHeader>
              <CardContent>
              <AskAI userRole="admin"/>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
