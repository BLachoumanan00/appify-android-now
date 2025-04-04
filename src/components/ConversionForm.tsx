
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight, Download, Globe, Smartphone } from "lucide-react";
import StepIndicator from "./StepIndicator";
import AppPreview from "./AppPreview";

const steps = ["Website URL", "App Settings", "Customization", "Generate"];

const ConversionForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [url, setUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [appName, setAppName] = useState("");
  const [appColor, setAppColor] = useState("#6366f1");
  const [fullScreen, setFullScreen] = useState(true);
  const [offlineSupport, setOfflineSupport] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const { toast } = useToast();

  const validateUrl = (input: string) => {
    try {
      new URL(input);
      setIsValidUrl(true);
      return true;
    } catch (error) {
      setIsValidUrl(false);
      return false;
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUrl(input);
    validateUrl(input);
  };

  const nextStep = () => {
    if (currentStep === 0 && !isValidUrl) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid website URL",
        variant: "destructive",
      });
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateApp = () => {
    setIsLoading(true);
    
    // Simulate generation process
    setTimeout(() => {
      setIsLoading(false);
      setIsGenerated(true);
      toast({
        title: "Success!",
        description: "Your Android app has been generated.",
      });
    }, 3000);
  };

  const downloadApp = () => {
    toast({
      title: "Download Started",
      description: "Your Android app is being downloaded.",
    });
  };

  return (
    <div id="conversion-form" className="bg-muted/50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 card-shadow">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Create Your Android App
          </h2>

          <StepIndicator steps={steps} currentStep={currentStep} />

          <div className="mt-8">
            {currentStep === 0 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="website-url">Website URL</Label>
                  <div className="mt-2 flex">
                    <div className="relative flex-grow">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        id="website-url"
                        placeholder="https://example.com"
                        value={url}
                        onChange={handleUrlChange}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Enter the full URL of the website you want to convert
                  </p>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="app-name">App Name</Label>
                  <Input
                    id="app-name"
                    placeholder="My Android App"
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="app-color">App Color</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="app-color"
                      type="color"
                      value={appColor}
                      onChange={(e) => setAppColor(e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <span className="text-sm text-muted-foreground">{appColor}</span>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Full Screen Mode</h4>
                    <p className="text-sm text-muted-foreground">Hide browser UI elements</p>
                  </div>
                  <Switch
                    checked={fullScreen}
                    onCheckedChange={setFullScreen}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Offline Support</h4>
                    <p className="text-sm text-muted-foreground">Basic functionality without internet</p>
                  </div>
                  <Switch
                    checked={offlineSupport}
                    onCheckedChange={setOfflineSupport}
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <Tabs defaultValue="preview" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                  </TabsList>
                  <TabsContent value="preview" className="pt-4">
                    <div className="flex justify-center">
                      <AppPreview url={url} appName={appName} appColor={appColor} />
                    </div>
                  </TabsContent>
                  <TabsContent value="details" className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-medium">Website URL:</div>
                      <div className="truncate">{url}</div>
                      <div className="font-medium">App Name:</div>
                      <div>{appName || "My Android App"}</div>
                      <div className="font-medium">Color Theme:</div>
                      <div className="flex items-center gap-2">
                        <div 
                          className="h-4 w-4 rounded-full" 
                          style={{ backgroundColor: appColor }}
                        ></div>
                        {appColor}
                      </div>
                      <div className="font-medium">Full Screen:</div>
                      <div>{fullScreen ? "Enabled" : "Disabled"}</div>
                      <div className="font-medium">Offline Support:</div>
                      <div>{offlineSupport ? "Enabled" : "Disabled"}</div>
                    </div>
                  </TabsContent>
                </Tabs>

                {!isGenerated ? (
                  <Button 
                    onClick={generateApp} 
                    className="w-full gradient-bg" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                        Generating...
                      </>
                    ) : (
                      "Generate Android App"
                    )}
                  </Button>
                ) : (
                  <Button 
                    onClick={downloadApp}
                    className="w-full gradient-bg"
                    disabled={isLoading}
                  >
                    <Download className="mr-2 h-4 w-4" /> Download APK File
                  </Button>
                )}
              </div>
            )}

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              
              {currentStep < steps.length - 1 && (
                <Button onClick={nextStep}>
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversionForm;
