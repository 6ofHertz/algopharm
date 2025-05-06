
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/features/UI/card";
import { Button } from "@/features/UI/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/features/UI/table";
import { AlertTriangle, CircleAlert, DollarSign, PackageCheck, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/features/UI/select";
import { Badge } from "@/features/UI/badge";

const InventoryLedger = () => {
  // Sample inventory data
  const inventoryItems = [
    { id: "INV001", name: "Lisinopril 10mg", cost: 12.50, quantity: 120, batchNo: "LIS20240305", expiry: "2026-03-05", method: "FIFO", status: "Active" },
    { id: "INV002", name: "Amoxicillin 500mg", cost: 8.75, quantity: 80, batchNo: "AMO20240210", expiry: "2025-08-10", method: "FIFO", status: "Active" },
    { id: "INV003", name: "Metformin 850mg", cost: 6.50, quantity: 150, batchNo: "MET20240412", expiry: "2026-04-12", method: "FIFO", status: "Active" },
    { id: "INV004", name: "Omeprazole 20mg", cost: 15.25, quantity: 60, batchNo: "OME20240108", expiry: "2025-07-08", method: "FIFO", status: "Active" },
    { id: "INV005", name: "Simvastatin 20mg", cost: 9.80, quantity: 90, batchNo: "SIM20240225", expiry: "2025-12-25", method: "FIFO", status: "Low Stock" }
  ];
  
  // Sample waste tracking data
  const wasteItems = [
    { id: "W001", name: "Atorvastatin 40mg", quantity: 30, reason: "Expired", date: "2025-04-20", disposalMethod: "Return to Supplier" },
    { id: "W002", name: "Insulin Glargine", quantity: 5, reason: "Damaged", date: "2025-04-22", disposalMethod: "Biohazard Waste" }
  ];
  
 return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <span className="flex items-center">
                <DollarSign className="mr-2 h-4 w-4" />
                Total Inventory Value
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$47,856.25</div>
            <p className="text-xs text-muted-foreground">5,420 units across 215 items</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <span className="flex items-center">
                <PackageCheck className="mr-2 h-4 w-4" />
                Monthly COGS
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,478.50</div>
            <p className="text-xs text-muted-foreground">Based on FIFO accounting</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <span className="flex items-center">
                <AlertTriangle className="mr-2 h-4 w-4 text-amber-500" />
                Expiring Soon
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18 items</div>
            <p className="text-xs text-muted-foreground">Within next 90 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <span className="flex items-center">
                <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                Waste This Month
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$245.80</div>
            <p className="text-xs text-muted-foreground">0.5% of inventory value</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Inventory-Ledger Sync</CardTitle>
                <CardDescription>
                  COGS and inventory valuation
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Select defaultValue="fifo">
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Accounting Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="fifo">FIFO</SelectItem>
                      <SelectItem value="lifo">LIFO</SelectItem>
                      <SelectItem value="average">Average Cost</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="sm">Export</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Unit Cost</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead>Batch No</TableHead>
                    <TableHead>Expiry</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right">${item.cost.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell>{item.batchNo}</TableCell>
                      <TableCell>{item.expiry}</TableCell>
                      <TableCell>{item.method}</TableCell>
                      <TableCell>
                        {item.status === "Active" ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                        ) : (
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Low Stock</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Waste Tracking</CardTitle>
              <CardDescription>
                Monitor expired and damaged inventory
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-md divide-y">
                {wasteItems.map((item) => (
                  <div key={item.id} className="p-3 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.quantity} units - {item.reason}
                        </p>
                      </div>
                      <CircleAlert className={`h-4 w-4 ${item.reason === "Expired" ? "text-red-500" : "text-amber-500"}`} />
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{item.date}</span>
                      <span>{item.disposalMethod}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full text-sm">
                Record New Waste
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Insurance Write-offs</CardTitle>
          <CardDescription>
            Track claims that weren't fully reimbursed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[200px]">
            <div className="flex flex-col items-center space-y-4">
              <AlertTriangle className="h-16 w-16 text-muted-foreground" />
              <p className="text-muted-foreground text-center">Insurance write-off tracking will be available in the next update.</p>
              <Button variant="outline">Request Early Access</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryLedger;
