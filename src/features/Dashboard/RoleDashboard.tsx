
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { CashierDashboard } from "./CashierDashboard";
import { PharmacistDashboard } from "./PharmacistDashboard";
import { AdminDashboard } from "./AdminDashboard";
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const RoleDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-center">Access Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">You need to log in to access the dashboard.</p>
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => navigate("/login")}>
              Log In
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  if (!user) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }
  switch (user.role) {
    case "cashier":
      return <CashierDashboard />;
    case "pharmacist":
      return <PharmacistDashboard />;
    case "admin":
      return <AdminDashboard />;
    default:
      return (
        <div className="flex items-center justify-center h-[80vh]">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle className="text-center">Unknown Role</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p>Your account doesn't have a recognized role.</p>
              <p className="text-muted-foreground mt-2">Please contact an administrator.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => navigate("/")}>
                Back to Home
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
  }
};
