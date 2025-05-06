
import React, { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/features/UI/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/features/UI/tabs"
import { Button } from "@/features/UI/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/features/UI/table"
import {
  ArrowDownUp,
  BadgePercent,
  Banknote,
  CircleDollarSign,
  CreditCard,
  DollarSign,
  FileText,
  Loader2,
} from "lucide-react"
import { Input } from "@/features/UI/input"

export const PaymentProcessing = () => {
  const [processingPayment, setProcessingPayment] = useState(false);
  
  const simulatePaymentProcessing = () => {
    setProcessingPayment(true);
    setTimeout(() => {
      setProcessingPayment(false);
    }, 2000)
  };


  
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <span className="flex items-center">
                <CreditCard className="mr-2 h-4 w-4" />
                Card Payments
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$876.45</div>
            <p className="text-xs text-muted-foreground">60% of daily sales</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <span className="flex items-center">
                <Banknote className="mr-2 h-4 w-4" />
                Cash Payments
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$325.80</div>
            <p className="text-xs text-muted-foreground">22% of daily sales</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <span className="flex items-center">
                <BadgePercent className="mr-2 h-4 w-4" />
                Insurance Claims
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$256.50</div>
            <p className="text-xs text-muted-foreground">18% of daily sales</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Payment Gateways</CardTitle>
            <CardDescription>
              Manage integrated payment systems
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="stripe" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="stripe">Stripe</TabsTrigger>
                <TabsTrigger value="square">Square</TabsTrigger>
                <TabsTrigger value="nfc">NFC Payments</TabsTrigger>
              </TabsList>
              
              <TabsContent value="stripe" className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b">
                  <div className="flex items-center">
                    <div className="h-8 w-8 mr-2 rounded bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">S</div>
                    <div>
                      <p className="font-medium">Stripe</p>
                      <p className="text-xs text-muted-foreground">Connected Account</p>
                    </div>
                  </div>
                  <span className="text-sm px-2 py-1 rounded-full bg-green-100 text-green-800">Active</span>
                </div>
                
                <div className="grid gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Transaction Fee</span>
                    <span className="text-sm">2.9% + $0.30</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Settlement Time</span>
                    <span className="text-sm">2 Business Days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Monthly Volume</span>
                    <span className="text-sm">$15,245.67</span>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="square" className="flex items-center justify-center h-[180px]">
                <p className="text-muted-foreground">Square integration available. Click to configure.</p>
              </TabsContent>
              
              <TabsContent value="nfc" className="flex items-center justify-center h-[180px]">
                <p className="text-muted-foreground">NFC payment setup required.</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Cash Management</CardTitle>
            <CardDescription>
              Track drawer balance and cash operations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <div className="text-sm text-muted-foreground">Opening Balance</div>
                <div className="text-2xl font-bold">$200.00</div>
              </div>
              <div className="border rounded-md p-4">
                <div className="text-sm text-muted-foreground">Current Balance</div>
                <div className="text-2xl font-bold">$525.80</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium">Recent Cash Operations</div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>10:15 AM</TableCell>
                    <TableCell>
                      Sale</TableCell>
                    <TableCell className="text-right">
                      +$45.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>11:32 AM</TableCell>
                    <TableCell>
                      Sale</TableCell>
                    <TableCell className="text-right">
                      +$12.75</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>12:05 PM</TableCell>
                    <TableCell>
                      Change Given</TableCell>
                    <TableCell className="text-right">-$7.25</TableCell></TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Process Payment</CardTitle>
          <CardDescription>
            Accept payments from various sources
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Payment Method</label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  className="flex h-20 flex-col items-center"
                >
                  <CreditCard className="mb-1 h-6 w-6" />
                  <span className="text-xs">Card</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex h-20 flex-col items-center"
                >
                  <DollarSign className="mb-1 h-6 w-6" />
                  <span className="text-xs">Cash</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex h-20 flex-col items-center"
                >
                  <CircleDollarSign className="mb-1 h-6 w-6" />
                  <span className="text-xs">Insurance</span>
                </Button>
              </div>
            </div> 
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount</label>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <Input type="number" placeholder="0.00" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Split Payment</label>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="flex items-center">
                  <ArrowDownUp className="h-3.5 w-3.5 mr-1" />
                  <span>Split</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <FileText className="h-3.5 w-3.5 mr-1" />
                  <span>Receipt</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button 
            className="pill-gradient" 
            disabled={processingPayment}
            onClick={simulatePaymentProcessing}
          >
            {processingPayment ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            )
             : 
            (
              'Process Payment'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
