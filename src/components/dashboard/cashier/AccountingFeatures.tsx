
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, FileText, Package, Receipt, Download, Wallet, Calendar, PieChart } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";

export const AccountingFeatures: React.FC = () => {
  const handleActionClick = (action: string) => {
    toast.info(`${action} functionality will be implemented soon.`);
  };
  
  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Daily Accounting Operations</CardTitle>
          <CardDescription>Manage daily financial tasks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Invoice Management */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm flex items-center">
              <Receipt className="h-4 w-4 mr-2 text-blue-500" />
              Invoice Management
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-2">
                    <span className="sr-only">Info</span>
                    ?
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium">About Invoice Management</h4>
                    <p className="text-sm">Create and manage customer invoices, process payments, and track due amounts.</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start">
                    <Receipt className="h-4 w-4 mr-2" />
                    Create New Invoice
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-medium">New Invoice</h4>
                    <p className="text-sm">Create a new invoice for a customer purchase or service.</p>
                    <div className="grid grid-cols-2 gap-2">
                      <Button size="sm" onClick={() => handleActionClick("Create Invoice")}>Customer Purchase</Button>
                      <Button size="sm" variant="outline" onClick={() => handleActionClick("Create Service Invoice")}>Service Invoice</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <Button variant="outline" className="justify-start" onClick={() => handleActionClick("View Invoices")}>
                <FileText className="h-4 w-4 mr-2" />
                View Invoices
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => handleActionClick("Process Payments")}>
                <CreditCard className="h-4 w-4 mr-2" />
                Process Payments
              </Button>
            </div>
          </div>
          
          {/* Purchase Orders */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm flex items-center">
              <Package className="h-4 w-4 mr-2 text-green-500" />
              Purchase Orders
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-2">
                    <span className="sr-only">Info</span>
                    ?
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium">About Purchase Orders</h4>
                    <p className="text-sm">Create purchase orders for suppliers, receive goods, and manage supplier payments.</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button variant="outline" className="justify-start" onClick={() => handleActionClick("Create Purchase Order")}>
                <FileText className="h-4 w-4 mr-2" />
                Create Purchase Order
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => handleActionClick("Receive Goods")}>
                <Package className="h-4 w-4 mr-2" />
                Receive Goods
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => handleActionClick("Supplier Payments")}>
                <CreditCard className="h-4 w-4 mr-2" />
                Supplier Payments
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Financial Reports & Payroll</CardTitle>
          <CardDescription>Generate reports and manage payroll</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Reports */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm flex items-center">
              <PieChart className="h-4 w-4 mr-2 text-purple-500" />
              Financial Reports
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button variant="outline" className="justify-start" onClick={() => handleActionClick("Daily Sales Report")}>
                <FileText className="h-4 w-4 mr-2" />
                Daily Sales Report
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => handleActionClick("Invoice Summary")}>
                <Receipt className="h-4 w-4 mr-2" />
                Invoice Summary
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => handleActionClick("Export Reports")}>
                <Download className="h-4 w-4 mr-2" />
                Export Reports
              </Button>
            </div>
          </div>
          
          {/* Payslip Management */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm flex items-center">
              <Wallet className="h-4 w-4 mr-2 text-amber-500" />
              Payroll & Payslips
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-2">
                    <span className="sr-only">Info</span>
                    ?
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium">About Payroll</h4>
                    <p className="text-sm">View and download your payslips, track your hours, and manage your pay information.</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button variant="outline" className="justify-start" onClick={() => handleActionClick("View My Payslips")}>
                <FileText className="h-4 w-4 mr-2" />
                My Payslips
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => handleActionClick("Download Latest Payslip")}>
                <Download className="h-4 w-4 mr-2" />
                Download Latest Payslip
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => handleActionClick("View Pay Calendar")}>
                <Calendar className="h-4 w-4 mr-2" />
                Pay Calendar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
