
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Upload, History } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const SystemMaintenance = () => {
  return (
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
  );
};
