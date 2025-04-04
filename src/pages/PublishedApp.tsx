
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PublishedApp = () => {
  const { appId } = useParams();
  const [loading, setLoading] = useState(true);
  const [appData, setAppData] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, you'd fetch the app data from your backend
    // For this demo, we'll simulate loading app data
    const timer = setTimeout(() => {
      setAppData({
        id: appId,
        name: "Android App",
        url: `https://appify-demo.com/app/${appId}`,
        description: "Your Android app is ready to test. Scan the QR code to try it on your mobile device.",
      });
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [appId]);

  useEffect(() => {
    if (appData) {
      // Generate meta tags for better sharing
      document.title = `${appData.name} | Appify`;
      
      // Notify the user that the app is ready
      toast({
        title: "App Published",
        description: "Your Android app has been successfully published.",
      });
    }
  }, [appData, toast]);

  const handleOpenApp = () => {
    // Open the app in a new tab
    window.open(appData?.url, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to App Builder
      </Link>

      <Card className="max-w-lg mx-auto p-6 ios18-card">
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold">{appData.name}</h1>
              <p className="text-muted-foreground mt-2">{appData.description}</p>
            </div>

            <div className="flex justify-center py-4">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(appData.url)}`}
                alt="App QR Code" 
                className="w-48 h-48 bg-white p-2 rounded-lg shadow-md" 
              />
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>Scan this QR code with your mobile device to open the app</p>
            </div>

            <Button onClick={handleOpenApp} className="w-full ios18-button">
              Open App <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default PublishedApp;
