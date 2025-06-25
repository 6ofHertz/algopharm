
import { Button } from "@/features/UI/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/UI/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/features/UI/label";
import { useAuth } from "@/features/Auth/AuthContext";
import { cn } from "@/features/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login({ email, password });
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Invalid email or password");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <Card className={cn("")}>
        <CardHeader>
          <CardTitle className="text-center">Login to APOTHEKE Pro</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button type="button" variant="link" size="sm" className="text-xs  hover:text-primary">
                  Forgot password?
                </Button>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full pill-gradient hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
            
            <div className="text-center text-sm mt-6">
              <p className="text-muted-foreground">Demo logins:</p>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEmail("cashier@apothekepro.com");
                    setPassword("password123");
                  }}
                >
                  Cashier
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEmail("pharma@apothekepro.com");
                    setPassword("password123");
                  }}
                >
                  Pharmacist
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEmail("admin@apothekepro.com");
                    setPassword("password123");
                  }}
                >
                  Admin
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};
