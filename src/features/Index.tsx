import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const pharmacyName = "My Pharmacy";

const HomePage: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-200">
      <Card className="w-full max-w-md p-8 rounded-lg shadow-lg">
        <CardHeader className="flex flex-col items-center justify-center space-y-2">
          <CardTitle className="text-3xl font-bold text-blue-900 text-center">
            {pharmacyName}
          </CardTitle>
          <CardDescription className="text-gray-600 text-center">
            Welcome to our pharmacy management system.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-gray-700">
            We are here to make your life easier.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
