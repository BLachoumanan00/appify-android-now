
import { Button } from "@/components/ui/button";
import { ArrowDown, ChevronRight, Smartphone, Tablet, Laptop, Code, Shield } from "lucide-react";

const Hero = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById('conversion-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background gradient effects */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-primary/10 to-transparent z-0"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-secondary/20 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-primary/20 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="mb-6 bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-primary border border-gray-200 dark:border-gray-700 shadow-sm">
            <span className="inline-block animate-pulse bg-primary h-2 w-2 rounded-full mr-2 align-middle"></span>
            Introducing the easiest way to convert websites to Android apps
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Transform Your <span className="gradient-text">Web App</span> Into An <span className="gradient-text">Android App</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl">
            Convert any website or web application into a fully functional Android app with just a few clicks. No coding required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={scrollToForm}
              size="lg" 
              className="gradient-bg text-white font-medium px-8 shadow-lg hover:shadow-xl transition-all"
            >
              Get Started
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="font-medium px-8 shadow-sm"
            >
              Learn More
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-3xl">
            <div className="flex flex-col items-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Smartphone className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Native Feel</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center mb-2">
                <Code className="h-5 w-5 text-secondary" />
              </div>
              <span className="text-sm text-muted-foreground">No Coding</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Secure</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center mb-2">
                <Tablet className="h-5 w-5 text-secondary" />
              </div>
              <span className="text-sm text-muted-foreground">Responsive</span>
            </div>
          </div>
          
          <div className="mt-16 animate-bounce cursor-pointer" onClick={scrollToForm}>
            <ArrowDown className="text-primary h-8 w-8" />
          </div>
          
          {/* Floating device mockups */}
          <div className="relative w-full max-w-4xl mt-16">
            <div className="absolute -top-8 -left-8 md:left-10 w-40 h-80 bg-gray-100 dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl rotate-6 opacity-60 animate-float" style={{animationDelay: "0.2s"}}></div>
            <div className="absolute -top-12 left-1/3 w-48 h-96 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl -rotate-3 opacity-80 animate-float" style={{animationDelay: "0.5s"}}></div>
            <div className="absolute -top-8 right-10 md:right-24 w-40 h-80 bg-gray-100 dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl -rotate-12 opacity-60 animate-float" style={{animationDelay: "0.8s"}}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
