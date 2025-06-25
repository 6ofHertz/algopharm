import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/features/UI/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/features/UI/tabs';
import { Button } from '@/features/UI/button';
import { Badge } from '@/components/ui/badge';
import { SalesReport } from "@/features/Accounting/SalesReport";
import { PaymentProcessing } from "@/features/Accounting/PaymentProcessing";
import { FinancialReporting } from "@/features/Accounting/FinancialReporting";
import { InsuranceBilling } from "@/features/Accounting/InsuranceBilling";
import InventoryLedger from "@/features/Accounting/InventoryLedger";
import { AuditCompliance } from "@/features/Accounting/AuditCompliance";
import { PredictiveAccounting } from "@/features/Accounting/PredictiveAccounting";

const Accounting = () => {
  const [activeTab, setActiveTab] = useState('sales');

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Accounting</h1>
        <Badge variant="secondary">Beta</Badge>
      </div>
      
      <Tabs defaultValue={activeTab} className="w-full">
        <TabsList>
          <TabsTrigger value="sales" onClick={() => setActiveTab('sales')}>Sales Report</TabsTrigger>
          <TabsTrigger value="payment" onClick={() => setActiveTab('payment')}>Payment Processing</TabsTrigger>
          <TabsTrigger value="financial" onClick={() => setActiveTab('financial')}>Financial Reporting</TabsTrigger>
          <TabsTrigger value="insurance" onClick={() => setActiveTab('insurance')}>Insurance Billing</TabsTrigger>
          <TabsTrigger value="inventory" onClick={() => setActiveTab('inventory')}>Inventory Ledger</TabsTrigger>
          <TabsTrigger value="audit" onClick={() => setActiveTab('audit')}>Audit Compliance</TabsTrigger>
          <TabsTrigger value="predictive" onClick={() => setActiveTab('predictive')}>Predictive Accounting</TabsTrigger>
        </TabsList>
        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <CardTitle>Sales Report</CardTitle>
              <CardDescription>Overview of sales transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <SalesReport />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Processing</CardTitle>
              <CardDescription>Manage incoming and outgoing payments</CardDescription>
            </CardHeader>
            <CardContent>
              <PaymentProcessing />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="financial">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reporting</CardTitle>
              <CardDescription>Generate financial statements</CardDescription>
            </CardHeader>
            <CardContent>
              <FinancialReporting />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="insurance">
          <Card>
            <CardHeader>
              <CardTitle>Insurance Billing</CardTitle>
              <CardDescription>Process insurance claims and billing</CardDescription>
            </CardHeader>
            <CardContent>
              <InsuranceBilling />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Ledger</CardTitle>
              <CardDescription>Track inventory levels and transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <InventoryLedger />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle>Audit Compliance</CardTitle>
              <CardDescription>Ensure compliance with accounting standards</CardDescription>
            </CardHeader>
            <CardContent>
              <AuditCompliance />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="predictive">
          <Card>
            <CardHeader>
              <CardTitle>Predictive Accounting</CardTitle>
              <CardDescription>Forecast future financial performance</CardDescription>
            </CardHeader>
            <CardContent>
              <PredictiveAccounting />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Accounting;
