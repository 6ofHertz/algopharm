
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, CheckCircle2, FileWarning, RefreshCw, ShieldAlert, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export const InsuranceBilling = () => {
  // Sample insurance claims data
  const claims = [
    { id: "CLM-5678", patient: "James Wilson", insurer: "BlueCross", amount: 124.75, submitted: "2025-04-27", status: "Approved", notes: "" },
    { id: "CLM-5679", patient: "Maria Garcia", insurer: "Medicare", amount: 86.50, submitted: "2025-04-27", status: "Pending", notes: "" },
    { id: "CLM-5680", patient: "Robert Chen", insurer: "Aetna", amount: 215.20, submitted: "2025-04-26", status: "Rejected", notes: "Missing NDC code" },
    { id: "CLM-5681", patient: "Emily Johnson", insurer: "Cigna", amount: 156.40, submitted: "2025-04-26", status: "Approved", notes: "" },
    { id: "CLM-5682", patient: "David Martinez", insurer: "UnitedHealth", amount: 78.90, submitted: "2025-04-25", status: "Pending", notes: "" }
  ];
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case "Rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <span className="flex items-center">
                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                Approved Claims
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">$5,698.45 total</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <span className="flex items-center">
                <RefreshCw className="mr-2 h-4 w-4 text-yellow-500" />
                Pending Claims
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">$2,345.75 total</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <span className="flex items-center">
                <XCircle className="mr-2 h-4 w-4 text-red-500" />
                Rejected Claims
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">$876.30 total</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <span className="flex items-center">
                <AlertTriangle className="mr-2 h-4 w-4 text-amber-500" />
                Avg. Reimbursement Time
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14.3 days</div>
            <p className="text-xs text-muted-foreground">-2.5 days from last month</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <div className="col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Insurance Claims</CardTitle>
              <CardDescription>
                Track status of submitted claims
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Claim ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Insurer</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {claims.map((claim) => (
                    <TableRow key={claim.id}>
                      <TableCell className="font-medium">{claim.id}</TableCell>
                      <TableCell>{claim.patient}</TableCell>
                      <TableCell>{claim.insurer}</TableCell>
                      <TableCell className="text-right">${claim.amount.toFixed(2)}</TableCell>
                      <TableCell>{claim.submitted}</TableCell>
                      <TableCell>{getStatusBadge(claim.status)}</TableCell>
                      <TableCell>{claim.notes}</TableCell>
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
              <CardTitle>Adjudication Stats</CardTitle>
              <CardDescription>
                Insurance reimbursement analytics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>BlueCross</span>
                  <span>12.5 days avg.</span>
                </div>
                <Progress value={78} className="h-2" />
                <p className="text-xs text-muted-foreground">78% approval rate</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Medicare</span>
                  <span>16.8 days avg.</span>
                </div>
                <Progress value={92} className="h-2" />
                <p className="text-xs text-muted-foreground">92% approval rate</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Aetna</span>
                  <span>9.3 days avg.</span>
                </div>
                <Progress value={85} className="h-2" />
                <p className="text-xs text-muted-foreground">85% approval rate</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>UnitedHealth</span>
                  <span>14.1 days avg.</span>
                </div>
                <Progress value={80} className="h-2" />
                <p className="text-xs text-muted-foreground">80% approval rate</p>
              </div>
              
              <div className="border-t pt-4">
                <Button className="w-full" variant="outline">
                  <FileWarning className="h-4 w-4 mr-2" />
                  View Denial Patterns
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Patient Responsibility</CardTitle>
          <CardDescription>
            Track patient copays and deductibles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[200px]">
            <div className="flex flex-col items-center space-y-4">
              <ShieldAlert className="h-16 w-16 text-muted-foreground" />
              <p className="text-muted-foreground text-center">Patient responsibility tracking will be available in the next update.</p>
              <Button variant="outline">Request Early Access</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
