
import React from "react";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";

export const StaffSchedule = () => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const staff = [
    { name: 'Dr. Sarah Johnson', role: 'Pharmacist', schedule: [1,1,1,1,0,0,0] },
    { name: 'John Doe', role: 'Cashier', schedule: [1,1,0,0,1,1,0] },
    { name: 'Emily Rodriguez', role: 'Pharmacist', schedule: [0,0,1,1,1,1,0] },
    { name: 'Michael Lee', role: 'Inventory Manager', schedule: [1,1,1,1,1,0,0] }
  ];
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Weekly Schedule</h3>
        <Button variant="outline">
          <CalendarDays className="h-4 w-4 mr-2" />
          Generate Schedule
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-2 bg-muted">Staff</th>
              {daysOfWeek.map(day => (
                <th key={day} className="text-center p-2 bg-muted">{day.substring(0, 3)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {staff.map((person, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                <td className="p-2">
                  <div>
                    <p className="font-medium">{person.name}</p>
                    <p className="text-xs text-muted-foreground">{person.role}</p>
                  </div>
                </td>
                {person.schedule.map((day, idx) => (
                  <td key={idx} className="text-center p-2">
                    {day === 1 ? (
                      <div className="h-6 w-6 rounded-full bg-green-500/20 text-green-700 flex items-center justify-center mx-auto">✓</div>
                    ) : (
                      <div className="h-6 w-6 rounded-full bg-red-500/20 text-red-700 flex items-center justify-center mx-auto">-</div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
