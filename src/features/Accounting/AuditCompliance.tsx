
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/features/UI/card';
import { Button } from '@/features/UI/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/features/UI/table';
import { AlertCircle, CheckCircle, ClipboardCheck, FileCheck, LockKeyhole, SearchIcon, ShieldCheck } from 'lucide-react';
import { Input } from '@/features/UI/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/features/UI/select';
import { Badge } from '@/features/UI/badge';

export const AuditCompliance = () => {
  const [selectedAuditLog, setSelectedAuditLog] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [logType, setLogType] = useState("all");
  
  // Sample audit log data
  const auditLogs = [
    { id: "LOG001", user: "Emma Williams (Pharmacist)", action: "Void Transaction", details: "TX245782 - $126.50", timestamp: "2025-04-28 09:15:22", reason: "Customer changed mind" },
    { id: "LOG002", user: "David Rodriguez (Admin)", action: "Modify Price", details: "Lipitor 20mg - $45.99 to $42.50", timestamp: "2025-04-28 10:05:47", reason: "Price match competitor" },
    { id: "LOG003", user: "Emma Williams (Pharmacist)", action: "Override Warning", details: "Drug interaction - Warfarin/Aspirin", timestamp: "2025-04-28 11:30:12", reason: "Doctor approved" },
    { id: "LOG004", user: "Samuel Chen (Cashier)", action: "Cash Drawer Open", details: "Register #2", timestamp: "2025-04-28 12:45:32", reason: "Change needed" },
    { id: "LOG005", user: "David Rodriguez (Admin)", action: "Export Data", details: "Financial report - Q1 2025", timestamp: "2025-04-28 14:22:01", reason: "Monthly review" }
  ];
  
  const getActionBadge = (action: string) => {
    switch (action) {
      case "Void Transaction":
        return <Badge className='bg-red-100 text-red-800 hover:bg-red-100'>Void</Badge>;
      case "Modify Price":
        return <Badge className='bg-amber-100 text-amber-800 hover:bg-amber-100'>Price Change</Badge>;
      case "Override Warning":
        return <Badge className='bg-orange-100 text-orange-800 hover:bg-orange-100'>Override</Badge>;
      case "Cash Drawer Open":
        return <Badge className='bg-blue-100 text-blue-800 hover:bg-blue-100'>Drawer</Badge>;
      case "Export Data":
        return <Badge className='bg-purple-100 text-purple-800 hover:bg-purple-100'>Export</Badge>;
      default:
        return <Badge>{action}</Badge>;
    }
  };
  
  const filteredLogs = auditLogs.filter(log => {
    if (searchQuery && !log.details.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !log.user.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    if (logType !== "all" && !log.action.toLowerCase().includes(logType.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  return (
    <div className='space-y-4'>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              <span className='flex items-center'>
                <ClipboardCheck className='mr-2 h-4 w-4 text-green-600' />
                Audit Compliance
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">All documentation complete</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              <span className='flex items-center'>
                <ShieldCheck className='mr-2 h-4 w-4 text-blue-600' />
                DEA Compliance
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100%</div>
            <p className="text-xs text-muted-foreground">All controlled substances accounted for</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              <span className='flex items-center'>
                <AlertCircle className='mr-2 h-4 w-4 text-amber-500' />
                Cash Variances
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12.45</div>
            <p className="text-xs text-muted-foreground">Within acceptable range</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              <span className='flex items-center'>
                <LockKeyhole className='mr-2 h-4 w-4' />
                Security Status
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Secure</div>
            <p className="text-xs text-muted-foreground">All systems protected</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Tamper-Proof Logs</CardTitle>
          <CardDescription>
            Complete audit trail of system activities
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div className='relative flex-1'>
              <SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                type='search'
                placeholder='Search logs...'
                className='pl-8 w-full'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className='flex items-center space-x-2'>
              <Select value={logType} onValueChange={setLogType}>
                <SelectTrigger className='w-[160px]'>
                  <SelectValue placeholder='Log Type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Logs</SelectItem>
                    <SelectItem value="void">Void Transactions</SelectItem>
                    <SelectItem value="price">Price Changes</SelectItem>
                    <SelectItem value="override">Overrides</SelectItem>
                    <SelectItem value="drawer">Cash Drawer</SelectItem>
                    <SelectItem value="export">Data Exports</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              
              <Button variant='outline' size='sm'>Export</Button>
            </div>
          </div>
          
          <div className='border rounded-md'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Log ID</TableHead>
                  <TableHead >User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className='text-center py-4'>
                      No audit logs match your search criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLogs.map((log) => (
                    <TableRow 
                      key={log.id}
                      className={selectedAuditLog === log.id ? "bg-muted/50" : undefined}
                      onClick={() => setSelectedAuditLog(log.id === selectedAuditLog ? null : log.id)}
                    >
                      <TableCell className="font-medium">{log.id}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{getActionBadge(log.action)}</TableCell>
                      <TableCell>{log.details}</TableCell>
                      <TableCell>{log.timestamp}</TableCell>
                      <TableCell>{log.reason}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          {selectedAuditLog && (
            <Card >
              <CardHeader className='py-2'>
                <CardTitle className='text-sm'>Audit Log Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-sm'>
                  <p className='mb-1'>
                    <span className='font-semibold'>Log ID:</span> {auditLogs.find(log => log.id === selectedAuditLog)?.id}
                  </p>
                  <p className='mb-1'>
                    <span className='font-semibold'>Digital Signature:</span> 8f4e2c1a9b7d6e5f3c2a1b8d7e6f5c4d
                  </p>
                  <p className='mb-1'>
                    <span className="font-semibold">System Verification:</span> <span className="text-green-600 flex items-center"><CheckCircle className="h-3 w-3 mr-1" /> Verified</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
      
      <div className='grid gap-4 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>End-of-Day Reconciliation</CardTitle>
            <CardDescription>
              Cash drawer counts and deposit preparation
            </CardDescription>
          </CardHeader>
          <CardContent >
            <div className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='border rounded-md p-3 text-center'>
                  <p className="text-xs text-muted-foreground">Expected Cash</p>
                  <p className="text-xl font-bold">$1,245.75</p>
                </div>
                <div className="border rounded-md p-3 text-center">
                  <p className="text-xs text-muted-foreground">Actual Count</p>
                  <p className="text-xl font-bold">$1,233.30</p>
                </div>
              </div>

              <div className='border rounded-md p-3'>
                <div className='flex justify-between items-center'>
                  <p className='text-sm font-medium'>Variance</p>
                  <p className='text-sm font-bold text-red-500'>-$12.45</p>
                </div>
                <p className='text-xs text-muted-foreground mt-1'>Within acceptable range (±$20.00)</p>
              </div>

              <Button className='w-full' variant='outline'>
                <FileCheck className='h-4 w-4 mr-2' />
                Generate Deposit Slip
              </Button>
            </div>
          </CardContent>
        </Card >
        
        <Card>
          <CardHeader>
            <CardTitle>Prescription Change History</CardTitle>
            <CardDescription>
              Track modifications to prescriptions
            </CardDescription>
          </CardHeader>
          <CardContent >
            <div className='flex items-center justify-center h-[200px]'>
              <div className='flex flex-col items-center space-y-4'>
                <ShieldCheck className='h-16 w-16 text-muted-foreground' />
                <p className='text-muted-foreground text-center'>Prescription change history will be available in the next update.</p>
                <Button variant='outline'>Request Early Access</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
