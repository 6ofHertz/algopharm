
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SalesReport } from "@/components/accounting/SalesReport";
import { PaymentProcessing } from "@/components/accounting/PaymentProcessing";
import { FinancialReporting } from "@/components/accounting/FinancialReporting";
import { InsuranceBilling } from "@/components/accounting/InsuranceBilling";
import { InventoryLedger } from "@/components/accounting/InventoryLedger";
import { AuditCompliance } from "@/components/accounting/AuditCompliance";
import { PredictiveAccounting } from "@/components/accounting/PredictiveAccounting";
import { Calculator, CreditCard, FileBarChart, FileText, Shield, TrendingUp, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

const Accounting = () => {
  const [currentDate] = useState(new Date());
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(currentDate);

  return (
    <div className="flex-1 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Accounting</h2>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="text-sm">
            End of Day Report
          </Button>
          <Button className="pill-gradient text-sm">
            Close Register
          </Button>
        </div>
      </div>
      
      <p className="text-muted-foreground">{formattedDate}</p>
      
      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList className="grid grid-cols-7 md:grid-cols-7 lg:grid-cols-7">
          <TabsTrigger value="sales" className="flex flex-col items-center py-2 px-4">
            <Calculator className="h-4 w-4 mb-1" />
            <span className="text-xs">Sales</span>
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex flex-col items-center py-2 px-4">
            <CreditCard className="h-4 w-4 mb-1" />
            <span className="text-xs">Payments</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex flex-col items-center py-2 px-4">
            <FileBarChart className="h-4 w-4 mb-1" />
            <span className="text-xs">Reports</span>
          </TabsTrigger>
          <TabsTrigger value="insurance" className="flex flex-col items-center py-2 px-4">
            <Shield className="h-4 w-4 mb-1" />
            <span className="text-xs">Insurance</span>
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex flex-col items-center py-2 px-4">
            <Wallet className="h-4 w-4 mb-1" />
            <span className="text-xs">Inventory</span>
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex flex-col items-center py-2 px-4">
            <FileText className="h-4 w-4 mb-1" />
            <span className="text-xs">Audit</span>
          </TabsTrigger>
          <TabsTrigger value="predictive" className="flex flex-col items-center py-2 px-4">
            <TrendingUp className="h-4 w-4 mb-1" />
            <span className="text-xs">Predictive</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales">
          <SalesReport />
        </TabsContent>
        
        <TabsContent value="payments">
          <PaymentProcessing />
        </TabsContent>
        
        <TabsContent value="reports">
          <FinancialReporting />
        </TabsContent>
        
        <TabsContent value="insurance">
          <InsuranceBilling />
        </TabsContent>
        
        <TabsContent value="inventory">
          <InventoryLedger />
        </TabsContent>
        
        <TabsContent value="audit">
          <AuditCompliance />
        </TabsContent>
        
        <TabsContent value="predictive">
          <PredictiveAccounting />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Accounting;
