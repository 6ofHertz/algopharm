
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, FileText, Package, Receipt, Download } from "lucide-react";

export const AccountingFeatures: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Accounting Operations</CardTitle>
        <CardDescription>Manage invoices, purchases and payments</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Invoice Management */}
        <div className="space-y-3">
          <h3 className="font-medium text-sm">Invoice Management</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button variant="outline" className="justify-start">
              <Receipt className="h-4 w-4 mr-2" />
              Create New Invoice
            </Button>
            <Button variant="outline" className="justify-start">
              <FileText className="h-4 w-4 mr-2" />
              View Invoices
            </Button>
            <Button variant="outline" className="justify-start">
              <CreditCard className="h-4 w-4 mr-2" />
              Process Payments
            </Button>
          </div>
        </div>
        
        {/* Purchase Orders */}
        <div className="space-y-3">
          <h3 className="font-medium text-sm">Purchase Orders</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button variant="outline" className="justify-start">
              <FileText className="h-4 w-4 mr-2" />
              Create Purchase Order
            </Button>
            <Button variant="outline" className="justify-start">
              <Package className="h-4 w-4 mr-2" />
              Receive Goods
            </Button>
            <Button variant="outline" className="justify-start">
              <CreditCard className="h-4 w-4 mr-2" />
              Supplier Payments
            </Button>
          </div>
        </div>
        
        {/* Reports */}
        <div className="space-y-3">
          <h3 className="font-medium text-sm">Financial Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button variant="outline" className="justify-start">
              <FileText className="h-4 w-4 mr-2" />
              Daily Sales Report
            </Button>
            <Button variant="outline" className="justify-start">
              <Receipt className="h-4 w-4 mr-2" />
              Invoice Summary
            </Button>
            <Button variant="outline" className="justify-start">
              <Download className="h-4 w-4 mr-2" />
              Export Reports
            </Button>
          </div>
        </div>
        
        {/* Payslip Management */}
        <div className="space-y-3">
          <h3 className="font-medium text-sm">Payslip Management</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button variant="outline" className="justify-start">
              <FileText className="h-4 w-4 mr-2" />
              My Payslips
            </Button>
            <Button variant="outline" className="justify-start">
              <Download className="h-4 w-4 mr-2" />
              Download Latest Payslip
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
