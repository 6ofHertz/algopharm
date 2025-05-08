
import React from "react";
import { RoleDashboard } from "@/components/dashboard/RoleDashboard";
import { FactGenerator } from "@/components/common/FactGenerator";

const Dashboard = () => {
  return (
    <>
      <FactGenerator />
      <RoleDashboard />
    </>
  );
};

export default Dashboard;
