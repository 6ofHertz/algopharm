
import React from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export const LeaveManagement = () => {
  return (
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
  );
};
