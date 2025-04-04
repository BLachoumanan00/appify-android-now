
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight, Download, Globe, Smartphone, RotateCcw, Verified, Lock } from "lucide-react";
import StepIndicator from "./StepIndicator";
import AppPreview from "./AppPreview";
import IconSelector from "./IconSelector";
import QRCodeDisplay from "./QRCodeDisplay";
import { useIsMobile } from "@/hooks/use-mobile";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { cn } from "@/lib/utils";

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
  const [isEnterpriseMode, setIsEnterpriseMode] = useState(true); // Default to enterprise mode as requested
  const [generatedAppUrl, setGeneratedAppUrl] = useState("");
  const [screenSize, setScreenSize] = useState("medium"); // small, medium, large
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Advanced settings for enterprise mode
  const [advancedSettings, setAdvancedSettings] = useState({
    minifyCode: true,
    optimizeImages: true,
    addAnalytics: false,
    deepLinks: true,
    customSplashDuration: 2000,
    obfuscateCode: false,
    autoUpdate: true,
    cacheStrategy: "network-first",
  });

  // Handle screen size change
  const handleScreenSizeChange = (size: string) => {
    setScreenSize(size);
  };

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
          // Generate a fake URL for demo purposes
          const demoAppUrl = `https://appify-demo.com/app/${Date.now()}`;
          setGeneratedAppUrl(demoAppUrl);
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
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100 dark:border-gray-700 ios18-card">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl md:text-3xl font-bold">
                Create Your Android App
              </h2>
              {isEnterpriseMode && (
                <span className="enterprise-badge flex items-center text-xs">
                  <Lock className="h-3 w-3 mr-1" /> Enterprise
                </span>
              )}
            </div>
            
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
                        className="pl-10 ios18-input"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Enter the full URL of the website you want to convert
                  </p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 ios18-card">
                  <h4 className="font-medium mb-2 flex items-center">
                    <Smartphone className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                    App Preview
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Enter a valid URL above to get a preview of how your app will look on mobile devices.
                  </p>
                </div>

                {isEnterpriseMode && (
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 ios18-card border-l-4 border-indigo-500">
                    <h4 className="font-medium mb-2 flex items-center text-indigo-700 dark:text-indigo-300">
                      <Verified className="h-5 w-5 mr-2" />
                      Enterprise Features Active
                    </h4>
                    <p className="text-sm text-indigo-600 dark:text-indigo-400">
                      You have access to advanced customization, priority builds, and premium support.
                    </p>
                  </div>
                )}
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
                    className="ios18-input"
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
                      className="w-16 h-10 p-1 rounded-md"
                    />
                    <span className="text-sm text-muted-foreground">{appColor}</span>
                  </div>
                </div>

                {isEnterpriseMode && (
                  <div className="space-y-4 pt-4 mt-4 border-t border-gray-100 dark:border-gray-700">
                    <h4 className="font-medium">Screen Size Adaptation</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Choose how your app should adapt to different screen sizes
                    </p>
                    
                    <div className="flex flex-wrap gap-3 justify-center">
                      <Button 
                        variant={screenSize === "small" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleScreenSizeChange("small")}
                        className="flex-1"
                      >
                        Compact
                      </Button>
                      <Button 
                        variant={screenSize === "medium" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleScreenSizeChange("medium")}
                        className="flex-1"
                      >
                        Medium
                      </Button>
                      <Button 
                        variant={screenSize === "large" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleScreenSizeChange("large")}
                        className="flex-1"
                      >
                        Expanded
                      </Button>
                    </div>
                  </div>
                )}
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

                {isEnterpriseMode && (
                  <div className="pt-4 mt-2 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-medium">Advanced Settings</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-medium">Minify Code</h4>
                          <p className="text-xs text-muted-foreground">Reduce app size</p>
                        </div>
                        <Switch
                          checked={advancedSettings.minifyCode}
                          onCheckedChange={(checked) => setAdvancedSettings({...advancedSettings, minifyCode: checked})}
                          size="sm"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-medium">Optimize Images</h4>
                          <p className="text-xs text-muted-foreground">Compress images</p>
                        </div>
                        <Switch
                          checked={advancedSettings.optimizeImages}
                          onCheckedChange={(checked) => setAdvancedSettings({...advancedSettings, optimizeImages: checked})}
                          size="sm"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-medium">Analytics</h4>
                          <p className="text-xs text-muted-foreground">Track user behavior</p>
                        </div>
                        <Switch
                          checked={advancedSettings.addAnalytics}
                          onCheckedChange={(checked) => setAdvancedSettings({...advancedSettings, addAnalytics: checked})}
                          size="sm"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-medium">Deep Links</h4>
                          <p className="text-xs text-muted-foreground">URL scheme support</p>
                        </div>
                        <Switch
                          checked={advancedSettings.deepLinks}
                          onCheckedChange={(checked) => setAdvancedSettings({...advancedSettings, deepLinks: checked})}
                          size="sm"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                {!isGenerated ? (
                  <ResizablePanelGroup direction={isMobile ? "vertical" : "horizontal"} className="min-h-[400px] rounded-lg border">
                    <ResizablePanel defaultSize={60}>
                      <div className="p-6">
                        <Tabs defaultValue="preview" className="w-full">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="preview">Preview</TabsTrigger>
                            <TabsTrigger value="details">Details</TabsTrigger>
                          </TabsList>
                          <TabsContent value="preview" className="pt-4">
                            <div className="flex justify-center">
                              <AppPreview 
                                url={url} 
                                appName={appName} 
                                appColor={appColor} 
                                icon={appIcon} 
                                screenSize={screenSize}
                              />
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
                              <div className="font-medium">Screen Adaptation:</div>
                              <div>{screenSize === "small" ? "Compact" : screenSize === "medium" ? "Medium" : "Expanded"}</div>
                            </div>
                          </TabsContent>
                        </Tabs>
                        
                        {isLoading && (
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4 mt-6">
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
                          className="w-full gradient-bg mt-6 ios18-button" 
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
                    </ResizablePanel>
                    
                    {!isMobile && <ResizableHandle withHandle />}
                    
                    <ResizablePanel defaultSize={40}>
                      <div className="p-6">
                        <h3 className="text-lg font-medium mb-4">Generation Settings</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Your app will be built with the following enterprise features:
                        </p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <Verified className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                            <span>Priority build queue</span>
                          </li>
                          <li className="flex items-start">
                            <Verified className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                            <span>Advanced screen adaptation</span>
                          </li>
                          <li className="flex items-start">
                            <Verified className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                            <span>QR code for instant testing</span>
                          </li>
                          <li className="flex items-start">
                            <Verified className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                            <span>Performance optimization</span>
                          </li>
                          <li className="flex items-start">
                            <Verified className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                            <span>Extended customization options</span>
                          </li>
                        </ul>
                      </div>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl ios18-card">
                      <h3 className="text-xl font-medium mb-4 text-center">Your App is Ready!</h3>
                      <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 rounded-xl gradient-bg flex items-center justify-center">
                          {appIcon ? (
                            <img 
                              src={appIcon} 
                              alt="App Icon" 
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          ) : (
                            <Smartphone className="w-10 h-10 text-white" />
                          )}
                        </div>
                      </div>
                      <div className="text-center mb-6">
                        <h4 className="text-lg font-medium">{appName || "My Android App"}</h4>
                        <p className="text-sm text-muted-foreground">
                          Size: 8.4 MB • Android 6.0+
                        </p>
                      </div>
                      <Button 
                        onClick={downloadApp}
                        className="w-full gradient-bg ios18-button"
                      >
                        <Download className="mr-2 h-4 w-4" /> Download APK File
                      </Button>
                    </div>
                    
                    <div className="ios18-card p-6 rounded-xl">
                      <QRCodeDisplay 
                        appUrl={generatedAppUrl} 
                        onDownload={downloadApp} 
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="ios18-button"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              
              {currentStep < steps.length - 1 && (
                <Button onClick={nextStep} className="ios18-button">
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
