
import React from "react";
import { Button } from "@/components/ui/button";
import { Package, Download } from "lucide-react";

export const InventoryReport = () => {
  return (
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
  );
};
