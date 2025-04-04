
import { useState } from "react";
import { ChevronLeft, Home, Smartphone } from "lucide-react";

interface AppPreviewProps {
  url: string;
  appName: string;
  appColor: string;
  icon?: string | null;
  screenSize?: string;
}

const AppPreview = ({ url, appName, appColor, icon, screenSize = "medium" }: AppPreviewProps) => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Calculate width and height based on screenSize
  const getFrameSize = () => {
    switch(screenSize) {
      case "small":
        return "w-[240px] h-[500px]";
      case "large":
        return "w-[320px] h-[650px]";
      case "medium":
      default:
        return "w-[280px] h-[580px]";
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-medium mb-4">App Preview</h3>
      <div 
        className={`relative ${getFrameSize()} rounded-[40px] overflow-hidden shadow-2xl border-8 transition-colors duration-300`}
        style={{ borderColor: "black" }}
      >
        {/* Status bar */}
        <div className="absolute top-0 left-0 w-full h-8 bg-black z-10 flex items-center px-6">
          <div className="text-white text-xs font-medium">9:41</div>
          <div className="ml-auto flex space-x-1.5">
            <div className="w-4 h-4 rounded-full bg-white opacity-80"></div>
            <div className="w-4 h-4 rounded-full bg-white opacity-80"></div>
            <div className="w-4 h-4 rounded-full bg-white opacity-80"></div>
            <div className="w-4 h-4 rounded-full bg-white opacity-80"></div>
          </div>
        </div>
        
        <div className="w-full h-full pt-8">
          {isLoading && (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800">
              <div className="w-16 h-16 mb-4">
                {icon ? (
                  <img src={icon} alt="App Icon" className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <div className="w-full h-full rounded-xl flex items-center justify-center" style={{ backgroundColor: appColor || "#6366f1" }}>
                    <Smartphone className="h-8 w-8 text-white" />
                  </div>
                )}
              </div>
              <div className="animate-spin h-8 w-8 border-4 rounded-full border-primary border-t-transparent"></div>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Loading preview...</p>
            </div>
          )}
          
          <div className={isLoading ? "hidden" : "block h-full"}>
            {/* iOS style header */}
            <div 
              className="w-full h-12 flex items-center px-4 sticky top-0 z-10"
              style={{ backgroundColor: appColor || "#6366f1" }}
            >
              <div className="flex items-center text-white">
                <ChevronLeft className="h-5 w-5 mr-1" />
                <span className="text-sm">Back</span>
              </div>
              <span className="absolute left-1/2 transform -translate-x-1/2 text-white font-medium">
                {appName || "My App"}
              </span>
            </div>
            
            <iframe 
              src={url} 
              className="w-full h-[calc(100%-48px)]" 
              onLoad={() => setIsLoading(false)}
              title="App Preview"
            />
            
            {/* iOS style bottom nav */}
            <div className="absolute bottom-0 left-0 w-full h-16 bg-white/80 dark:bg-black/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 flex justify-around items-center">
              <div className="flex flex-col items-center">
                <Home className="h-6 w-6 text-primary" />
                <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">Home</span>
              </div>
              <div className="flex flex-col items-center opacity-50">
                <div className="h-6 w-6 rounded-md bg-gray-400"></div>
                <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">Search</span>
              </div>
              <div className="flex flex-col items-center opacity-50">
                <div className="h-6 w-6 rounded-md bg-gray-400"></div>
                <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">Settings</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Dynamic island */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl"></div>
      </div>
    </div>
  );
};

export default AppPreview;
