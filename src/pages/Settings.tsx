<<<<<<< HEAD
import React from 'react';
import DashboardLayout from '@/features/Layout/DashboardLayout';
import SettingsComponent from '@/components/Settings';
import Settings from '@/components/Settings';

const SettingsPage = () => {
  return (
    <DashboardLayout>
      <Settings />
    </DashboardLayout>
  );
};

export default SettingsPage;
=======
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SystemSettings } from "@/components/dashboard/admin/Settings";
import { useAuth } from "@/contexts/AuthContext";

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Configure your pharmacy system preferences.
          </p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          {user?.role === "admin" && (
            <>
              <TabsTrigger value="system">System</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </>
          )}
          {(user?.role === "pharmacist" || user?.role === "admin") && (
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage your general application preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SystemSettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Update your profile and account preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    defaultValue={user?.name}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email Address</label>
                  <input
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    defaultValue={user?.email}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Employee ID</label>
                  <input
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    defaultValue={user?.employeeId}
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <input
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    defaultValue={user?.role}
                    disabled
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Notification settings content placeholder
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {user?.role === "admin" && (
          <>
            <TabsContent value="system" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>System Configuration</CardTitle>
                  <CardDescription>
                    Admin-only system-wide settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    These settings affect the entire pharmacy system
                  </p>
                  <SystemSettings />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="integrations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Third-Party Integrations</CardTitle>
                  <CardDescription>
                    Configure external system connections
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Integration settings content placeholder
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Configure security policies and permissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Security settings content placeholder
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </>
        )}

        {(user?.role === "pharmacist" || user?.role === "admin") && (
          <TabsContent value="inventory" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Settings</CardTitle>
                <CardDescription>
                  Configure inventory preferences and alerts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Inventory settings content placeholder
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Settings;
>>>>>>> b40d8640ec52aa5b90ff0f95e092eba5e7ce6d73
