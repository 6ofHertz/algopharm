
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Settings, 
  BarChart, 
  Package, 
  Shield,
  Download,
  Upload,
  History,
  User,
  PieChart,
  UserPlus,
  FileText,
  CalendarDays
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AskAI } from "@/components/dashboard/AskAI";
import { FactGenerator } from "@/components/common/FactGenerator";

// New component for staff management section
const StaffManagement = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Staff Directory</h3>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Add New Staff
        </Button>
      </div>
      
      <div className="bg-muted rounded-md p-4 space-y-3">
        <div className="flex items-center justify-between p-2 bg-card rounded-md">
          <div className="flex items-center">
            <User className="h-10 w-10 mr-3 text-muted-foreground bg-muted-foreground/20 p-2 rounded-full" />
            <div>
              <p className="font-medium">Dr. Sarah Johnson</p>
              <p className="text-xs text-muted-foreground">Pharmacist • PHR-001 • Full-time</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">Schedule</Button>
            <Button variant="outline" size="sm">Edit</Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-2 bg-card rounded-md">
          <div className="flex items-center">
            <User className="h-10 w-10 mr-3 text-muted-foreground bg-muted-foreground/20 p-2 rounded-full" />
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">Cashier • CSH-001 • Part-time</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">Schedule</Button>
            <Button variant="outline" size="sm">Edit</Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-2 bg-card rounded-md">
          <div className="flex items-center">
            <User className="h-10 w-10 mr-3 text-muted-foreground bg-muted-foreground/20 p-2 rounded-full" />
            <div>
              <p className="font-medium">Emily Rodriguez</p>
              <p className="text-xs text-muted-foreground">Pharmacist • PHR-002 • Full-time</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">Schedule</Button>
            <Button variant="outline" size="sm">Edit</Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-2 bg-card rounded-md">
          <div className="flex items-center">
            <User className="h-10 w-10 mr-3 text-muted-foreground bg-muted-foreground/20 p-2 rounded-full" />
            <div>
              <p className="font-medium">Michael Lee</p>
              <p className="text-xs text-muted-foreground">Inventory Manager • INV-001 • Full-time</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">Schedule</Button>
            <Button variant="outline" size="sm">Edit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// New component for staff schedule section
const StaffSchedule = () => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const staff = [
    { name: 'Dr. Sarah Johnson', role: 'Pharmacist', schedule: [1,1,1,1,0,0,0] },
    { name: 'John Doe', role: 'Cashier', schedule: [1,1,0,0,1,1,0] },
    { name: 'Emily Rodriguez', role: 'Pharmacist', schedule: [0,0,1,1,1,1,0] },
    { name: 'Michael Lee', role: 'Inventory Manager', schedule: [1,1,1,1,1,0,0] }
  ];
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Weekly Schedule</h3>
        <Button variant="outline">
          <CalendarDays className="h-4 w-4 mr-2" />
          Generate Schedule
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-2 bg-muted">Staff</th>
              {daysOfWeek.map(day => (
                <th key={day} className="text-center p-2 bg-muted">{day.substring(0, 3)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {staff.map((person, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                <td className="p-2">
                  <div>
                    <p className="font-medium">{person.name}</p>
                    <p className="text-xs text-muted-foreground">{person.role}</p>
                  </div>
                </td>
                {person.schedule.map((day, idx) => (
                  <td key={idx} className="text-center p-2">
                    {day === 1 ? (
                      <div className="h-6 w-6 rounded-full bg-green-500/20 text-green-700 flex items-center justify-center mx-auto">✓</div>
                    ) : (
                      <div className="h-6 w-6 rounded-full bg-red-500/20 text-red-700 flex items-center justify-center mx-auto">-</div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        <FactGenerator />
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
                  
                  <div className="flex items-center justify-between p-2 bg-muted rounded-md">
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
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Pending Requests</h3>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </div>
                
                <div className="bg-muted rounded-md p-4 space-y-3">
                  <div className="flex items-center justify-between p-2 bg-card rounded-md">
                    <div>
                      <p className="font-medium">Dr. Sarah Johnson</p>
                      <p className="text-xs text-muted-foreground">Annual Leave • 24-28 Jun 2025 (5 days)</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border-red-200">
                        Reject
                      </Button>
                      <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                        Approve
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 bg-card rounded-md">
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-xs text-muted-foreground">Sick Leave • 5 Jun 2025 (1 day)</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border-red-200">
                        Reject
                      </Button>
                      <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                        Approve
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
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
              <AskAI />
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Analytics</CardTitle>
                <CardDescription>
                  Data insights generated by AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <PieChart className="h-5 w-5 mr-2 text-primary" />
                    <h4 className="text-lg font-semibold">Business Insights</h4>
                  </div>
                  
                  <div className="bg-muted rounded-md p-3 text-sm space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Daily Sales Pattern:</span>
                      <span>Peak hours between 11am-2pm</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Most Profitable Category:</span>
                      <span>OTC Pain Relievers (32% margin)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Recommended Stock:</span>
                      <span>Increase Vitamin D by 15%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Customer Trend:</span>
                      <span>Increasing demand for organic options</span>
                    </div>
                  </div>
                  
                  <Button className="w-full">
                    <BarChart className="h-4 w-4 mr-2" />
                    Generate Full AI Report
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Sales Anomaly Detection</CardTitle>
                <CardDescription>
                  AI-detected pattern changes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                    <h4 className="text-lg font-semibold">Detected Anomalies</h4>
                  </div>
                  
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md p-3 text-sm space-y-2">
                    <div className="flex items-start">
                      <AlertTriangle className="h-4 w-4 mr-2 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span>Unusual spike in antibiotic sales compared to seasonal average (32% increase)</span>
                    </div>
                    <div className="flex items-start">
                      <AlertTriangle className="h-4 w-4 mr-2 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span>Allergy medication sales dropping despite seasonal trend (27% decrease)</span>
                    </div>
                    <div className="flex items-start">
                      <AlertTriangle className="h-4 w-4 mr-2 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span>Cashier #3 processing time increased by 45 seconds per transaction</span>
                    </div>
                  </div>
                  
                  <Button className="w-full" variant="outline">
                    <History className="h-4 w-4 mr-2" />
                    View Historical Anomalies
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
