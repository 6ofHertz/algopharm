
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState<"owner" | "pharmacist" | "cashier">("pharmacist");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate login - in a real app this would authenticate with a backend
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  // Quick login buttons for demonstration purposes
  const quickLogin = (role: "owner" | "pharmacist" | "cashier") => {
    setUserRole(role);
    setEmail(role === "owner" ? "admin@apothekepro.com" : role === "pharmacist" ? "pharma@apothekepro.com" : "cashier@apothekepro.com");
    setPassword("password123");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 relative">
      {/* Background pharmacy name */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <h1 className="text-[120px] font-extrabold tracking-tighter">Apotheke</h1>
      </div>
      
      <div className="mb-8 flex items-center justify-center">
        <div className="pill-gradient p-2 rounded-md mr-2">
          <Barcode className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-pill-500">Apotheke</h1>
      </div>
      
      <p className="text-muted-foreground mb-8">Advanced Pharmacy Management System</p>

      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>Login to Apotheke</CardTitle>
          <CardDescription>Access the pharmacy management system</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="employeeId">ID or Email</Label>
              <Input
                id="employeeId"
                placeholder="Enter employee ID or email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full pill-gradient hover:opacity-90 transition-opacity" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Login"}
            </Button>
            
            {/* Link to Registration Page */}
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <a href="/register" className="underline">
                Sign Up
              </a>
            </div>
            <div className="w-full">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Demo Accounts</span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className={userRole === "cashier" ? "border-pill-400 bg-pill-100" : ""}
                  onClick={() => quickLogin("cashier")}
                >
                  Cashier
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className={userRole === "pharmacist" ? "border-pill-400 bg-pill-100" : ""}
                  onClick={() => quickLogin("pharmacist")}
                >
                  Pharmacist
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className={userRole === "owner" ? "border-pill-400 bg-pill-100" : ""}
                  onClick={() => quickLogin("owner")}
                >
                  Owner
                </Button>
              </div>
            </div>
          </CardFooter>
        </form>
      </Card>
      
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>© 2025 Apotheke Pharmacy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Login;
