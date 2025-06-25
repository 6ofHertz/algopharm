
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/features/UI/card';
import { Button } from '@/features/UI/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const UserProfile = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Input id="role" placeholder="Enter your role" />
            </div>
            <Button>Update Profile</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
