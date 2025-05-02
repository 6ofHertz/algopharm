
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const UserInfoBar: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="fixed bottom-0 left-0 p-2 bg-background/80 backdrop-blur-sm border-t border-r rounded-tr-md z-10">
      <div className="text-sm">
        <div className="font-medium">{user?.name || "Guest"}</div>
        <div className="text-xs text-muted-foreground">{user?.role || "Not logged in"}</div>
        <div className="text-xs text-muted-foreground">{user?.id || ""}</div>
      </div>
    </div>
  );
};
