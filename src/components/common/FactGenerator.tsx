
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import { toast } from "sonner";

export const FactGenerator = () => {
  const [fact, setFact] = useState("");
  const [showFact, setShowFact] = useState(false);
  
  const facts = [
    "Taking medication with grapefruit juice can increase the absorption of certain drugs, potentially leading to overdose.",
    "The average pharmacy dispenses over 200 prescriptions daily.",
    "The mortar and pestle is one of the oldest pharmacy symbols, dating back to 1600 BCE.",
    "Aspirin was originally derived from willow bark.",
    "The 'Rx' symbol comes from the Latin word 'recipe', meaning 'take thou'.",
    "Penicillin, the first antibiotic, was discovered accidentally by Alexander Fleming in 1928.",
    "The global pharmaceutical market is worth over $1.2 trillion.",
    "Insulin was first isolated for diabetes treatment in 1921.",
    "Pharmacists are consistently ranked among the most trusted professionals.",
    "The WHO estimates that 10% of medications sold globally are counterfeit.",
    "The oldest pharmacy still in operation opened in 1685 in Dubrovnik, Croatia.",
    "An average pharmacy inventory contains approximately 4,000 unique items.",
    "Poison control centers handle over 2 million calls annually in the US alone."
  ];
  
  const generateFact = () => {
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    setFact(randomFact);
    setShowFact(true);
    
    // Hide fact after 3.5 seconds
    setTimeout(() => {
      setShowFact(false);
    }, 3500);
  };
  
  return (
    <div className="fixed top-4 right-4 z-50">
      <Button 
        onClick={generateFact} 
        size="sm" 
        variant="outline" 
        className="pill-gradient text-white flex gap-2 items-center hover:opacity-90"
      >
        <Lightbulb className="h-4 w-4" />
        Did You Know?
      </Button>
      
      {showFact && (
        <div 
          className="absolute top-12 right-0 w-64 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-border animate-fade-in"
          onAnimationEnd={() => !showFact && setFact("")}
        >
          <p className="text-sm">{fact}</p>
        </div>
      )}
    </div>
  );
};
