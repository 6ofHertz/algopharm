
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Lightbulb, ChevronLeft, ChevronRight, X } from "lucide-react";

export const FactGenerator = () => {
  const [fact, setFact] = useState("");
  const [showFact, setShowFact] = useState(true);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  
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
  
  useEffect(() => {
    setFact(facts[currentFactIndex]);
  }, [currentFactIndex]);

  const nextFact = () => {
    const nextIndex = (currentFactIndex + 1) % facts.length;
    setCurrentFactIndex(nextIndex);
  };
  
  const previousFact = () => {
    const prevIndex = (currentFactIndex - 1 + facts.length) % facts.length;
    setCurrentFactIndex(prevIndex);
  };

  const closeBanner = () => {
    setShowFact(false);
  };
  
  if (!showFact) return null;
  
  return (
    <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-b border-border p-3">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-3 flex-1">
          <div className="pill-gradient p-2 rounded-full">
            <Lightbulb className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1">
            <span className="text-sm font-medium text-muted-foreground">Did You Know?</span>
            <p className="text-sm text-foreground">{fact}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={previousFact}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={nextFact}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={closeBanner}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
