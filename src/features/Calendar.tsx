
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/features/UI/card';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/features/UI/button';
import { Badge } from '@/components/ui/badge';

const CalendarPage = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Pharmacy Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Upcoming Events</h3>
              <div className="space-y-2">
                <div className="p-3 border rounded-md">
                  <div className="flex justify-between items-center">
                    <span>Inventory Review</span>
                    <Badge>Tomorrow</Badge>
                  </div>
                </div>
                <div className="p-3 border rounded-md">
                  <div className="flex justify-between items-center">
                    <span>Staff Meeting</span>
                    <Badge variant="secondary">Next Week</Badge>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button size="sm">Add Event</Button>
                <Button variant="outline" size="sm">View All</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarPage;
