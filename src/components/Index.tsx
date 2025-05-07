
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Barcode, ArrowRight } from "lucide-react";

export const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4">
      <div className="text-center max-w-3xl">
        <div className="flex items-center justify-center mb-6">
          <div className="pill-gradient p-4 rounded-xl mr-3">
            <Barcode className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-extrabold text-pill-600 dark:text-pill-400 tracking-tight">
            APOTHEKE Pro
          </h1>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Advanced Pharmacy Management System
        </h2>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Streamline your pharmacy operations with our comprehensive management solution.
          From inventory tracking to prescription management, APOTHEKE Pro helps you deliver
          better patient care while optimizing your business.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            className="pill-gradient text-white hover:opacity-90 px-8 py-6 text-lg"
            onClick={() => navigate("/login")}
          >
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            className="border-pill-500 text-pill-600 hover:bg-pill-50 px-8 py-6 text-lg"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard Demo
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md card-hover">
            <h3 className="text-xl font-semibold mb-2 text-pill-600 dark:text-pill-400">Inventory Management</h3>
            <p className="text-gray-600 dark:text-gray-300">Track your stock, manage reorders, and prevent medication shortages.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md card-hover">
            <h3 className="text-xl font-semibold mb-2 text-pill-600 dark:text-pill-400">Point of Sale</h3>
            <p className="text-gray-600 dark:text-gray-300">Fast, secure checkout with insurance processing and patient records.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md card-hover">
            <h3 className="text-xl font-semibold mb-2 text-pill-600 dark:text-pill-400">Analytics & Reports</h3>
            <p className="text-gray-600 dark:text-gray-300">Gain insights from comprehensive reports and data visualizations.</p>
          </div>
        </div>
        
        <footer className="text-sm text-gray-500 dark:text-gray-400">
          <p>© 2025 APOTHEKE Pro Pharmacy Management. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
