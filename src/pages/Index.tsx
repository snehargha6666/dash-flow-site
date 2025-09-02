import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your SaaS App</h1>
        <p className="text-xl text-muted-foreground">Start building your amazing project here!</p>
        
        <div className="space-x-4">
          {user ? (
            <Button asChild>
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button asChild>
                <Link to="/auth">Get Started</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
