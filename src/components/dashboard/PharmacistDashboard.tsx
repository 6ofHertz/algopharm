import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, 
  Calendar, 
  FileText, 
  Flask, 
  LayoutGrid, 
  PenTool, 
  Search, 
  UserCheck
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ExpiringMedications } from "./ExpiringMedications";
import { OverviewChart } from "./OverviewChart";
import { FactGenerator } from "@/components/common/FactGenerator";

export const PharmacistDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Pharmacist Dashboard</h2>
        <FactGenerator />
      </div>
      
      {/* Alert Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-amber-500 dark:border-amber-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Expiring Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-amber-500 mr-2" />
              <div>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Items expiring in 30 days</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-red-500 dark:border-red-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-500 mr-2" />
              <div>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Items below reorder level</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-blue-500 dark:border-blue-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Prescriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-500 mr-2" />
              <div>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">Pending for verification</p>
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
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Distribution of Medication Types</CardTitle>
                <CardDescription>
                  Current inventory by category
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[280px]">
                <OverviewChart />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Expiring Medications</CardTitle>
                <CardDescription>
                  Items expiring in the next 30 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ExpiringMedications />
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common pharmacist tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button 
                  className="flex flex-col h-24 py-2" 
                  variant="outline"
                  onClick={() => navigate("/inventory")}
                >
                  <Search className="h-5 w-5 mb-2" />
                  <span>Advanced Search</span>
                </Button>
                <Button className="flex flex-col h-24 py-2" variant="outline">
                  <PenTool className="h-5 w-5 mb-2" />
                  <span>New Prescription</span>
                </Button>
                <Button className="flex flex-col h-24 py-2" variant="outline">
                  <FileText className="h-5 w-5 mb-2" />
                  <span>Drug Interactions</span>
                </Button>
                <Button className="flex flex-col h-24 py-2" variant="outline">
                  <Calendar className="h-5 w-5 mb-2" />
                  <span>Schedule</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="prescriptions">
          <Card>
            <CardHeader>
              <CardTitle>Prescription Management</CardTitle>
              <CardDescription>
                Process and verify prescriptions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Pending Prescriptions</h3>
                  <Button variant="outline" size="sm">
                    <PenTool className="h-4 w-4 mr-2" />
                    New Prescription
                  </Button>
                </div>
                
                <div className="bg-muted rounded-md p-4 space-y-2">
                  <div className="flex justify-between items-center p-2 bg-card rounded-md">
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-xs text-muted-foreground">Amoxicillin 500mg • 30 capsules • 3x daily</p>
                    </div>
                    <Button size="sm">Review</Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 bg-card rounded-md">
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-xs text-muted-foreground">Metformin 1000mg • 60 tablets • 2x daily</p>
                    </div>
                    <Button size="sm">Review</Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 bg-card rounded-md">
                    <div>
                      <p className="font-medium">Robert Williams</p>
                      <p className="text-xs text-muted-foreground">Lisinopril 10mg • 30 tablets • 1x daily</p>
                    </div>
                    <Button size="sm">Review</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Management</CardTitle>
              <CardDescription>
                Stock control and ordering
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="flex flex-col h-24 py-2" variant="outline">
                    <LayoutGrid className="h-5 w-5 mb-2" />
                    <span>View All Inventory</span>
                  </Button>
                  <Button className="flex flex-col h-24 py-2" variant="outline">
                    <AlertTriangle className="h-5 w-5 mb-2" />
                    <span>Check Expirations</span>
                  </Button>
                  <Button className="flex flex-col h-24 py-2" variant="outline">
                    <PenTool className="h-5 w-5 mb-2" />
                    <span>Create Order</span>
                  </Button>
                </div>
                
                <div className="bg-muted rounded-md p-4">
                  <h3 className="font-semibold mb-2">Recent Stock Updates</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>Added: Paracetamol 500mg (200 tablets)</span>
                      <span className="text-muted-foreground">Today, 10:23 AM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Updated: Amoxicillin 250mg (Stock: 120)</span>
                      <span className="text-muted-foreground">Yesterday, 4:15 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Updated: Ibuprofen 400mg (Stock: 85)</span>
                      <span className="text-muted-foreground">Yesterday, 2:30 PM</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="patients">
          <Card>
            <CardHeader>
              <CardTitle>Patient Management</CardTitle>
              <CardDescription>
                View and manage patient records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                      placeholder="Search patients..."
                      className="pl-8 pr-4 py-2 w-full rounded-md border border-input bg-background"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <UserCheck className="h-4 w-4 mr-2" />
                    New Patient
                  </Button>
                </div>
                
                <div className="bg-muted rounded-md p-4 space-y-2">
                  <div className="flex justify-between items-center p-2 bg-card rounded-md">
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-xs text-muted-foreground">DOB: 15/05/1985 • Patient ID: P-10045</p>
                    </div>
                    <Button variant="outline" size="sm">View History</Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 bg-card rounded-md">
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-xs text-muted-foreground">DOB: 22/11/1992 • Patient ID: P-10086</p>
                    </div>
                    <Button variant="outline" size="sm">View History</Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 bg-card rounded-md">
                    <div>
                      <p className="font-medium">Robert Williams</p>
                      <p className="text-xs text-muted-foreground">DOB: 03/07/1978 • Patient ID: P-10123</p>
                    </div>
                    <Button variant="outline" size="sm">View History</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
