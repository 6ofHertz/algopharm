
import React from "react";
import { Button } from "@/components/ui/button";
import { User, UserPlus } from "lucide-react";

export const StaffManagement = () => {
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
