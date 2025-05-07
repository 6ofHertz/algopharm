
import React from "react";
import { Button } from "@/components/ui/button";
import { BarChart, Download } from "lucide-react";

export const SalesReportAdmin = () => {
  return (
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
  );
};
