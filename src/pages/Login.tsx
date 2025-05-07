
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Barcode, Loader2 } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 relative">
      {/* Background pharmacy name */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <h1 className="text-[120px] font-extrabold tracking-tighter">APOTHEKE PRO</h1>
      </div>
      
      <div className="mb-8 flex items-center justify-center">
        <div className="pill-gradient p-2 rounded-md mr-2">
          <Barcode className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-pill-500">APOTHEKE Pro</h1>
      </div>
      
      <p className="text-muted-foreground mb-8">Advanced Pharmacy Management System</p>

      <LoginForm />
      
      <div className="mt-6">
        <Button 
          variant="outline" 
          className="hover:bg-primary hover:text-primary-foreground"
          onClick={() => navigate("/register")}
        >
          New User? Create Account
        </Button>
      </div>
      
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>© 2025 APOTHEKE Pro Pharmacy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Login;
