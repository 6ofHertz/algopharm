import React from 'react';
import Settings from '@/features/Settings';
import DashboardLayout from '@/features/Layout/DashboardLayout';

const SettingsPage = () => {
  return (
    <DashboardLayout>
      <Settings />
    </DashboardLayout>
  );
};

export default SettingsPage;