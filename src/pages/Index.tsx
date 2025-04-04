
import { Smartphone, Code, Zap, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import ConversionForm from "@/components/ConversionForm";
import FeatureCard from "@/components/FeatureCard";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Form Section */}
      <ConversionForm />

      {/* Features Section */}
      <section className="py-20 container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Why Choose Our Converter?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={Zap}
            title="Fast Conversion"
            description="Generate Android apps within minutes without any coding knowledge required."
          />
          <FeatureCard
            icon={Smartphone}
            title="Native Experience"
            description="Apps feel native with smooth performance and access to device features."
          />
          <FeatureCard
            icon={Code}
            title="Custom Branding"
            description="Personalize your app with custom colors, icons, and splash screens."
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Secure & Reliable"
            description="Built with security in mind to protect your data and users."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Convert Your Website?
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Join thousands of businesses that have successfully converted their websites into Android apps.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-gray-100"
            onClick={() => {
              const formElement = document.getElementById('conversion-form');
              if (formElement) {
                formElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 AppifyAndroidNow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
