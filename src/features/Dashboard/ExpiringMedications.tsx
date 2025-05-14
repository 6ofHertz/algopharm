
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/features/UI/table.tsx";
import { Badge } from "@/features/UI/badge";

const expiringMeds = [
  {
    id: 1,
    name: "Amoxicillin 500mg",
    batch: "AMX2023-56",
    expiryDate: "2025-05-15",
    quantity: 120,
    daysLeft: 18,
    status: "warning"
  },
  {
    id: 2,
    name: "Lisinopril 10mg",
    batch: "LS2023-39",
    expiryDate: "2025-05-23",
    quantity: 85,
    daysLeft: 26,
    status: "warning"
  },
  {
    id: 3,
    name: "Metformin 1000mg",
    batch: "MET2023-42",
    expiryDate: "2025-05-02",
    quantity: 60,
    daysLeft: 5,
    status: "danger"
  },
  {
    id: 4,
    name: "Atorvastatin 20mg",
    batch: "AT2023-61",
    expiryDate: "2025-06-12",
    quantity: 150,
    daysLeft: 46,
    status: "success"
  },
  {
    id: 5,
    name: "Sertraline 50mg",
    batch: "SER2023-28",
    expiryDate: "2025-05-10",
    quantity: 45,
    daysLeft: 13,
    status: "warning"
  },
];

export const ExpiringMedications = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Medication</TableHead>
          <TableHead>Batch</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Expiry</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expiringMeds.map((med) => (
          <TableRow key={med.id}>
            <TableCell className="font-medium">{med.name}</TableCell>
            <TableCell>{med.batch}</TableCell>
            <TableCell>{med.quantity}</TableCell>
            <TableCell>{med.expiryDate}</TableCell>
            <TableCell>
              <Badge 
                variant="outline"
                className={`
                  ${med.status === "danger" ? "border-danger text-danger" : ""}
                  ${med.status === "warning" ? "border-warning text-warning" : ""}
                  ${med.status === "success" ? "border-success text-success" : ""}
                `}
              >
                {med.daysLeft} days left
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
