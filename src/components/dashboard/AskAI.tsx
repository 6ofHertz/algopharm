
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Loader2, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface AIResponse {
  text: string;
  type: "text" | "chart" | "table";
  data?: any;
}

export const AskAI = () => {
  const [query, setQuery] = useState("");
  const [responses, setResponses] = useState<AIResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [currentResponse, setCurrentResponse] = useState("");
  const [responseParts, setResponseParts] = useState<string[]>([]);
  
  // Scroll to bottom whenever responses change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [responses, currentResponse]);
  
  // Simulate typing effect
  useEffect(() => {
    if (responseParts.length === 0 || isTyping) return;
    
    setIsTyping(true);
    const nextPart = responseParts[0];
    const timePerChar = 10; // milliseconds per character
    
    const timer = setTimeout(() => {
      setCurrentResponse(prev => prev + nextPart);
      setResponseParts(prev => prev.slice(1));
      setIsTyping(false);
    }, nextPart.length * timePerChar);
    
    return () => clearTimeout(timer);
  }, [responseParts, isTyping]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    // Add user query to responses
    const userQuery = query;
    setResponses([...responses, { text: userQuery, type: "text" }]);
    setQuery("");
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
      } else if (userQuery.toLowerCase().includes("multi-location") || userQuery.toLowerCase().includes("enterprise")) {
        aiResponse = {
          text: "Enterprise features are available in the premium version. These include:\n\n• Multi-location inventory management\n• Centralized reporting across pharmacies\n• Corporate pricing controls\n• Advanced supply chain integrations\n• Staff scheduling across locations\n\nWould you like me to prepare a demonstration of these features?",
          type: "text"
        };
      } else {
        aiResponse = {
          text: "I can help you analyze your pharmacy data. Try asking me things like:\n• Show me top 5 selling medications\n• List expiring stock\n• Show dead inventory\n• /fact [health|science|history|jokes]\n• Tell me about enterprise features",
          type: "text"
        };
      }
      
      // Split the response into smaller parts for typing effect
      const parts = aiResponse.text.split(/(?<=\.\s|\n)/g).filter(Boolean);
      setResponseParts(parts);
      setCurrentResponse("");
      
      setLoading(false);
      
      // After typing effect completes, add the response to the list
      setTimeout(() => {
        setResponses(prev => [...prev, aiResponse]);
        setCurrentResponse("");
      }, parts.join("").length * 10 + 500);
    }, 800);
  };

  const exampleQueries = [
    "Show me top 5 selling medications this month",
    "List all expiring stock sorted by date",
    "Show dead inventory with zero sales in 60+ days",
    "/fact science",
    "Tell me about enterprise features"
  ];

  const handleExampleClick = (example: string) => {
    setQuery(example);
  };

  return (
    <div className="space-y-4">
      <div className="bg-muted/40 rounded-lg p-4 h-[400px] overflow-y-auto">
        <AnimatePresence>
          {responses.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center h-full space-y-4"
            >
              <motion.div 
                className="pill-gradient p-3 rounded-full"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <Brain className="h-6 w-6 text-pill-600" />
                </div>
              </motion.div>
              <h3 className="text-lg font-medium">How can I help you today?</h3>
              <p className="text-sm text-center text-muted-foreground">
                Ask me questions about your pharmacy data, inventory, or sales
              </p>
              <div className="grid grid-cols-1 gap-2 w-full max-w-md">
                {exampleQueries.map((example, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Button 
                      variant="outline" 
                      className="justify-start text-left w-full overflow-hidden hover:shadow-[0_0_8px_rgba(218,165,32,0.3)] transition-all duration-300"
                      onClick={() => handleExampleClick(example)}
                    >
                      {example}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {responses.map((response, index) => (
                <motion.div 
                  key={index} 
                  className={`flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div 
                    className={cn(
                      "max-w-[80%] p-3 rounded-lg shadow-sm", 
                      index % 2 === 0 
                        ? 'bg-pill-500 text-white rounded-br-none' 
                        : 'bg-accent rounded-bl-none dark:bg-accent/60'
                    )}
                  >
                    <p className="text-sm whitespace-pre-line">{response.text}</p>
                    {index % 2 !== 0 && (
                      <div className="flex justify-end mt-1">
                        <Sparkles className="h-4 w-4 text-amber-500" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {currentResponse && (
                <motion.div 
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="max-w-[80%] p-3 rounded-lg bg-accent rounded-bl-none dark:bg-accent/60">
                    <p className="text-sm whitespace-pre-line">{currentResponse}</p>
                    <div className="flex h-5 items-center space-x-1">
                      <div className="animate-bounce h-1.5 w-1.5 rounded-full bg-muted-foreground"></div>
                      <div className="animate-bounce h-1.5 w-1.5 rounded-full bg-muted-foreground" style={{ animationDelay: '0.2s' }}></div>
                      <div className="animate-bounce h-1.5 w-1.5 rounded-full bg-muted-foreground" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {loading && !currentResponse && (
                <motion.div 
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="max-w-[80%] p-3 rounded-lg bg-accent rounded-bl-none dark:bg-accent/60">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </AnimatePresence>
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Textarea 
          placeholder="Ask about your pharmacy data..." 
          className="min-h-[60px] transition-all duration-200 focus:border-pill-400 focus:ring-pill-400 dark:focus:border-pill-600 dark:focus:ring-pill-600"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button 
          type="submit" 
          className="pill-gradient hover:opacity-90 transition-opacity relative overflow-hidden group" 
          disabled={loading || !query.trim()}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              <span className="sr-only">Ask</span>
            </>
          )}
        </Button>
      </form>
    </div>
  );
};
