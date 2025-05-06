
import React, { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SalesReport } from '@/components/accounting/SalesReport';
import { PaymentProcessing } from '@/components/accounting/PaymentProcessing';
import { FinancialReporting } from '@/components/accounting/FinancialReporting';
import { InsuranceBilling } from '@/components/accounting/InsuranceBilling';
import { InventoryLedger } from "@/components/accounting/InventoryLedger";
import { AuditCompliance } from "@/components/accounting/AuditCompliance";
import { PredictiveAccounting } from "@/components/accounting/PredictiveAccounting";
import { Calculator, CreditCard, FileBarChart, FileText, Shield, TrendingUp, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


interface Sale {
  id: string;
  date: string;
  total: number;
}

interface Invoice {
  id: string;
  date: string;
  client: string;
  total: number;
}

interface Payslip {
  id: string;
  date: string;
  user: string;
}

const Accounting = () => {
  const [currentDate] = useState(new Date());
  const formattedDate = new Intl.DateTimeFormat('en-US', {

  const mockSales: Sale[] = useMemo(() => [
    { id: 'sale-1', date: '2024-03-15', total: 150 },
    { id: 'sale-2', date: '2024-03-16', total: 200 },
    { id: 'sale-3', date: '2024-03-17', total: 180 },
  ], []);

  const mockInvoices: Invoice[] = useMemo(() => [
    { id: 'invoice-1', date: '2024-03-15', client: 'Client A', total: 500 },
    { id: 'invoice-2', date: '2024-03-16', client: 'Client B', total: 300 },
    { id: 'invoice-3', date: '2024-03-17', client: 'Client C', total: 700 },
  ], []);

  const mockPayslips: Payslip[] = useMemo(() => [
    { id: 'payslip-1', date: '2024-03-15', user: 'User X' },
    { id: 'payslip-2', date: '2024-03-16', user: 'User Y' },
    { id: 'payslip-3', date: '2024-03-17', user: 'User Z' },
  ], []);

  const renderSales = () => mockSales.map((sale) => (
    <TableRow key={sale.id}>
      <TableCell>{sale.date}</TableCell>
      <TableCell>${sale.total}</TableCell>
      <TableCell><Button variant="outline">View</Button></TableCell>
    </TableRow>
  ));
  const renderInvoices = () => mockInvoices.map((invoice) => (
    <TableRow key={invoice.id}>
      <TableCell>{invoice.date}</TableCell>
      <TableCell>{invoice.client}</TableCell>
      <TableCell>${invoice.total}</TableCell>
      <TableCell><Button variant="outline">View</Button></TableCell>
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(currentDate);

  return (
    <motion.div className="flex flex-col items-center space-y-4 p-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.5 }}>
      <div className="w-full max-w-5xl">
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

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Card>
            <CardHeader>
              <CardTitle>Accounting Book</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {renderSales()}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {renderInvoices()}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payslips</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPayslips.map((payslip) => (
                    <TableRow key={payslip.id}>
                      <TableCell>{payslip.date}</TableCell>
                      <TableCell>{payslip.user}</TableCell>
                      <TableCell><Button variant="outline">View</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card> </motion.div>


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
    </motion.div>  );
};

export default Accounting;
