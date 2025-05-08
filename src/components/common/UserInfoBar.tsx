
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";

export const UserInfoBar = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  return (
    <div className="fixed bottom-4 left-4 bg-muted/70 backdrop-blur-sm p-2 rounded-lg shadow-sm flex items-center gap-2 border border-border z-50">
      <div className="flex flex-col text-xs">
        <span className="font-semibold">{user.name}</span>
        <Badge variant="outline" className="px-1 py-0 text-[10px] capitalize">
          {user.role}
        </Badge>
      </div>
    </div>
  );
};
