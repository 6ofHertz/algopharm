import React from 'react';
import { User } from 'lucide-react'; // Assuming lucide-react for an icon

interface AvatarProps {
  // Define any props your Avatar component will eventually need
  src?: string;
  alt?: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, className }) => {
  // A basic implementation with fallback
  return (
    <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}>
      {src ? (
        <img className="aspect-square h-full w-full" src={src} alt={alt} />
      ) : (
        // Fallback initial or icon
        <span className="flex h-full w-full items-center justify-center bg-muted"><User className="h-5 w-5" /></span>
      )}
    </div>
  );
};

export { Avatar };