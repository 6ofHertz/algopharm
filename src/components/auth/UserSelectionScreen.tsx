import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { X, User, Clock } from 'lucide-react';
import { SavedCredential, getSavedCredentials, removeCredential } from '@/lib/localStorage/savedCredentials';
import { formatDistanceToNow } from 'date-fns';

interface UserSelectionScreenProps {
  onUserSelect: (credential: SavedCredential) => void;
  onNewUser: () => void;
}

export const UserSelectionScreen: React.FC<UserSelectionScreenProps> = ({
  onUserSelect,
  onNewUser
}) => {
  const [savedUsers, setSavedUsers] = React.useState<SavedCredential[]>([]);

  React.useEffect(() => {
    setSavedUsers(getSavedCredentials());
  }, []);

  const handleRemoveUser = (e: React.MouseEvent, userId: string) => {
    e.stopPropagation();
    removeCredential(userId);
    setSavedUsers(getSavedCredentials());
  };

  const getRoleColor = (role?: string) => {
    switch (role?.toLowerCase()) {
      case 'admin': return 'bg-destructive text-destructive-foreground';
      case 'pharmacist': return 'bg-primary text-primary-foreground';
      case 'cashier': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (savedUsers.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
              <User className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle>Welcome to Apotheke</CardTitle>
            <p className="text-muted-foreground">
              Sign in to access your pharmacy management system
            </p>
          </CardHeader>
          <CardContent>
            <Button onClick={onNewUser} className="w-full">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back to Apotheke
        </h1>
        <p className="text-muted-foreground">
          Select your profile to continue
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {savedUsers.map((user) => (
          <Card 
            key={user.id}
            className="cursor-pointer hover:shadow-lg transition-all duration-200 group"
            onClick={() => onUserSelect(user)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                  onClick={(e) => handleRemoveUser(e, user.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">{user.name}</h3>
                
                {user.role && (
                  <Badge className={getRoleColor(user.role)}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Badge>
                )}
                
                <p className="text-sm text-muted-foreground">{user.email}</p>
                
                {user.employeeId && (
                  <p className="text-xs text-muted-foreground">
                    ID: {user.employeeId}
                  </p>
                )}
                
                {user.lastLogin && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDistanceToNow(new Date(user.lastLogin), { addSuffix: true })}
                  </div>
                )}
                
                {user.deviceInfo && (
                  <p className="text-xs text-muted-foreground">
                    {user.deviceInfo}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline" onClick={onNewUser}>
          Not you? Sign in with different account
        </Button>
      </div>
    </div>
  );
};