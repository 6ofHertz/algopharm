import React from 'react';
import DashboardLayout from '@/features/layout/DashboardLayout';
import SettingsComponent from '@/features/Dashboard/Settings';

const SettingsPage = () => {
  return (
    <DashboardLayout>
      <SettingsComponent />
    </DashboardLayout>
  );
};

export default SettingsPage;