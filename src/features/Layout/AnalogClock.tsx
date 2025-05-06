tsx
import React, { useState, useEffect } from 'react';
import { cn } from '../../features/lib/utils';

interface AnalogClockProps {
  username: string;
}

const AnalogClock: React.FC<AnalogClockProps> = ({ username }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourDeg = (hours + minutes / 60) * 30;
  const minuteDeg = (minutes + seconds / 60) * 6;
  const secondDeg = seconds * 6;

  return (
    <div className="clock-container">
      <div className="clock">
        <div
          className="hand hour-hand"
          style={{ transform: `rotate(${hourDeg}deg)` }}
        />
        <div
          className="hand minute-hand"
          style={{ transform: `rotate(${minuteDeg}deg)` }}
        />
        <div
          className="hand second-hand"
          style={{ transform: `rotate(${secondDeg}deg)` }}
        />
        <div className="center-dot" />
      </div>
      <div className={cn("text-muted-foreground text-xs", "mt-2")}>{username}</div>
      
    </div>
  );
};

export default AnalogClock;

const clockContainer = "relative flex flex-col items-center p-2"
const clock = "w-[150px] h-[150px] rounded-full border-[4px] border-border relative"
const hand = "absolute bottom-1/2 left-1/2 transform-origin-bottom rounded-sm"
const hourHand = "w-[6px] h-[40px] bg-primary-foreground ml-[-3px]"
const minuteHand = "w-[4px] h-[60px] bg-secondary-foreground ml-[-2px]"
const secondHand = "w-[2px] h-[70px] bg-red-500 ml-[-1px]"
const centerDot = "absolute w-[12px] h-[12px] bg-primary-foreground rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"

    .clock-container {
      @apply ${clockContainer}
    }
    .clock {
      @apply ${clock}
    }
    .hand {
      @apply ${hand}
    }
    .hour-hand {
      @apply ${hourHand}
    }
    .minute-hand {
      @apply ${minuteHand}
    }
    .second-hand {
      @apply ${secondHand}
    }
    .center-dot {
      @apply ${centerDot}
    }
  `}</style>