import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-foreground/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-foreground/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Logo/Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-primary-foreground/20 rounded-2xl flex items-center justify-center backdrop-blur shadow-glow">
              <Sparkles className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>

          {/* Hero Text */}
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-primary-foreground leading-tight">
              Your Amazing
              <span className="block bg-gradient-to-r from-primary-foreground via-primary-foreground/80 to-primary-foreground/60 bg-clip-text text-transparent">
                SaaS Platform
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
              Build, scale, and grow your business with our cutting-edge platform. 
              Experience the future of software solutions today.
            </p>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { icon: Zap, text: "Lightning Fast" },
              { icon: Shield, text: "Secure & Reliable" },
              { icon: Sparkles, text: "AI Powered" }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="flex items-center space-x-2 bg-primary-foreground/10 backdrop-blur rounded-full px-4 py-2 text-primary-foreground">
                  <IconComponent className="w-4 h-4" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {user ? (
              <Button 
                asChild 
                size="lg" 
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-large text-lg px-8 py-4 h-auto"
              >
                <Link to="/dashboard" className="flex items-center">
                  Open Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            ) : (
              <>
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-large text-lg px-8 py-4 h-auto"
                >
                  <Link to="/auth" className="flex items-center">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur text-lg px-8 py-4 h-auto"
                >
                  <Link to="/auth">
                    Sign In
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Social Proof */}
          <div className="pt-12 text-primary-foreground/70">
            <p className="text-sm mb-4">Trusted by 10,000+ companies worldwide</p>
            <div className="flex justify-center space-x-8 opacity-60">
              {['Company A', 'Company B', 'Company C', 'Company D'].map((company, index) => (
                <div key={index} className="text-sm font-medium">{company}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/20 to-transparent"></div>
    </div>
  );
};

export default Index;
