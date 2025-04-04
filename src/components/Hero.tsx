
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById('conversion-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 z-0 gradient-bg opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Transform Your <span className="text-primary">Web App</span> Into An <span className="text-secondary">Android App</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl">
            Convert any website or web application into a fully functional Android app with just a few clicks. No coding required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={scrollToForm}
              size="lg" 
              className="gradient-bg text-white font-medium px-8"
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="font-medium px-8"
            >
              Learn More
            </Button>
          </div>
          <div className="mt-16 animate-bounce">
            <ArrowDown 
              className="text-primary h-8 w-8 cursor-pointer" 
              onClick={scrollToForm}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
