
import React, { useState, useEffect } from 'react';

export const AnalogClock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const secondDegrees = (time.getSeconds() / 60) * 360;
  const minuteDegrees = ((time.getMinutes() + time.getSeconds() / 60) / 60) * 360;
  const hourDegrees = ((time.getHours() % 12 + time.getMinutes() / 60) / 12) * 360;
  
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 rounded-full border-4 border-muted-foreground/20 relative">
        {/* Hour hand */}
        <div
          className="absolute w-1 h-4 bg-foreground rounded-full top-1/2 left-1/2 transform -translate-x-1/2 origin-bottom"
          style={{ transform: `translateX(-50%) rotate(${hourDegrees}deg)` }}
        />
        {/* Minute hand */}
        <div
          className="absolute w-0.5 h-5 bg-foreground rounded-full top-1/2 left-1/2 transform -translate-x-1/2 origin-bottom"
          style={{ transform: `translateX(-50%) rotate(${minuteDegrees}deg)` }}
        />
        {/* Second hand */}
        <div
          className="absolute w-0.5 h-6 bg-red-500 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 origin-bottom"
          style={{ transform: `translateX(-50%) rotate(${secondDegrees}deg)` }}
        />
        {/* Center dot */}
        <div className="absolute w-1.5 h-1.5 bg-foreground rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
};
