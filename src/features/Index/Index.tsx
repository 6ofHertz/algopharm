
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/features/UI/card";
import { Button } from "@/features/UI/button";
import { Badge } from "@/components/ui/badge";
import { Barcode, Calendar, LayoutDashboard, Search, Settings } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: LayoutDashboard,
      title: "Dashboard",
      description: "Comprehensive pharmacy management overview",
      color: "bg-blue-500"
    },
    {
      icon: Search,
      title: "Inventory",
      description: "Track medications and supplies",
      color: "bg-green-500"
    },
    {
      icon: Barcode,
      title: "Point of Sale",
      description: "Process customer transactions",
      color: "bg-purple-500"
    },
    {
      icon: Calendar,
      title: "Calendar",
      description: "Schedule and appointments",
      color: "bg-orange-500"
    },
    {
      icon: Settings,
      title: "Settings",
      description: "Configure system preferences",
      color: "bg-gray-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pill-50 to-pill-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="pill-gradient p-3 rounded-lg mr-4">
              <Barcode className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-pill-600 dark:text-pill-400">
              APOTHEKE Pro
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Professional pharmacy management system designed for modern healthcare operations
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="pill-gradient hover:opacity-90"
              onClick={() => navigate('/login')}
            >
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            Beta Version
          </Badge>
          <p className="text-gray-500 dark:text-gray-400">
            © 2024 APOTHEKE Pro. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
