
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Search, 
  AlertTriangle, 
  Users, 
  Package, 
  Clock, 
  ArrowRight,
  BarChart,
  Shield
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { InteractionAlert } from "@/components/pos/InteractionAlert";

export const PharmacistDashboard = () => {
  const navigate = useNavigate();
  const [showInteractionDemo, setShowInteractionDemo] = React.useState(false);
  
  const dummyInteractions = [
    "Lipitor (atorvastatin) may interact with Amiodarone causing increased risk of myopathy",
    "Warfarin efficacy may be reduced by concurrent use of Pantoprazole"
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Pharmacist Dashboard</h2>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Prescriptions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Refill Requests</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Pending verification</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">3</div>
            <p className="text-xs text-muted-foreground">Medications low in stock</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 md:col-span-1 lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Access frequent tasks with one click
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button 
              onClick={() => navigate("/prescriptions/new")} 
              size="sm"
              className="w-full justify-start"
            >
              <FileText className="h-4 w-4 mr-2" />
              New Prescription
            </Button>
            <Button 
              onClick={() => navigate("/patient-history")} 
              size="sm"
              variant="outline"
              className="w-full justify-start"
            >
              <Users className="h-4 w-4 mr-2" />
              Patient History
            </Button>
            <Button 
              onClick={() => navigate("/inventory")} 
              size="sm"
              variant="outline"
              className="w-full justify-start"
            >
              <Package className="h-4 w-4 mr-2" />
              Inventory Management
            </Button>
            <Button 
              onClick={() => setShowInteractionDemo(true)} 
              size="sm"
              variant="outline"
              className="w-full justify-start"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Drug Interaction Check
            </Button>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 md:col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Expiring Medications</CardTitle>
            <CardDescription>
              Items expiring in the next 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Metformin 1000mg</p>
                  <p className="text-sm text-muted-foreground">Batch: MET202402</p>
                </div>
                <Badge variant="outline" className="text-warning border-warning">
                  5 days left
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Sertraline 50mg</p>
                  <p className="text-sm text-muted-foreground">Batch: SER202401</p>
                </div>
                <Badge variant="outline" className="text-warning border-warning">
                  13 days left
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Amoxicillin 500mg</p>
                  <p className="text-sm text-muted-foreground">Batch: AMX202402</p>
                </div>
                <Badge variant="outline" className="text-warning border-warning">
                  23 days left
                </Badge>
              </div>
              
              <Button 
                onClick={() => navigate("/inventory?filter=expiring")} 
                variant="ghost" 
                className="w-full mt-4 flex items-center justify-end"
                size="sm"
              >
                View all expiring items
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Advanced Search</CardTitle>
              <CardDescription>
                Search by therapeutic class, manufacturer, and more
              </CardDescription>
            </div>
            <Search className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full" variant="outline">
                Drug Database Search
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="secondary" size="sm">By Class</Button>
                <Button variant="secondary" size="sm">By Manufacturer</Button>
                <Button variant="secondary" size="sm">By NDC</Button>
                <Button variant="secondary" size="sm">By Interactions</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Clinical Tools</CardTitle>
              <CardDescription>
                Pharmaceutical reference tools and calculators
              </CardDescription>
            </div>
            <Shield className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline">Dose Calculator</Button>
                <Button variant="outline">Drug Interactions</Button>
                <Button variant="outline">IV Compatibility</Button>
                <Button variant="outline">Renal Adjustments</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {showInteractionDemo && (
        <InteractionAlert
          interactions={dummyInteractions}
          onContinue={() => setShowInteractionDemo(false)}
          onCancel={() => setShowInteractionDemo(false)}
        />
      )}
    </div>
  );
};
