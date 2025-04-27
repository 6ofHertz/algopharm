
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
                      defaultValue="PillPulse Pharmacy"
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
                      defaultValue="contact@pillpulse.com"
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
                <div className="border rounded-md p-4">
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
                    </ul>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
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
                    </ul>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
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
                    </ul>
                  </div>
                </div>
              </div>
              
              <Button className="mt-6">Manage Users</Button>
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
      </Tabs>
    </div>
  );
};

export default SettingsPage;
