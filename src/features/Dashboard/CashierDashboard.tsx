
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Calendar, DollarSign, Package, Receipt,
  CreditCard, 
  Printer, AlertTriangle,
  Search, 
  ShoppingCart, 
 Users,
  Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AskAI from "./AskAI";
import { useAuth } from "@/contexts/AuthContext"; // Import useAuth
import { RecentSales } from "./RecentSales";
import { TopSellingItems } from "./TopSellingItems";
import { ShiftTracker } from "./cashier/ShiftTracker";
import { AccountingFeatures } from "./cashier/AccountingFeatures";
import { UserInfoBar } from "../common/UserInfoBar";

export const CashierDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get the current user
  const [isClockedIn, setIsClockedIn] = useState(false);
  
  // Initialize isClockedIn status from local storage on component mount
  useEffect(() => {
    if (user) {
      const timeEntriesString = localStorage.getItem('timeEntries');
      const timeEntries = timeEntriesString ? JSON.parse(timeEntriesString) : [];
      const lastEntry = timeEntries.filter(entry => entry.userId === user.id).pop();
      // Check if there's a last entry and it hasn't been clocked out yet
      if (lastEntry && !lastEntry.clockOutTime) {
        setIsClockedIn(true);
      } else {
        setIsClockedIn(false);
      }
    }
  }, [user]);

  const handleClockInOut = () => {
    if (user) {
            const timeEntriesString = localStorage.getItem('timeEntries');
            const timeEntries = timeEntriesString ? JSON.parse(timeEntriesString) : [];

            if (!isClockedIn) {
              const newEntry = { userId: user.id, clockInTime: Date.now() };
              timeEntries.push(newEntry);
              localStorage.setItem('timeEntries', JSON.stringify(timeEntries));
              setIsClockedIn(true);
            } else {
                    // Find the last clock-in entry for the current user that hasn't been clocked out
                    const lastEntryIndex = timeEntries.findIndex(
                      (entry: any) => entry.userId === user.id && !entry.clockOutTime
                    );
                    if (lastEntryIndex !== -1) {
                      // Add clock-out time to the found entry
                      timeEntries[lastEntryIndex].clockOutTime = Date.now();
                      localStorage.setItem('timeEntries', JSON.stringify(timeEntries));
                      setIsClockedIn(false);
                    }
            }
          }
          }>
          <Button onClick={handleClockInOut} className="absolute top-0 right-0 mt-4 mr-4"
          variant={isClockedIn ? "destructive" : "default"}
          >
          {isClockedIn ? "Clock Out" : "Clock In"}
          </Button>
        </>)}<div className="flex items-center justify-between">
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
      
      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <ShiftTracker />
        
        <Card className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => navigate("/pos")}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">New Sale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ShoppingCart className="h-8 w-8 text-primary mr-2" />
              <div>
                <div className="text-2xl font-bold">POS</div>
                <p className="text-xs text-muted-foreground">Process a new transaction</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Customer Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-8 w-8 text-primary mr-2" />
              <div>
                <div className="text-2xl font-bold">Profiles</div>
                <p className="text-xs text-muted-foreground">Manage customer information</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Daily Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BarChart className="h-8 w-8 text-primary mr-2" />

              <div>
                <div className="text-2xl font-bold">$1,245</div>
                <p className="text-xs text-muted-foreground">18 transactions today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Dashboard Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="accounting">Accounting</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                  Latest sales transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Items</CardTitle>
                <CardDescription>
                  Most popular items today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TopSellingItems />
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common cashier tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="flex flex-col h-24 py-2" variant="outline">
                  <Search className="h-5 w-5 mb-2" />
                  <span>Search Products</span>
                </Button>
                <Button className="flex flex-col h-24 py-2" variant="outline">
                  <Printer className="h-5 w-5 mb-2" />
                  <span>Print Receipt</span>
                </Button>
                <Button className="flex flex-col h-24 py-2" variant="outline">
                  <CreditCard className="h-5 w-5 mb-2" />
                  <span>Refund</span>
                </Button>
                <Button className="flex flex-col h-24 py-2" variant="outline">
                  <Calendar className="h-5 w-5 mb-2" />
                  <span>Check Schedule</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="prescriptions">
          <Card>
            <CardHeader>
              <CardTitle>Prescription Pickup Verification</CardTitle>
              <CardDescription>
                Verify and process prescription pickups
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted rounded-md p-4">
                  <p className="text-muted-foreground text-sm">
                    No pending prescription pickups at this time.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Process payments through different methods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <Button className="flex flex-col h-24 py-2" variant="outline">
                  <CreditCard className="h-5 w-5 mb-2" />
                  <span>Card Payment</span>
                </Button>
                <Button className="flex flex-col h-24 py-2" variant="outline">
                  <svg className="h-5 w-5 mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0a12 12 0 100 24 12 12 0 000-24zm0 22a10 10 0 110-20 10 10 0 010 20zm5-10a5 5 0 11-10 0 5 5 0 0110 0z" />
                  </svg>
                  <span>M-PESA</span>
                </Button>
                <Button className="flex flex-col h-24 py-2" variant="outline">
                  <svg className="h-5 w-5 mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" />
                    <path fill="white" d="M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span>Cash</span>
                </Button>
                <Button className="flex flex-col h-24 py-2" variant="outline">
                  <svg className="h-5 w-5 mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z" />
                    <path d="M7 12h10v2H7z" />
                    <path d="M10 8h4v8h-4z" />
                  </svg>
                  <span>Insurance</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="accounting">
          <AccountingFeatures />
        </TabsContent>
      </Tabs>
      
      <UserInfoBar />
    </div>
  );
};
