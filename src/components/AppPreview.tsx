
import { useState } from "react";
import { Smartphone } from "lucide-react";

interface AppPreviewProps {
  url: string;
  appName: string;
  appColor: string;
}

const AppPreview = ({ url, appName, appColor }: AppPreviewProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-medium mb-4">App Preview</h3>
      <div 
        className="relative w-[280px] h-[580px] rounded-[36px] overflow-hidden card-shadow border-8"
        style={{ borderColor: appColor || "#6366f1" }}
      >
        <div className="absolute top-0 left-0 w-full h-12 bg-black flex items-center justify-center">
          <div className="w-20 h-6 rounded-full bg-gray-800"></div>
        </div>
        {url ? (
          <div className="w-full h-full pt-12">
            {isLoading && (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <div className="animate-spin h-8 w-8 border-4 rounded-full border-primary border-t-transparent"></div>
              </div>
            )}
            <div className={isLoading ? "hidden" : "block h-full"}>
              <div className="w-full h-12 bg-primary flex items-center px-4">
                <span className="text-white font-medium truncate">{appName || "My Android App"}</span>
              </div>
              <iframe 
                src={url} 
                className="w-full h-[calc(100%-48px)]" 
                onLoad={() => setIsLoading(false)}
                title="App Preview"
              />
            </div>
          </div>
        ) : (
          <div className="w-full h-full pt-12 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800">
            <Smartphone size={48} className="text-gray-400 mb-4" />
            <p className="text-sm text-gray-500 px-6 text-center">
              Enter a URL to see your app preview
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppPreview;
