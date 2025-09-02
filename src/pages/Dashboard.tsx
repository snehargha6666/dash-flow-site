import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Settings, 
  Bell,
  Search,
  Plus,
  ArrowUpRight,
  Activity,
  Calendar,
  Globe
} from 'lucide-react';
import { Input } from '@/components/ui/input';

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
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-primary-foreground font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = [
    { 
      icon: DollarSign, 
      title: "Revenue", 
      value: "$12,426", 
      change: "+12.5%", 
      color: "text-green-500" 
    },
    { 
      icon: Users, 
      title: "Active Users", 
      value: "1,249", 
      change: "+8.2%", 
      color: "text-blue-500" 
    },
    { 
      icon: TrendingUp, 
      title: "Growth", 
      value: "23.1%", 
      change: "+4.1%", 
      color: "text-purple-500" 
    },
    { 
      icon: Activity, 
      title: "Conversion", 
      value: "3.2%", 
      change: "+0.8%", 
      color: "text-orange-500" 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
                <BarChart3 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back, {profile?.full_name || 'User'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Search..." 
                  className="pl-10 w-64 h-10 shadow-soft bg-background/80"
                />
              </div>
              
              <Button variant="outline" size="icon" className="shadow-soft">
                <Bell className="w-4 h-4" />
              </Button>
              
              <Button variant="outline" size="icon" className="shadow-soft">
                <Settings className="w-4 h-4" />
              </Button>
              
              <Button onClick={handleSignOut} variant="outline" className="shadow-soft">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-8 shadow-large">
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-primary-foreground">
                  Good morning, {profile?.full_name?.split(' ')[0] || 'there'}! 
                </h2>
                <p className="text-xl text-primary-foreground/90 max-w-lg">
                  Your SaaS is performing exceptionally well. Here's what's happening today.
                </p>
                <Button size="lg" className="bg-background text-primary hover:bg-background/90 shadow-medium">
                  <Plus className="w-5 h-5 mr-2" />
                  Create New Project
                </Button>
              </div>
              
              <div className="hidden lg:block">
                <div className="w-48 h-48 bg-primary-foreground/10 rounded-full flex items-center justify-center">
                  <Globe className="w-24 h-24 text-primary-foreground/50" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-foreground/5 rounded-full blur-2xl"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="shadow-medium hover:shadow-large transition-all duration-300 border-0 bg-card/80 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg bg-gradient-primary/10`}>
                      <IconComponent className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <span className={`text-sm font-medium ${stat.color}`}>
                      {stat.change}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-medium border-0 bg-card/80 backdrop-blur">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Recent Activity</CardTitle>
                  <Button variant="ghost" size="sm">
                    View All <ArrowUpRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { action: "New user registered", time: "2 min ago", user: "sarah@example.com" },
                  { action: "Payment processed", time: "5 min ago", user: "john@example.com" },
                  { action: "Project created", time: "12 min ago", user: "alice@example.com" },
                  { action: "Subscription upgraded", time: "1 hour ago", user: "bob@example.com" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 rounded-lg bg-gradient-secondary/50 hover:bg-gradient-secondary/80 transition-colors">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.user}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Profile */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="shadow-medium border-0 bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>Account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
                    <span className="text-2xl font-bold text-primary-foreground">
                      {profile?.full_name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{profile?.full_name || 'User'}</p>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Member since</span>
                    <span className="text-sm font-medium">
                      {profile?.created_at 
                        ? new Date(profile.created_at).toLocaleDateString()
                        : 'Unknown'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Plan</span>
                    <span className="text-sm font-medium bg-gradient-primary bg-clip-text text-transparent">
                      Pro
                    </span>
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300">
                  <Settings className="w-4 h-4 mr-2" />
                  Manage Account
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-medium border-0 bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Get things done faster</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start shadow-soft">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Project
                </Button>
                <Button variant="outline" className="w-full justify-start shadow-soft">
                  <Users className="w-4 h-4 mr-2" />
                  Invite Team
                </Button>
                <Button variant="outline" className="w-full justify-start shadow-soft">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </Button>
                <Button variant="outline" className="w-full justify-start shadow-soft">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}