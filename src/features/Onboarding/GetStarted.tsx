
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Barcode, 
  Users, 
  Package, 
  BarChart3, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Home
} from "lucide-react";

const GetStarted = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to APOTHEKE Pro",
      description: "Your complete pharmacy management solution",
      icon: Barcode,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            APOTHEKE Pro is designed to streamline your pharmacy operations, from inventory management 
            to point-of-sale transactions. Let's get you started with the essential setup steps.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">What you'll learn:</h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Setting up your inventory</li>
              <li>• Adding staff members</li>
              <li>• Starting sales tracking</li>
              <li>• Using the dashboard</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Set Up Your Inventory",
      description: "Add products and manage stock levels",
      icon: Package,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            Start by adding your medications and products to the inventory system.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-2 border-dashed border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-green-700">Quick Add</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">Scan barcodes or manually enter product details</p>
                <div className="space-y-2 text-xs text-gray-500">
                  <div>• Product name</div>
                  <div>• Price and stock quantity</div>
                  <div>• Expiration dates</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-dashed border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-blue-700">Bulk Import</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">Upload CSV files for large inventories</p>
                <div className="space-y-2 text-xs text-gray-500">
                  <div>• CSV template download</div>
                  <div>• Bulk upload validation</div>
                  <div>• Error reporting</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      title: "Add Staff Members",
      description: "Set up user accounts and permissions",
      icon: Users,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            Create accounts for your team members with appropriate role-based permissions.
          </p>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Badge variant="outline" className="mr-3 bg-red-100 text-red-700">Admin</Badge>
              <div>
                <div className="font-medium">Full system access</div>
                <div className="text-sm text-gray-500">Manage users, settings, reports</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Badge variant="outline" className="mr-3 bg-blue-100 text-blue-700">Pharmacist</Badge>
              <div>
                <div className="font-medium">Inventory & prescription access</div>
                <div className="text-sm text-gray-500">Manage inventory, process prescriptions</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Badge variant="outline" className="mr-3 bg-green-100 text-green-700">Cashier</Badge>
              <div>
                <div className="font-medium">Point of sale access</div>
                <div className="text-sm text-gray-500">Process transactions, basic reports</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Start Tracking Sales",
      description: "Begin processing transactions and generating reports",
      icon: BarChart3,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            With your inventory and staff set up, you're ready to start processing sales and tracking performance.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Barcode className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                <h4 className="font-semibold mb-1">POS System</h4>
                <p className="text-sm text-gray-600">Scan products and process payments</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <BarChart3 className="h-8 w-8 mx-auto text-green-600 mb-2" />
                <h4 className="font-semibold mb-1">Real-time Reports</h4>
                <p className="text-sm text-gray-600">Track sales and inventory changes</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <CheckCircle className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                <h4 className="font-semibold mb-1">Compliance</h4>
                <p className="text-sm text-gray-600">Maintain regulatory compliance</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pill-50 to-pill-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="flex items-center"
          >
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center">
            <div className="pill-gradient p-2 rounded-md mr-2">
              <Barcode className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-pill-600 dark:text-pill-400">
              APOTHEKE Pro
            </h1>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((_, index) => (
            <div key={index} className="flex items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStep 
                    ? 'bg-pill-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index < currentStep ? <CheckCircle className="h-4 w-4" /> : index + 1}
              </div>
              {index < steps.length - 1 && (
                <div 
                  className={`w-16 h-1 mx-2 ${
                    index < currentStep ? 'bg-pill-500' : 'bg-gray-200'
                  }`} 
                />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="pill-gradient p-3 rounded-lg">
                  <currentStepData.icon className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl">{currentStepData.title}</CardTitle>
              <CardDescription className="text-lg">{currentStepData.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {currentStepData.content}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            {currentStep === steps.length - 1 ? (
              <Button 
                className="pill-gradient hover:opacity-90 flex items-center"
                onClick={() => navigate('/login')}
              >
                Start Using APOTHEKE Pro
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={nextStep}
                className="pill-gradient hover:opacity-90 flex items-center"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
