import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useTheme } from "@/components/theme/theme-provider";
import { Badge } from "@/components/ui/badge";

const SettingsPage = () => {
  const { theme } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your pharmacy settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="pharmacy">Pharmacy</TabsTrigger>
          <TabsTrigger value="users">Users & Access</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="logs">Audit Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage your general application settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Theme</Label>
                    <p className="text-sm text-muted-foreground">
                      Select the appearance for your dashboard.
                    </p>
                  </div>
                  <ThemeToggle />
                </div>
                <p className="text-xs text-muted-foreground">
                  Current theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </p>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label className="text-base">Pharmacy Details</Label>
                <p className="text-sm text-muted-foreground">
                  Update your pharmacy information.
                </p>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="pharmacy_name" className="text-right">
                      Pharmacy Name
                    </Label>
                    <Input
                      id="pharmacy_name"
                      defaultValue="Apotheke Pharmacy"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="address" className="text-right">
                      Address
                    </Label>
                    <Input
                      id="address"
                      defaultValue="123 Medicine Street"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      defaultValue="(555) 123-4567"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      defaultValue="contact@Apotheke.com"
                      className="col-span-3"
                    />
                  </div>
                </div>
                
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Feature Settings</CardTitle>
              <CardDescription>
                Enable or disable optional features.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Fact Generator</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable the health fact generator feature.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Shift Achievements</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable employee achievements and rewards.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Offline Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable functionality when internet connection is lost.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pharmacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pharmacy Settings</CardTitle>
              <CardDescription>
                Configure specific pharmacy-related settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                These settings affect how medications are displayed and transactions are processed.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Expiry Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify when medications are nearing expiration.
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="expiry_days" className="text-right">
                      Days:
                    </Label>
                    <Input
                      id="expiry_days"
                      type="number"
                      defaultValue="30"
                      className="w-16"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Default Tax Rate</Label>
                    <p className="text-sm text-muted-foreground">
                      Set the default tax rate for transactions.
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="tax_rate"
                      type="number"
                      defaultValue="8"
                      className="w-16"
                    />
                    <span>%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Auto-calculate Change</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically calculate change amount.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <Button className="mt-6">Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage employee access and permissions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4 bg-card hover:shadow-md transition-all duration-200 hover:border-pill-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Administrator</h4>
                      <p className="text-sm text-muted-foreground">Full system access and control</p>
                    </div>
                    <Badge>2 Users</Badge>
                  </div>
                  <div className="mt-2 text-sm">
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>Access to all system features</li>
                      <li>Can add/remove users and set permissions</li>
                      <li>Full financial and reporting access</li>
                      <li>Can modify system settings</li>
                      <li>Track pharmacist and cashier activities</li>
                      <li>View audit logs and sales records</li>
                    </ul>
                  </div>
                </div>
                
                <div className="border rounded-md p-4 bg-card hover:shadow-md transition-all duration-200 hover:border-pill-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Pharmacist</h4>
                      <p className="text-sm text-muted-foreground">Medication management and overrides</p>
                    </div>
                    <Badge>3 Users</Badge>
                  </div>
                  <div className="mt-2 text-sm">
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>Full medication management</li>
                      <li>Can override medication interactions</li>
                      <li>Limited financial reporting</li>
                      <li>Cannot modify system settings</li>
                      <li>Clock in/out tracking</li>
                      <li>Personal sales history available</li>
                    </ul>
                  </div>
                </div>
                
                <div className="border rounded-md p-4 bg-card hover:shadow-md transition-all duration-200 hover:border-pill-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Cashier</h4>
                      <p className="text-sm text-muted-foreground">Basic sales operations only</p>
                    </div>
                    <Badge>5 Users</Badge>
                  </div>
                  <div className="mt-2 text-sm">
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>Process sales transactions</li>
                      <li>Limited inventory browsing</li>
                      <li>No financial reporting access</li>
                      <li>No system modifications</li>
                      <li>Clock in/out tracking</li>
                      <li>Personal sales history available</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <Button className="mt-6">Manage Users</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>User Activity Tracking</CardTitle>
              <CardDescription>
                Monitor employee login times and sales performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Recent Login Activity</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium">Jane Doe (Pharmacist)</span>
                      <span className="text-muted-foreground">Today, 9:15 AM - Present</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium">John Smith (Cashier)</span>
                      <span className="text-muted-foreground">Today, 8:30 AM - Present</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium">Emily Chen (Cashier)</span>
                      <span className="text-muted-foreground">Yesterday, 9:00 AM - 5:30 PM</span>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Sales Performance (This Week)</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium">Jane Doe (Pharmacist)</span>
                      <span className="text-muted-foreground">$3,245.75 (42 transactions)</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium">John Smith (Cashier)</span>
                      <span className="text-muted-foreground">$2,841.30 (37 transactions)</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium">Emily Chen (Cashier)</span>
                      <span className="text-muted-foreground">$3,105.50 (45 transactions)</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="mt-6">View Detailed Reports</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when you receive alerts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Inventory Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about low inventory levels.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Prescription Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Send reminders for prescription refills.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Staff Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts about staff activities.
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Sales Reports</Label>
                    <p className="text-sm text-muted-foreground">
                      Get daily sales summary reports.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <Button className="mt-6">Update Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Audit Logs</CardTitle>
              <CardDescription>
                Track system activities and changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1">
                    <Input placeholder="Search logs..." />
                  </div>
                  <Button variant="outline">Filter</Button>
                  <Button variant="outline">Export</Button>
                </div>
                
                <div className="border rounded-md">
                  <div className="p-3 border-b flex text-sm font-medium text-muted-foreground">
                    <div className="w-32">Time</div>
                    <div className="w-32">User</div>
                    <div className="w-40">Action</div>
                    <div className="flex-1">Details</div>
                  </div>
                  
                  <div className="p-3 border-b flex text-sm hover:bg-accent/50">
                    <div className="w-32 text-muted-foreground">Today, 10:23 AM</div>
                    <div className="w-32">Admin</div>
                    <div className="w-40">User Created</div>
                    <div className="flex-1">Created new cashier account: "Michael Johnson"</div>
                  </div>
                  
                  <div className="p-3 border-b flex text-sm hover:bg-accent/50">
                    <div className="w-32 text-muted-foreground">Today, 09:45 AM</div>
                    <div className="w-32">Jane Doe</div>
                    <div className="w-40">Prescription Override</div>
                    <div className="flex-1">Override on medication interaction: Lisinopril + Potassium</div>
                  </div>
                  
                  <div className="p-3 border-b flex text-sm hover:bg-accent/50">
                    <div className="w-32 text-muted-foreground">Today, 09:30 AM</div>
                    <div className="w-32">System</div>
                    <div className="w-40">Inventory Alert</div>
                    <div className="flex-1">Low stock for item: Amoxicillin 500mg (5 units remaining)</div>
                  </div>
                  
                  <div className="p-3 border-b flex text-sm hover:bg-accent/50">
                    <div className="w-32 text-muted-foreground">Yesterday, 04:15 PM</div>
                    <div className="w-32">Admin</div>
                    <div className="w-40">Settings Changed</div>
                    <div className="flex-1">Updated tax rate from 7.5% to 8%</div>
                  </div>
                  
                  <div className="p-3 border-b flex text-sm hover:bg-accent/50">
                    <div className="w-32 text-muted-foreground">Yesterday, 03:20 PM</div>
                    <div className="w-32">John Smith</div>
                    <div className="w-40">Refund Processed</div>
                    <div className="flex-1">Refund of $45.99 for transaction #7842</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">Showing 5 of 235 logs</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm">Next</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
