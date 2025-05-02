
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, PieChart, AlertTriangle, History } from "lucide-react";

export const AIAnalytics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <PieChart className="h-5 w-5 mr-2 text-primary" />
              <h4 className="text-lg font-semibold">Business Insights</h4>
            </div>
            
            <div className="bg-muted rounded-md p-3 text-sm space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Daily Sales Pattern:</span>
                <span>Peak hours between 11am-2pm</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Most Profitable Category:</span>
                <span>OTC Pain Relievers (32% margin)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Recommended Stock:</span>
                <span>Increase Vitamin D by 15%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Customer Trend:</span>
                <span>Increasing demand for organic options</span>
              </div>
            </div>
            
            <Button className="w-full">
              <BarChart className="h-4 w-4 mr-2" />
              Generate Full AI Report
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
              <h4 className="text-lg font-semibold">Detected Anomalies</h4>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md p-3 text-sm space-y-2">
              <div className="flex items-start">
                <AlertTriangle className="h-4 w-4 mr-2 text-amber-500 mt-0.5 flex-shrink-0" />
                <span>Unusual spike in antibiotic sales compared to seasonal average (32% increase)</span>
              </div>
              <div className="flex items-start">
                <AlertTriangle className="h-4 w-4 mr-2 text-amber-500 mt-0.5 flex-shrink-0" />
                <span>Allergy medication sales dropping despite seasonal trend (27% decrease)</span>
              </div>
              <div className="flex items-start">
                <AlertTriangle className="h-4 w-4 mr-2 text-amber-500 mt-0.5 flex-shrink-0" />
                <span>Cashier #3 processing time increased by 45 seconds per transaction</span>
              </div>
            </div>
            
            <Button className="w-full" variant="outline">
              <History className="h-4 w-4 mr-2" />
              <span>View Historical Anomalies</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
