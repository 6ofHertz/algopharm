import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import SettingsComponent from '@/components/Settings';
import Settings from '@/components/Settings';

const SettingsPage = () => {
  return (
    <DashboardLayout>
      <Settings />
    </DashboardLayout>
  );
};

export default SettingsPage;