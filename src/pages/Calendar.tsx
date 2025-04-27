
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { format, isToday, isSameDay } from "date-fns";

// Example appointments data
const appointments = [
  {
    id: 1,
    title: "Medication Refill - John D.",
    date: new Date(2025, 3, 28, 9, 0),
    type: "refill",
  },
  {
    id: 2,
    title: "Consultation - Martha S.",
    date: new Date(2025, 3, 28, 11, 30),
    type: "consultation",
  },
  {
    id: 3,
    title: "Inventory Check",
    date: new Date(2025, 3, 29, 14, 0),
    type: "inventory",
  },
  {
    id: 4,
    title: "Vaccination - Robert L.",
    date: new Date(2025, 4, 2, 10, 0),
    type: "vaccination",
  },
  {
    id: 5,
    title: "Staff Meeting",
    date: new Date(2025, 4, 5, 9, 30),
    type: "meeting",
  },
];

// Helper function to get badge color based on appointment type
const getAppointmentColor = (type: string) => {
  switch (type) {
    case "refill":
      return "bg-blue-500 hover:bg-blue-600";
    case "consultation":
      return "bg-green-500 hover:bg-green-600";
    case "inventory":
      return "bg-amber-500 hover:bg-amber-600";
    case "vaccination":
      return "bg-purple-500 hover:bg-purple-600";
    case "meeting":
      return "bg-red-500 hover:bg-red-600";
    default:
      return "bg-gray-500 hover:bg-gray-600";
  }
};

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Filter appointments for the selected day
  const appointmentsForSelectedDay = appointments.filter((appointment) => 
    selectedDate && isSameDay(appointment.date, selectedDate)
  );

  // Function to render date cells with appointments indicator
  const renderDayContent = (day: Date) => {
    const appointmentsOnThisDay = appointments.filter(app => isSameDay(app.date, day));
    
    if (appointmentsOnThisDay.length > 0) {
      return (
        <div className="relative h-full w-full p-2">
          {day.getDate()}
          <span className="absolute bottom-1 right-1 flex h-1.5 w-1.5 rounded-full bg-pill-500" />
        </div>
      );
    }
    
    return day.getDate();
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Pharmacy Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
              renderDay={(day) => renderDayContent(day)}
              initialFocus
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
              {isToday(selectedDate) && (
                <Badge className="ml-2 bg-pill-500">Today</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {appointmentsForSelectedDay.length > 0 ? (
              <div className="space-y-4">
                {appointmentsForSelectedDay.map((appointment) => (
                  <div 
                    key={appointment.id} 
                    className="p-3 rounded-md border bg-muted/50"
                  >
                    <div className="flex items-center justify-between">
                      <Badge className={`${getAppointmentColor(appointment.type)} text-white`}>
                        {appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1)}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {format(appointment.date, "h:mm a")}
                      </span>
                    </div>
                    <p className="font-medium mt-2">{appointment.title}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No appointments scheduled for this day
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarPage;
