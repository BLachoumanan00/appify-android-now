
import React, { useCallback } from 'react';
import { QrCode, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface QRCodeDisplayProps {
  appUrl: string;
  onDownload: () => void;
}

const QRCodeDisplay = ({ appUrl, onDownload }: QRCodeDisplayProps) => {
  const { toast } = useToast();
  
  // Create a QR code URL using a reliable QR code generation API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(appUrl || 'https://appify.example.com/app')}`;
  
  const handleDownloadQRCode = useCallback(() => {
    // Create a direct download link for the QR code image
    const link = document.createElement('a');
    
    // Fetch the QR code image first to ensure it's properly downloaded
    fetch(qrCodeUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        link.href = url;
        link.download = 'app-qrcode.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        toast({
          title: "QR Code Downloaded",
          description: "The QR code has been downloaded successfully.",
        });
      })
      .catch(error => {
        console.error('Error downloading QR code:', error);
        toast({
          title: "Download Failed",
          description: "There was an error downloading the QR code.",
          variant: "destructive"
        });
      });
  }, [qrCodeUrl, toast]);
  
  return (
    <div className="flex flex-col items-center space-y-6">
      <Tabs defaultValue="qrcode" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="qrcode">QR Code</TabsTrigger>
          <TabsTrigger value="download">Download</TabsTrigger>
        </TabsList>
        
        <TabsContent value="qrcode" className="flex flex-col items-center space-y-4 pt-6">
          <div className="bg-white p-4 rounded-xl shadow-md">
            <img 
              src={qrCodeUrl} 
              alt="App QR Code" 
              className="w-44 h-44 object-contain"
            />
          </div>
          <div className="text-center space-y-2">
            <p className="text-sm font-medium">Scan to test on your device</p>
            <p className="text-xs text-muted-foreground">Point your camera at the QR code to open the app</p>
          </div>
          <Button onClick={handleDownloadQRCode} variant="outline" size="sm" className="mt-2">
            <Download className="h-4 w-4 mr-2" /> Save QR Code
          </Button>
        </TabsContent>
        
        <TabsContent value="download" className="space-y-4 pt-6">
          <div className="ios-card rounded-xl p-6 flex flex-col items-center space-y-4">
            <QrCode className="h-12 w-12 text-primary mb-2" />
            <h3 className="font-medium">Download Android APK</h3>
            <p className="text-sm text-muted-foreground text-center">
              Get your app package ready to install on any Android device
            </p>
            <Button onClick={onDownload} className="gradient-bg w-full mt-2">
              Download APK
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QRCodeDisplay;
