
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/features/UI/card';
import { Button } from '@/features/UI/button';
import { Input } from '@/components/ui/input';

const AskAI = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ask AI Assistant</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input placeholder="Ask me anything about your pharmacy..." />
            <Button>Send Question</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AskAI;
