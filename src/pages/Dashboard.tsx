
import React from "react";
import { RoleDashboard } from "@/components/dashboard/RoleDashboard";
import { Toaster } from "sonner";

const Dashboard = () => {
  return (
    <>
      <Toaster position="top-right" />
      <RoleDashboard />
    </>
  );
};

export default Dashboard;
