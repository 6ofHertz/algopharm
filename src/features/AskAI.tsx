tsx
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AskAI } from "@/components/dashboard/AskAI";

const AskAIPage = () => {
  return (
    <DashboardLayout>
      <AskAI />
    </DashboardLayout>
  );
};

export default AskAIPage;