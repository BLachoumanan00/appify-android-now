
import { Smartphone, Code, Zap, ShieldCheck, ArrowRight, Gift, Layers, Settings, Check, Sparkles } from "lucide-react";
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Why Choose Our Converter?
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
          Our app converter offers a simple way to transform any website into a fully-featured Android application with just a few clicks
        </p>
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
          <FeatureCard
            icon={Sparkles}
            title="Beautiful UI"
            description="Create apps with modern, iOS 18-inspired user interfaces and smooth animations."
          />
          <FeatureCard
            icon={Layers}
            title="Multi-Platform"
            description="Build once and deploy to multiple platforms with a single codebase."
          />
          <FeatureCard
            icon={Settings}
            title="Fully Customizable"
            description="Control every aspect of your app from navigation to notifications and permissions."
          />
          <FeatureCard
            icon={Gift}
            title="Feature Rich"
            description="Get access to premium features like push notifications and offline support."
          />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Choose Your Plan</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-16">
            Select the perfect plan for your needs with our simple and transparent pricing options
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-2">Basic</h3>
              <div className="text-3xl font-bold mb-2">Free</div>
              <p className="text-muted-foreground mb-6">Perfect for simple websites</p>
              <hr className="mb-6" />
              <ul className="space-y-3 text-left mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                  <span>Convert any website to app</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                  <span>Basic customization</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                  <span>Standard APK format</span>
                </li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </div>
            
            {/* Pro Plan */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border-2 border-primary relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <div className="text-3xl font-bold mb-2">$19<span className="text-lg font-normal text-muted-foreground">/month</span></div>
              <p className="text-muted-foreground mb-6">For businesses and professionals</p>
              <hr className="mb-6" />
              <ul className="space-y-3 text-left mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                  <span>Everything in Basic</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                  <span>Custom app icon & branding</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                  <span>Push notifications</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                  <span>Offline support</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                  <span>Remove "Powered by" branding</span>
                </li>
              </ul>
              <Button className="w-full gradient-bg">Choose Pro</Button>
            </div>
            
            {/* Enterprise Plan */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-2">Enterprise</h3>
              <div className="text-3xl font-bold mb-2">$49<span className="text-lg font-normal text-muted-foreground">/month</span></div>
              <p className="text-muted-foreground mb-6">For large businesses & agencies</p>
              <hr className="mb-6" />
              <ul className="space-y-3 text-left mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                  <span>Multiple apps</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                  <span>Analytics & usage tracking</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                  <span>Full API access</span>
                </li>
              </ul>
              <Button className="w-full" variant="outline">Contact Sales</Button>
            </div>
          </div>
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
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Features</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Pricing</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Tutorials</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Updates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">About</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Jobs</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Contact Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Documentation</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">FAQs</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Terms</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Privacy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Cookies</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Licenses</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-muted-foreground">
            <p>© 2025 AppifyAndroidNow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
