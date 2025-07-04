import React, { useState } from 'react';
import { UserSelectionScreen } from '@/components/auth/UserSelectionScreen';
import { SmartLoginForm } from '@/components/auth/SmartLoginForm';
import { SavedCredential } from '@/lib/localStorage/savedCredentials';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import pharmacyBg from '@/assets/pharmacy-pos-bg.jpg';

export const SmartLogin: React.FC = () => {
  const [currentView, setCurrentView] = useState<'selection' | 'login'>('selection');
  const [selectedCredential, setSelectedCredential] = useState<SavedCredential | undefined>();

  const handleUserSelect = (credential: SavedCredential) => {
    setSelectedCredential(credential);
    setCurrentView('login');
  };

  const handleNewUser = () => {
    setSelectedCredential(undefined);
    setCurrentView('login');
  };

  const handleBack = () => {
    setSelectedCredential(undefined);
    setCurrentView('selection');
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${pharmacyBg})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {currentView === 'selection' ? (
          <UserSelectionScreen
            onUserSelect={handleUserSelect}
            onNewUser={handleNewUser}
          />
        ) : (
          <SmartLoginForm
            prefilledCredential={selectedCredential}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
};

export default SmartLogin;