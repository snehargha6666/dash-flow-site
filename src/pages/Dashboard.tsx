import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  created_at: string;
}

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Welcome Back!</CardTitle>
              <CardDescription>
                Here's your account information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Name:</strong> {profile?.full_name || 'Not set'}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Member since:</strong> {
                  profile?.created_at 
                    ? new Date(profile.created_at).toLocaleDateString()
                    : 'Unknown'
                }</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
              <CardDescription>
                Your account activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>Total Projects: 0</p>
                <p>Active Sessions: 1</p>
                <p>Last Login: {new Date().toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>
                Next steps for your SaaS journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="secondary" className="w-full">
                  Complete Profile
                </Button>
                <Button variant="secondary" className="w-full">
                  Create Project
                </Button>
                <Button variant="secondary" className="w-full">
                  Invite Team
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}