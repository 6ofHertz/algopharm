
import React from "react";
import { RegisterForm } from "@/components/auth/RegisterForm";

const Register = () => {
  return (
    <div className="h-screen flex items-center justify-center p-4 bg-muted/40 relative">
      {/* Background pharmacy name */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <h1 className="text-[120px] font-extrabold tracking-tighter">APOTHEKE PRO</h1>
      </div>
      
      <div className="mb-8 flex flex-col items-center">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
