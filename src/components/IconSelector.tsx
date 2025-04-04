
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Plus, Smartphone, Upload, X } from "lucide-react";

interface IconSelectorProps {
  selectedIcon: string | null;
  onSelectIcon: (iconUrl: string | null) => void;
}

const PRESET_ICONS = [
  "/preset-icons/app-icon-1.png",
  "/preset-icons/app-icon-2.png",
  "/preset-icons/app-icon-3.png",
  "/preset-icons/app-icon-4.png",
  "/preset-icons/app-icon-5.png",
  "/preset-icons/app-icon-6.png",
];

const IconSelector = ({ selectedIcon, onSelectIcon }: IconSelectorProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [customIconUrl, setCustomIconUrl] = useState("");
  const [uploadedIcon, setUploadedIcon] = useState<string | null>(null);

  const handleIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedIcon(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectIcon = (iconUrl: string) => {
    onSelectIcon(iconUrl);
    setIsDialogOpen(false);
  };

  const handleRemoveIcon = () => {
    onSelectIcon(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>App Icon</Label>
        {selectedIcon && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleRemoveIcon}
            className="h-8 px-2 text-destructive"
          >
            <X className="h-4 w-4 mr-1" /> Remove
          </Button>
        )}
      </div>

      <div 
        className="relative w-24 h-24 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer"
        onClick={() => setIsDialogOpen(true)}
      >
        {selectedIcon ? (
          <img 
            src={selectedIcon} 
            alt="App Icon" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Plus className="h-8 w-8 text-muted-foreground" />
          </div>
        )}
      </div>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setIsDialogOpen(true)} 
        className="w-full"
      >
        {selectedIcon ? "Change Icon" : "Select Icon"}
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Choose App Icon</DialogTitle>
            <DialogDescription>
              Select from our preset icons or upload your own.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="icon-url">Custom Icon URL</Label>
              <div className="flex mt-1 space-x-2">
                <Input
                  id="icon-url"
                  placeholder="https://example.com/icon.png"
                  value={customIconUrl}
                  onChange={(e) => setCustomIconUrl(e.target.value)}
                />
                <Button 
                  disabled={!customIconUrl} 
                  onClick={() => handleSelectIcon(customIconUrl)}
                >
                  <Check className="h-4 w-4 mr-1" /> Use
                </Button>
              </div>
            </div>
            
            <div>
              <Label htmlFor="icon-upload">Upload Icon</Label>
              <div className="mt-1">
                <div className="flex items-center space-x-2">
                  <Label 
                    htmlFor="icon-upload" 
                    className="flex-grow cursor-pointer border border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Click to upload</span>
                  </Label>
                  <Input 
                    id="icon-upload" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleIconUpload}
                  />
                  {uploadedIcon && (
                    <Button onClick={() => handleSelectIcon(uploadedIcon)}>
                      <Check className="h-4 w-4 mr-1" /> Use
                    </Button>
                  )}
                </div>
                {uploadedIcon && (
                  <div className="mt-2 flex items-center space-x-2">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden">
                      <img src={uploadedIcon} alt="Uploaded Icon" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-sm text-muted-foreground">Preview</span>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <Label>Preset Icons</Label>
              <div className="grid grid-cols-3 gap-2 mt-1">
                {PRESET_ICONS.map((icon, index) => (
                  <div 
                    key={index}
                    className="w-20 h-20 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-primary"
                    onClick={() => handleSelectIcon(icon)}
                  >
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                      <Smartphone className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IconSelector;
