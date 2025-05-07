import React, { useState, useEffect } from 'react';
import { cn } from '../../features/lib/utils';

interface AnalogClockProps {
  username: string;
}

const AnalogClock: React.FC<AnalogClockProps> = ({ username }) => {
  const [time, setTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState('00:00:00');
  const [loginStartTime, setLoginStartTime] = useState<number | null>(null);

  useEffect(() => {
    const loginTime = localStorage.getItem('loginTime');
    if (loginTime) {
      setLoginStartTime(parseInt(loginTime, 10));
    } else {
      // If no login time, set current time as start for initial display (won't persist)
      setLoginStartTime(Date.now());
    }
  }, []);

const getElapsedTime = (startTime: number): string => {
  const now = Date.now();
  const elapsedMilliseconds = now - startTime;
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

  const hours = Math.floor(elapsedSeconds / 3600);
  const minutes = Math.floor((elapsedSeconds % 3600) / 60);
  const seconds = elapsedSeconds % 60;

  const formatUnit = (unit: number) => unit.toString().padStart(2, '0');

  return `${formatUnit(hours)}:${formatUnit(minutes)}:${formatUnit(seconds)}`;
};

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
      if (loginStartTime) {
        setElapsedTime(getElapsedTime(loginStartTime));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [loginStartTime]); // Depend on loginStartTime

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourDeg = (hours + minutes / 60) * 30;
  const minuteDeg = (minutes + seconds / 60) * 6;
  const secondDeg = seconds * 6;

  // Initial update of elapsed time if loginStartTime is available
  useEffect(() => {
    if (loginStartTime) {
      setElapsedTime(getElapsedTime(loginStartTime));
    };
  }, []);

  return (
    <div className="clock-container">
      <div className="clock">
        <div className={cn(hand, hourHand)} style={{ transform: `rotate(${hourDeg}deg)` }} />
        <div className={cn(hand, minuteHand)} style={{ transform: `rotate(${minuteDeg}deg)` }} />
        <div className={cn(hand, secondHand)} style={{ transform: `rotate(${secondDeg}deg)` }} />
        <div className={centerDot} />
      </div>
      <div className={cn("text-muted-foreground text-xs text-center", "mt-2")}>
        {username}
        <br />
        {elapsedTime}
      </div>
    </div>
  );
};

export default AnalogClock;
const clockContainer = "relative flex flex-col items-center p-2";
const clock = "w-[150px] h-[150px] rounded-full border-[4px] border-border relative";
const hand = "absolute bottom-1/2 left-1/2 transform-origin-bottom rounded-sm";
const hourHand = "w-[6px] h-[40px] bg-primary-foreground ml-[-3px]";
const minuteHand = "w-[4px] h-[60px] bg-secondary-foreground ml-[-2px]";
const secondHand = "w-[2px] h-[70px] bg-red-500 ml-[-1px]";
const centerDot =
  "absolute w-[12px] h-[12px] bg-primary-foreground rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";