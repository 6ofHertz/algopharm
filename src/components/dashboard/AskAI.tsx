
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface AIResponse {
  text: string;
  type: "text" | "chart" | "table";
  data?: any;
}

export const AskAI = () => {
  const [query, setQuery] = useState("");
  const [responses, setResponses] = useState<AIResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    // Add user query to responses
    const userQuery = query;
    setResponses([...responses, { text: userQuery, type: "text" }]);
    
    setLoading(true);
    
    // Simulate API call to AI service
    setTimeout(() => {
      let aiResponse: AIResponse;
      
      // Simple rule-based responses for demo purposes
      if (userQuery.toLowerCase().includes("top 5 selling")) {
        aiResponse = {
          text: "Here are the top 5 selling medications this month:\n\n1. Amoxicillin 500mg - 453 units ($4,532.50)\n2. Lipitor 20mg - 367 units ($7,340.00)\n3. Metformin 1000mg - 312 units ($2,184.00)\n4. Advil 200mg - 245 units ($1,225.00)\n5. Vitamin D3 1000IU - 201 units ($1,005.00)",
          type: "text"
        };
      } else if (userQuery.toLowerCase().includes("expiring")) {
        aiResponse = {
          text: "Currently you have 14 medications expiring in the next 30 days. The most critical ones are:\n\n1. Metformin 1000mg (Batch: MET2023-42) - Expires in 5 days, 60 units in stock\n2. Sertraline 50mg (Batch: SER2023-28) - Expires in 13 days, 45 units in stock\n3. Amoxicillin 500mg (Batch: AMX2023-56) - Expires in 18 days, 120 units in stock",
          type: "text"
        };
      } else if (userQuery.toLowerCase().includes("inventory") || userQuery.toLowerCase().includes("dead")) {
        aiResponse = {
          text: "I've identified 8 items with zero sales in the past 60 days:\n\n1. Digoxin 125mcg - Last sale: 78 days ago\n2. Propranolol 40mg - Last sale: 82 days ago\n3. Prednisone 5mg - Last sale: 65 days ago\n4. Clonazepam 0.5mg - Last sale: 90 days ago\n5. Vitamin B Complex - Last sale: 70 days ago\n\nConsider reviewing these items for potential discounts or returns.",
          type: "text"
        };
      } else if (userQuery.toLowerCase().includes("fact")) {
        let factType = "health";
        if (userQuery.toLowerCase().includes("science")) factType = "science";
        if (userQuery.toLowerCase().includes("history")) factType = "history";
        if (userQuery.toLowerCase().includes("joke")) factType = "jokes";
        
        const facts = {
          health: "Regular exercise can help reduce the risk of heart disease by up to 35%.",
          science: "Aspirin was first derived from willow bark in 1897, though the medicinal properties of willow bark have been known for thousands of years.",
          history: "The world's oldest pharmacy still in operation is in Florence, Italy. It opened in 1221 and was originally run by Dominican friars.",
          jokes: "Why don't scientists trust atoms? Because they make up everything!"
        };
        
        aiResponse = {
          text: `${facts[factType as keyof typeof facts]}`,
          type: "text"
        };
      } else {
        aiResponse = {
          text: "I can help you analyze your pharmacy data. Try asking me things like:\n• Show me top 5 selling medications\n• List expiring stock\n• Show dead inventory\n• /fact [health|science|history|jokes]",
          type: "text"
        };
      }
      
      setResponses(prev => [...prev, aiResponse]);
      setLoading(false);
      setQuery("");
    }, 1500);
  };

  const exampleQueries = [
    "Show me top 5 selling medications this month",
    "List all expiring stock sorted by date",
    "Show dead inventory with zero sales in 60+ days",
    "/fact science"
  ];

  const handleExampleClick = (example: string) => {
    setQuery(example);
  };

  return (
    <div className="space-y-4">
      <div className="bg-muted/40 rounded-lg p-4 h-[400px] overflow-y-auto">
        {responses.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="pill-gradient p-3 rounded-full animate-pulse">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <span className="text-lg font-bold text-pill-500">AI</span>
              </div>
            </div>
            <h3 className="text-lg font-medium">How can I help you today?</h3>
            <p className="text-sm text-center text-muted-foreground">
              Ask me questions about your pharmacy data, inventory, or sales
            </p>
            <div className="grid grid-cols-1 gap-2 w-full max-w-md">
              {exampleQueries.map((example, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  className="justify-start text-left"
                  onClick={() => handleExampleClick(example)}
                >
                  {example}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {responses.map((response, index) => (
              <div key={index} className={`flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    index % 2 === 0 
                      ? 'bg-pill-500 text-white rounded-br-none' 
                      : 'bg-muted rounded-bl-none'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{response.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-lg bg-muted rounded-bl-none">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Textarea 
          placeholder="Ask about your pharmacy data..." 
          className="min-h-[60px]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit" className="pill-gradient hover:opacity-90 transition-opacity" disabled={loading || !query.trim()}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Ask"}
        </Button>
      </form>
    </div>
  );
};
