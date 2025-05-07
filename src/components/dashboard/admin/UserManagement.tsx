
import React from "react";
import { Button } from "@/components/ui/button";
import { User, Users } from "lucide-react";

export const UserManagement = () => {
  return (
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
      
      <Button className="w-full mt-4">
        <Users className="h-4 w-4 mr-2" />
        Manage All Users
      </Button>
    </div>
  );
};
