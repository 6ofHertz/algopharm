
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Barcode, 
  Calendar, 
  LayoutDashboard, 
  Search, 
  Settings,
  ArrowRight 
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const FunctionalDashboard = () => {
  const navigate = useNavigate();
  const { hasRole } = useAuth();

  const functionalities = [
    {
      icon: LayoutDashboard,
      title: "Dashboard Overview",
      description: "View sales metrics, recent transactions, and system status",
      path: "/dashboard",
      color: "bg-blue-500",
      roles: ["cashier", "pharmacist", "admin"]
    },
    {
      icon: Search,
      title: "Inventory Management",
      description: "Track medications, manage stock levels, and handle expiring products",
      path: "/inventory",
      color: "bg-green-500",
      roles: ["pharmacist", "admin"]
    },
    {
      icon: Barcode,
      title: "Point of Sale",
      description: "Process customer transactions and manage daily sales",
      path: "/pos",
      color: "bg-purple-500",
      roles: ["cashier", "pharmacist", "admin"]
    },
    {
      icon: Calendar,
      title: "Calendar & Scheduling",
      description: "Manage appointments, staff schedules, and important dates",
      path: "/calendar",
      color: "bg-orange-500",
      roles: ["pharmacist", "admin"]
    },
    {
      icon: Settings,
      title: "System Settings",
      description: "Configure user permissions, system preferences, and integrations",
      path: "/settings",
      color: "bg-gray-500",
      roles: ["admin"]
    }
  ];

  // Filter functionalities based on user role
  const availableFunctionalities = functionalities.filter(func => 
    hasRole(func.roles as any)
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Pharmacy Management
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Access your pharmacy management tools and features
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableFunctionalities.map((func, index) => (
          <Card 
            key={index} 
            className="hover:shadow-lg transition-all duration-200 cursor-pointer group"
            onClick={() => navigate(func.path)}
          >
            <CardHeader>
              <div className={`w-12 h-12 ${func.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <func.icon className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="group-hover:text-pill-600 transition-colors">
                {func.title}
              </CardTitle>
              <CardDescription>{func.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="ghost" 
                className="w-full justify-between group-hover:bg-pill-50 group-hover:text-pill-700"
              >
                Access Feature
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {availableFunctionalities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No features available for your current role. Please contact an administrator.
          </p>
        </div>
      )}
    </div>
  );
};

export default FunctionalDashboard;
