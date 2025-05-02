
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type FactCategory = "health" | "medicine" | "science" | "history" | "joke";

const facts: Record<FactCategory, string[]> = {
  health: [
    "Walking for just 30 minutes a day can reduce your risk of heart disease by up to 30%.",
    "Laughing 100 times is equivalent to 15 minutes of exercise on a stationary bike.",
    "Your body has enough iron in it to make a 3-inch nail.",
    "The human brain uses about 20% of the body's total energy.",
    "The acid in your stomach is strong enough to dissolve zinc."
  ],
  medicine: [
    "The world's first antibiotic, penicillin, was discovered by accident in 1928.",
    "Aspirin was first isolated from willow bark and has been used for over 2,000 years.",
    "The FDA approves approximately 30 new drugs each year.",
    "The most expensive drug in the world costs over $2 million per treatment.",
    "About 30% of prescribed antibiotics are unnecessary."
  ],
  science: [
    "There are more possible iterations of a game of chess than there are atoms in the observable universe.",
    "If you could fold a piece of paper 42 times, it would reach the moon.",
    "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old.",
    "A day on Venus is longer than a year on Venus.",
    "Bananas are slightly radioactive due to their potassium content."
  ],
  history: [
    "The shortest war in history was between Britain and Zanzibar in 1896. It lasted just 38 minutes.",
    "Ancient Egyptians used to use honey as medicine.",
    "The first pharmacy opened in Baghdad in 754 CE.",
    "The mortar and pestle has been used by pharmacists for over 6,000 years.",
    "The prescription symbol Rx comes from the Latin word 'recipe' meaning 'take'."
  ],
  joke: [
    "Why don't scientists trust atoms? Because they make up everything!",
    "I told my doctor that I broke my arm in two places. He told me to stop going to those places.",
    "Why did the pharmacist take sleeping pills? To rest in peace!",
    "What do you call a pharmacy open 24/7? Round-the-clock medicine!",
    "Patient: Doctor, I have a pain in my eye whenever I drink coffee. Doctor: Try taking the spoon out of the cup."
  ]
};

export const FactGenerator: React.FC = () => {
  const [currentFact, setCurrentFact] = useState<string>("");
  const [category, setCategory] = useState<FactCategory>("health");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const timeoutRef = useRef<number | null>(null);

  const generateFact = () => {
    const categoryFacts = facts[category];
    const randomIndex = Math.floor(Math.random() * categoryFacts.length);
    setCurrentFact(categoryFacts[randomIndex]);
    
    // Show the fact card
    setIsVisible(true);
    
    // Set timeout to hide the fact card after 3.5 seconds
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = window.setTimeout(() => {
      setIsVisible(false);
    }, 3500);
  };

  useEffect(() => {
    generateFact();
    
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [category]);

  return (
    <div className="fixed top-16 right-6 z-50">
      <Button 
        variant="outline" 
        onClick={generateFact} 
        className="flex items-center bg-background/80 backdrop-blur-sm hover:bg-background"
        size="sm"
      >
        <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
        <span>Did You Know?</span>
      </Button>
      
      {isVisible && currentFact && (
        <Card className="absolute right-0 mt-2 w-80 animate-fade-in">
          <CardContent className="pt-3 text-sm">
            <div className="flex gap-2 mb-2 flex-wrap">
              {(["health", "medicine", "science", "history", "joke"] as FactCategory[]).map((cat) => (
                <Button 
                  key={cat} 
                  variant={category === cat ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setCategory(cat)}
                  className="text-xs py-0 h-6"
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Button>
              ))}
            </div>
            {currentFact}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
