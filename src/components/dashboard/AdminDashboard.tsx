
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Settings, 
  BarChart, 
  Package, 
  Shield,
  AlertTriangle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AskAI } from "@/components/dashboard/AskAI";
import { UserManagement } from "./admin/UserManagement";
import { SystemSettings } from "./admin/Settings";
import { SalesReportAdmin } from "./admin/SalesReport";
import { InventoryReport } from "./admin/InventoryReport";
import { StaffManagement } from "./admin/StaffManagement";
import { StaffSchedule } from "./admin/StaffSchedule";
import { LeaveManagement } from "./admin/LeaveManagement";
import { SystemMaintenance } from "./admin/SystemMaintenance";
import { AIAnalytics } from "./admin/AIAnalytics";
import { PerformanceMetrics } from "./admin/PerformanceMetrics";
import { UserInfoBar } from "../common/UserInfoBar";

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [pharmacyName, setPharmacyName] = useState("APOTHEKE Pro");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
      </div>
      
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
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="ai">AI Assistant</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="management" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Add, edit or deactivate user accounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserManagement />
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
                <SystemSettings />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
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
                <SalesReportAdmin />
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
                <InventoryReport />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="staff" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Staff Management</CardTitle>
                <CardDescription>
                  Manage staff members and roles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StaffManagement />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Staff Schedule</CardTitle>
                <CardDescription>
                  Weekly schedule and leave management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StaffSchedule />
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Leave Management</CardTitle>
              <CardDescription>
                Track and approve leave requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LeaveManagement />
            </CardContent>
          </Card>
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
              <SystemMaintenance />
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
              <AskAI />
            </CardContent>
          </Card>
          
          <AIAnalytics />
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Staff Performance Overview</CardTitle>
              <CardDescription>
                Detailed metrics and comparisons for all staff members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PerformanceMetrics />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <UserInfoBar />
    </div>
  );
};
