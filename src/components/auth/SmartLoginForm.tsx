import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react';
import { SavedCredential, saveCredential } from '@/lib/localStorage/savedCredentials';
import { createSession } from '@/lib/localStorage/sessionManager';
import { toast } from 'sonner';

import { useNavigate } from 'react-router-dom';
interface SmartLoginFormProps {
  prefilledCredential?: SavedCredential;
  onBack?: () => void;
}

export const SmartLoginForm: React.FC<SmartLoginFormProps> = ({
  prefilledCredential,
  onBack
}) => {
  const [email, setEmail] = useState(prefilledCredential?.email || '');
  const [password, setPassword] = useState(prefilledCredential?.password || '');
  const [rememberMe, setRememberMe] = useState(!!prefilledCredential?.password);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const { login } = useAuth();

  useEffect(() => {
    if (prefilledCredential) {
      setEmail(prefilledCredential.email);
      setPassword(prefilledCredential.password || '');
      setRememberMe(!!prefilledCredential.password);
    }
  }, [prefilledCredential]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      await login(email, password);
      
      // Create session
      createSession(email, 12); // 12 hour session
      
      // Save credentials if remember me is checked
      if (rememberMe) {
        const credentialToSave: SavedCredential = {
          id: email, // Use email as ID for now
          email,
          password: rememberMe ? password : undefined,
          name: prefilledCredential?.name || email.split('@')[0],
          role: prefilledCredential?.role,
          avatarUrl: prefilledCredential?.avatarUrl
        };
        
        saveCredential(credentialToSave, rememberMe);
      }
      
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      setErrorMsg(error.message || 'Invalid credentials');
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {onBack && (
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to user selection
        </Button>
      )}

      <Card>
        <CardHeader>
          <CardTitle>
            {prefilledCredential ? `Welcome back, ${prefilledCredential.name}` : 'Sign In'}
          </CardTitle>
          <CardDescription>
            {prefilledCredential 
              ? 'Enter your password to continue'
              : 'Enter your credentials to access the system'
            }
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
              />
              <Label htmlFor="remember" className="text-sm">
                Remember me on this device
              </Label>
            </div>

            {errorMsg && (
              <p className="text-sm text-destructive">{errorMsg}</p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};