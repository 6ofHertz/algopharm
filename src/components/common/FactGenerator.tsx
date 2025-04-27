
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

type FactCategory = "health" | "science" | "history" | "jokes";

export const FactGenerator = () => {
  const { toast } = useToast();
  const [factType, setFactType] = useState<FactCategory>("health");

  const facts = {
    health: [
      "Regular exercise can help reduce the risk of heart disease by up to 35%.",
      "Drinking enough water can help prevent kidney stones.",
      "Eating dark chocolate in moderation may reduce the risk of heart disease.",
      "Laughter can boost your immune system and decrease stress hormones.",
      "Just 30 minutes of daily physical activity can add years to your life."
    ],
    science: [
      "Aspirin was first derived from willow bark in 1897, though the medicinal properties of willow bark have been known for thousands of years.",
      "Penicillin, the first antibiotic, was discovered accidentally when mold contaminated a petri dish in Alexander Fleming's lab.",
      "The human body contains enough iron to make a 3-inch nail.",
      "More bacteria live in your mouth than there are people on Earth.",
      "About 60% of the human body is water."
    ],
    history: [
      "The world's oldest pharmacy still in operation is in Florence, Italy. It opened in 1221 and was originally run by Dominican friars.",
      "Ancient Egyptians used honey as a common ingredient in medicine over 5,000 years ago.",
      "The mortar and pestle used by pharmacists has been a symbol of pharmacy since the 1600s.",
      "The first drugstore in America was opened in Philadelphia in 1729.",
      "The caduceus symbol (staff with two snakes and wings) commonly associated with medicine today was actually a symbol of commerce in ancient times."
    ],
    jokes: [
      "Why don't scientists trust atoms? Because they make up everything!",
      "I told my doctor that I broke my arm in two places. He told me to stop going to those places.",
      "Why did the pharmacist fall into the pill crushing machine? He had too many problems to deal with.",
      "What do you call a physician who fixes websites? A URL-ologist.",
      "Patient: Doctor, I have a serious memory problem. I can't remember anything! Doctor: How long have you had this problem? Patient: What problem?"
    ]
  };

  const generateFact = (category: FactCategory) => {
    const randomFact = facts[category][Math.floor(Math.random() * facts[category].length)];
    
    toast({
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} Fact`,
      description: randomFact,
      duration: 5000,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-pill-100 text-pill-700 border-pill-300">
          /fact
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Generate a Random Fact</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => generateFact("health")}>
          /fact health
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => generateFact("science")}>
          /fact science
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => generateFact("history")}>
          /fact history
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => generateFact("jokes")}>
          /fact jokes
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
