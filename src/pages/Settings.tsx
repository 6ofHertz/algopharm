
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/features/UI/card';

const SettingsPage = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Application Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Settings configuration will be available here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
