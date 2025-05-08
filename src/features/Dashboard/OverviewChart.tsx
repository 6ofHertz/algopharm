
import React from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  {
    name: "Mon",
    prescription: 2300,
    otc: 1200,
    cosmetics: 740,
  },
  {
    name: "Tue",
    prescription: 1800,
    otc: 1400,
    cosmetics: 690,
  },
  {
    name: "Wed",
    prescription: 3000,
    otc: 2400,
    cosmetics: 1100,
  },
  {
    name: "Thu",
    prescription: 2780,
    otc: 1890,
    cosmetics: 820,
  },
  {
    name: "Fri",
    prescription: 4000,
    otc: 2400,
    cosmetics: 1300,
  },
  {
    name: "Sat",
    prescription: 3500,
    otc: 1950,
    cosmetics: 1200,
  },
  {
    name: "Sun",
    prescription: 1890,
    otc: 1100,
    cosmetics: 640,
  },
];

export const OverviewChart = () => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <Tooltip 
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Date
                      </span>
                      <span className="font-bold">
                        {payload[0].payload.name}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Prescription
                      </span>
                      <span className="font-bold">${payload[0].value}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        OTC
                      </span>
                      <span className="font-bold">${payload[1].value}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Cosmetics
                      </span>
                      <span className="font-bold">${payload[2].value}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Line
          type="monotone"
          strokeWidth={2}
          dataKey="prescription"
          activeDot={{
            r: 6,
            style: { fill: "#8B5CF6", opacity: 0.25 },
          }}
          style={{
            stroke: "#8B5CF6",
          }}
        />
        <Line
          type="monotone"
          dataKey="otc"
          strokeWidth={2}
          activeDot={{
            r: 6,
            style: { fill: "#0EA5E9", opacity: 0.25 },
          }}
          style={{
            stroke: "#0EA5E9",
          }}
        />
        <Line
          type="monotone"
          dataKey="cosmetics"
          strokeWidth={2}
          activeDot={{
            r: 6,
            style: { fill: "#F97316", opacity: 0.25 },
          }}
          style={{
            stroke: "#F97316",
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
