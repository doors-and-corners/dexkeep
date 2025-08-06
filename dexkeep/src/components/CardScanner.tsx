import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Camera, Upload, Zap, Sparkles } from 'lucide-react';

interface ScannedCard {
  id: string;
  name: string;
  set: string;
  rarity: string;
  price: number;
  imageUrl: string;
  type: string;
}

export const CardScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedCard, setScannedCard] = useState<ScannedCard | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const mockIdentifyCard = async (imageFile: File): Promise<ScannedCard> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock response - in real app, this would call Google Vision + TCGPlayer APIs
    const mockCards = [
      {
        id: 'swsh4-25',
        name: 'Pikachu V',
        set: 'Vivid Voltage',
        rarity: 'Ultra Rare',
        price: 24.99,
        imageUrl: '/placeholder.svg',
        type: 'Electric'
      },
      {
        id: 'swsh12-123',
        name: 'Charizard VMAX',
        set: 'Silver Tempest',
        rarity: 'Secret Rare',
        price: 89.99,
        imageUrl: '/placeholder.svg',
        type: 'Fire'
      },
      {
        id: 'swsh9-64',
        name: 'Gardevoir ex',
        set: 'Brilliant Stars',
        rarity: 'Ultra Rare',
        price: 15.50,
        imageUrl: '/placeholder.svg',
        type: 'Psychic'
      }
    ];
    
    return mockCards[Math.floor(Math.random() * mockCards.length)];
  };

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    setIsScanning(true);
    try {
      const identified = await mockIdentifyCard(file);
      setScannedCard(identified);
      toast({
        title: "Card identified! ⚡",
        description: `Found ${identified.name} from ${identified.set}`,
      });
    } catch (error) {
      toast({
        title: "Identification failed",
        description: "Could not identify this card. Try a clearer image.",
        variant: "destructive",
      });
    } finally {
      setIsScanning(false);
    }
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // In a real app, you'd implement camera capture here
      toast({
        title: "Camera feature",
        description: "Camera capture would be implemented here",
      });
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      toast({
        title: "Camera access denied",
        description: "Please allow camera access or use the upload option",
        variant: "destructive",
      });
    }
  };

  const addToCollection = () => {
    if (scannedCard) {
      // In real app, save to database/localStorage
      toast({
        title: "Added to collection! 🎉",
        description: `${scannedCard.name} has been added to your inventory`,
      });
      setScannedCard(null);
      setPreviewImage(null);
    }
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      Electric: 'energy-electric',
      Fire: 'energy-fire',
      Water: 'energy-water',
      Grass: 'energy-grass',
      Psychic: 'energy-psychic',
      Fighting: 'energy-fighting',
    };
    return colors[type] || 'primary';
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card className="bg-gradient-card border-2 border-primary/20 shadow-card">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Zap className="h-6 w-6 text-energy-electric animate-energy-pulse" />
            Card Scanner
            <Sparkles className="h-6 w-6 text-primary animate-float" />
          </CardTitle>
          <p className="text-muted-foreground">
            Scan or upload photos of your Pokémon cards for instant identification
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 justify-center">
            <Button
              variant="scanner"
              size="lg"
              onClick={handleCamera}
              disabled={isScanning}
              className="flex-1"
            >
              <Camera className="h-5 w-5" />
              Scan with Camera
            </Button>
            <Button
              variant="electric"
              size="lg"
              onClick={handleUpload}
              disabled={isScanning}
              className="flex-1"
            >
              <Upload className="h-5 w-5" />
              Upload Photo
            </Button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            className="hidden"
          />

          {isScanning && (
            <div className="text-center py-8">
              <div className="animate-bounce-in">
                <Zap className="h-12 w-12 mx-auto text-energy-electric animate-energy-pulse mb-4" />
                <p className="text-lg font-medium">Identifying card...</p>
                <p className="text-muted-foreground">Using AI vision technology</p>
              </div>
            </div>
          )}

          {previewImage && !isScanning && (
            <div className="text-center">
              <img
                src={previewImage}
                alt="Card preview"
                className="max-w-xs mx-auto rounded-lg shadow-card border-2 border-primary/20"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {scannedCard && (
        <Card className="bg-gradient-card border-2 border-primary/20 shadow-card animate-bounce-in">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Card Identified!</span>
              <Badge 
                className={`bg-${getTypeColor(scannedCard.type)} text-white`}
              >
                {scannedCard.type}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-semibold text-lg">{scannedCard.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Set</p>
                <p className="font-medium">{scannedCard.set}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rarity</p>
                <Badge variant="outline">{scannedCard.rarity}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Market Price</p>
                <p className="font-bold text-lg text-energy-electric">
                  ${scannedCard.price}
                </p>
              </div>
            </div>
            <Button
              variant="pokeball"
              size="lg"
              onClick={addToCollection}
              className="w-full"
            >
              Add to Collection
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};