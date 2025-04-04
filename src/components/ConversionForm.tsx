
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight, Download, Globe, Smartphone, RotateCcw } from "lucide-react";
import StepIndicator from "./StepIndicator";
import AppPreview from "./AppPreview";
import IconSelector from "./IconSelector";

const steps = ["Website URL", "App Settings", "Customization", "Generate"];

const ConversionForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [url, setUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [appName, setAppName] = useState("");
  const [appColor, setAppColor] = useState("#6366f1");
  const [appIcon, setAppIcon] = useState<string | null>(null);
  const [fullScreen, setFullScreen] = useState(true);
  const [offlineSupport, setOfflineSupport] = useState(false);
  const [splashScreen, setSplashScreen] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [landscape, setLandscape] = useState(false);
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
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
    setGenerationProgress(0);
    
    // Simulate generation process with progress
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          setIsGenerated(true);
          toast({
            title: "Success!",
            description: "Your Android app has been generated.",
          });
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };

  const downloadApp = () => {
    toast({
      title: "Download Started",
      description: "Your Android app is being downloaded.",
    });
  };

  const resetForm = () => {
    if (window.confirm("Are you sure you want to reset all settings?")) {
      setUrl("");
      setAppName("");
      setAppColor("#6366f1");
      setAppIcon(null);
      setFullScreen(true);
      setOfflineSupport(false);
      setSplashScreen(true);
      setPushNotifications(false);
      setLandscape(false);
      setShowStatusBar(true);
      setCurrentStep(0);
      setIsGenerated(false);
      toast({
        title: "Form Reset",
        description: "All settings have been reset to default.",
      });
    }
  };

  return (
    <div id="conversion-form" className="bg-muted/20 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              Create Your Android App
            </h2>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetForm}
              className="text-muted-foreground"
            >
              <RotateCcw className="h-4 w-4 mr-1" /> Reset
            </Button>
          </div>

          <StepIndicator steps={steps} currentStep={currentStep} />

          <div className="mt-10">
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
                
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h4 className="font-medium mb-2 flex items-center">
                    <Smartphone className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                    App Preview
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Enter a valid URL above to get a preview of how your app will look on mobile devices.
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
                
                <IconSelector 
                  selectedIcon={appIcon} 
                  onSelectIcon={setAppIcon} 
                />
                
                <div>
                  <Label htmlFor="app-color">Primary Color</Label>
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
                    <h4 className="text-sm font-medium">Splash Screen</h4>
                    <p className="text-sm text-muted-foreground">Add custom loading screen</p>
                  </div>
                  <Switch
                    checked={splashScreen}
                    onCheckedChange={setSplashScreen}
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
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Push Notifications</h4>
                    <p className="text-sm text-muted-foreground">Allow app to send notifications</p>
                  </div>
                  <Switch
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Landscape Mode</h4>
                    <p className="text-sm text-muted-foreground">Allow app to rotate to landscape</p>
                  </div>
                  <Switch
                    checked={landscape}
                    onCheckedChange={setLandscape}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Status Bar</h4>
                    <p className="text-sm text-muted-foreground">Show device status bar</p>
                  </div>
                  <Switch
                    checked={showStatusBar}
                    onCheckedChange={setShowStatusBar}
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
                      <AppPreview url={url} appName={appName} appColor={appColor} icon={appIcon} />
                    </div>
                  </TabsContent>
                  <TabsContent value="details" className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-medium">Website URL:</div>
                      <div className="truncate">{url}</div>
                      <div className="font-medium">App Name:</div>
                      <div>{appName || "My Android App"}</div>
                      <div className="font-medium">App Icon:</div>
                      <div>
                        {appIcon ? (
                          <div className="w-6 h-6 rounded-md overflow-hidden">
                            <img src={appIcon} alt="Icon" className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          "Default"
                        )}
                      </div>
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
                      <div className="font-medium">Splash Screen:</div>
                      <div>{splashScreen ? "Enabled" : "Disabled"}</div>
                      <div className="font-medium">Offline Support:</div>
                      <div>{offlineSupport ? "Enabled" : "Disabled"}</div>
                      <div className="font-medium">Push Notifications:</div>
                      <div>{pushNotifications ? "Enabled" : "Disabled"}</div>
                      <div className="font-medium">Landscape Mode:</div>
                      <div>{landscape ? "Enabled" : "Disabled"}</div>
                      <div className="font-medium">Status Bar:</div>
                      <div>{showStatusBar ? "Enabled" : "Disabled"}</div>
                    </div>
                  </TabsContent>
                </Tabs>

                {!isGenerated ? (
                  <div className="space-y-4">
                    {isLoading && (
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                        <div 
                          className="bg-primary h-2.5 rounded-full transition-all duration-300"
                          style={{ width: `${generationProgress}%` }}
                        ></div>
                        <div className="text-center mt-2 text-sm text-muted-foreground">
                          {Math.round(generationProgress)}% Complete
                        </div>
                      </div>
                    )}
                    
                    <Button 
                      onClick={generateApp} 
                      className="w-full gradient-bg" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                          Generating App...
                        </>
                      ) : (
                        "Generate Android App"
                      )}
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={downloadApp}
                    className="w-full gradient-bg"
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
