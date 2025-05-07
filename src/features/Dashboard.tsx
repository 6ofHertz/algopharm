
import React from "react";
import { RoleDashboard } from "@/components/dashboard/RoleDashboard";
import { Toaster } from "sonner";
import { FactGenerator } from "@/components/common/FactGenerator";

const Dashboard = () => {
  return (
    <>
      <Toaster position="top-right" />
      <FactGenerator />
      <RoleDashboard />
    </>
  );
};

export default Dashboard;
