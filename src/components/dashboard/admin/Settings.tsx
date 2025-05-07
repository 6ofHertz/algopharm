
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { toast } from "sonner";

export const SystemSettings = () => {
  const [pharmacyName, setPharmacyName] = useState("APOTHEKE Pro");
  const [isUpdating, setIsUpdating] = useState(false);
  
  const updatePharmacyName = () => {
    setIsUpdating(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // In a real app, this would be a call to update the name in the database
      document.title = pharmacyName;
      
      // Update any instances of the name in localStorage for persistence
      localStorage.setItem("pharmacyName", pharmacyName);
      
      toast.success(`Pharmacy name updated to "${pharmacyName}"`);
      setIsUpdating(false);
    }, 800);
  };
  
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Pharmacy Name</label>
        <div className="flex gap-2">
          <input
            className="w-full rounded-md border border-input bg-background px-3 py-2"
            value={pharmacyName}
            onChange={(e) => setPharmacyName(e.target.value)}
          />
          <Button 
            className="shrink-0" 
            onClick={updatePharmacyName} 
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update"}
          </Button>
        </div>
      </div>
      
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
  );
};
