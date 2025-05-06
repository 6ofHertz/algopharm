
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Barcode, CreditCard, Receipt, Users, DollarSign, Package } from "lucide-react";
import { BarcodeScanner } from "../pos/BarcodeScanner";
import { useNavigate } from "react-router-dom";
import AskAI from "./AskAI";

export const CashierDashboard = () => {
  const navigate = useNavigate();
  
  const handleScan = (barcode: string) => {
    console.log("Scanned barcode:", barcode);
    // In a real app, this would look up the product and add it to cart
  };
  
  const handleSearch = (query: string) => {
    console.log("Search query:", query);
    // In a real app, this would search for products
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Cashier Dashboard</h2>
          <AskAI userRole="cashier"/></div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,284.39</div>
            <p className="text-xs text-muted-foreground">+18.1% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Today's completed transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">19</div>
            <p className="text-xs text-muted-foreground">4 new customers today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prescriptions</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Awaiting pickup</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Access frequent tasks with one click
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button 
              onClick={() => navigate("/pos")} 
              size="lg" 
              className="flex flex-col items-center justify-center h-24"
            >
              <CreditCard className="h-6 w-6 mb-2" />
              New Sale
            </Button>
            <Button 
              onClick={() => navigate("/customers")} 
              size="lg" 
              variant="outline"
              className="flex flex-col items-center justify-center h-24"
            >
              <Users className="h-6 w-6 mb-2" />
              Customer Profiles
            </Button>
            <Button 
              onClick={() => navigate("/prescriptions")} 
              size="lg" 
              variant="outline"
              className="flex flex-col items-center justify-center h-24"
            >
              <Package className="h-6 w-6 mb-2" />
              Prescription Pickup
            </Button>
            <Button 
              onClick={() => navigate("/reports")} 
              size="lg" 
              variant="outline"
              className="flex flex-col items-center justify-center h-24"
            >
              <Receipt className="h-6 w-6 mb-2" />
              Print Receipt
            </Button>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Quick Product Search</CardTitle>
            <CardDescription>
              Find products by barcode or name
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BarcodeScanner onScan={handleScan} onSearch={handleSearch} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
