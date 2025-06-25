
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/features/UI/card';
import { Badge } from '@/components/ui/badge';

const UserPerformance = () => {
  const performanceData = [
    { metric: 'Sales Today', value: '$1,250', trend: 'up' },
    { metric: 'Prescriptions Filled', value: '45', trend: 'up' },
    { metric: 'Customer Rating', value: '4.8/5', trend: 'stable' },
    { metric: 'Average Transaction Time', value: '3.2 min', trend: 'down' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {performanceData.map((item) => (
            <div key={item.metric} className="p-4 border rounded-md">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">{item.metric}</p>
                  <p className="text-2xl font-bold">{item.value}</p>
                </div>
                <Badge variant={item.trend === 'up' ? 'default' : item.trend === 'down' ? 'destructive' : 'secondary'}>
                  {item.trend}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserPerformance;
