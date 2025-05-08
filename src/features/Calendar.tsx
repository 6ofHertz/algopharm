
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format, startOfToday } from "date-fns";
import { Badge } from "@/components/ui/badge";

const events = [
  {
    id: 1,
    title: "Inventory Restock",
    date: new Date(2025, 3, 28),
    type: "inventory",
    time: "10:00 AM"
  },
  {
    id: 2,
    title: "Staff Meeting",
    date: new Date(2025, 3, 29),
    type: "meeting",
    time: "2:00 PM"
  },
  {
    id: 3,
    title: "Vendor Meeting - MedSupply Co.",
    date: new Date(2025, 3, 30),
    type: "meeting",
    time: "11:30 AM"
  },
  {
    id: 4,
    title: "Pharmacy Inspection",
    date: new Date(2025, 3, 15),
    type: "important",
    time: "9:00 AM"
  },
  {
    id: 5,
    title: "Inventory Count",
    date: new Date(2025, 3, 15),
    type: "inventory",
    time: "2:00 PM"
  }
];

const CalendarPage = () => {
  const today = startOfToday();
  const [selectedDate, setSelectedDate] = useState<Date>(today);

  // Filter events for the selected date
  const selectedEvents = events.filter(
    (event) => 
      event.date.getDate() === selectedDate.getDate() &&
      event.date.getMonth() === selectedDate.getMonth() &&
      event.date.getFullYear() === selectedDate.getFullYear()
  );

  // Get dates that have events
  const eventDates = events.map(event => 
    `${event.date.getFullYear()}-${event.date.getMonth()}-${event.date.getDate()}`
  );

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
      <p className="text-muted-foreground">Manage your pharmacy schedule and events.</p>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Date Selection</CardTitle>
            <CardDescription>Select a date to view events</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-6">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => setSelectedDate(date || today)}
              className="rounded-md border shadow"
              initialFocus
            />
          </CardContent>
        </Card>
        
        <Card className="col-span-1 md:col-span-1 lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>{format(selectedDate, "MMMM d, yyyy")}</CardTitle>
                <CardDescription>
                  {selectedEvents.length === 0 
                    ? "No events scheduled" 
                    : `${selectedEvents.length} event${selectedEvents.length === 1 ? "" : "s"} scheduled`}
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Badge variant="outline" className="bg-pill-100 text-pill-700 hover:bg-pill-200">
                  Today
                </Badge>
                <Badge variant="outline" className="bg-green-100 text-green-700 hover:bg-green-200">
                  Add Event
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {selectedEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[300px] text-center">
                <p className="text-muted-foreground">No events scheduled for this date.</p>
                <p className="text-sm text-muted-foreground mt-1">Click "Add Event" to create a new event.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedEvents.map((event) => (
                  <div 
                    key={event.id} 
                    className="flex items-center p-3 rounded-lg border hover:shadow-md transition-all duration-200 hover:border-pill-300"
                  >
                    <div className={`h-4 w-4 rounded-full mr-3 
                      ${event.type === 'meeting' ? 'bg-blue-500' : 
                        event.type === 'important' ? 'bg-red-500' : 'bg-green-500'}`} 
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">{event.time}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-sm text-muted-foreground hover:text-foreground">Edit</button>
                      <button className="text-sm text-muted-foreground hover:text-destructive">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events
                .filter(event => event.date > today)
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .slice(0, 5)
                .map(event => (
                  <div key={event.id} className="flex items-center p-2 hover:bg-accent/50 rounded-md">
                    <div className={`h-3 w-3 rounded-full mr-3 
                      ${event.type === 'meeting' ? 'bg-blue-500' : 
                        event.type === 'important' ? 'bg-red-500' : 'bg-green-500'}`} 
                    />
                    <div className="flex-1">
                      <p className="font-medium">{event.title}</p>
                      <div className="flex text-xs text-muted-foreground">
                        <span>{format(event.date, "MMM d, yyyy")}</span>
                        <span className="mx-2">•</span>
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Shift Schedule</CardTitle>
            <CardDescription>Today's pharmacy coverage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-2 rounded-md bg-pill-100 text-pill-700">
                <div className="font-medium">Morning Shift (8:00 AM - 2:00 PM)</div>
                <div>3 staff members</div>
              </div>
              
              <div className="space-y-2 pl-2">
                <div className="flex justify-between text-sm">
                  <span>Dr. Sarah Johnson</span>
                  <span className="text-muted-foreground">Pharmacist</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>John Smith</span>
                  <span className="text-muted-foreground">Cashier</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Lisa Wong</span>
                  <span className="text-muted-foreground">Pharmacy Technician</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-2 rounded-md bg-green-100 text-green-700">
                <div className="font-medium">Evening Shift (2:00 PM - 8:00 PM)</div>
                <div>2 staff members</div>
              </div>
              
              <div className="space-y-2 pl-2">
                <div className="flex justify-between text-sm">
                  <span>Dr. Michael Brown</span>
                  <span className="text-muted-foreground">Pharmacist</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Emily Chen</span>
                  <span className="text-muted-foreground">Cashier</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarPage;
