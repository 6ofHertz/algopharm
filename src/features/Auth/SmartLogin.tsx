import React, { useState } from 'react';
import { UserSelectionScreen } from '@/components/auth/UserSelectionScreen';
import { SmartLoginForm } from '@/components/auth/SmartLoginForm';
import { SavedCredential } from '@/lib/localStorage/savedCredentials';

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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full">
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