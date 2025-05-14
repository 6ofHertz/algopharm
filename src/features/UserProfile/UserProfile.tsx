typescriptreact
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const UserProfile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>User Profile</h1>
      {user ? (
        <div>
          <p>Email: {user.email}</p>
          {/* Add other user profile information here */}
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default UserProfile;