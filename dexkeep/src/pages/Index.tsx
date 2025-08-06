import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { CardScanner } from '@/components/CardScanner';
import { InventoryManager } from '@/components/InventoryManager';
import { DeckBuilder } from '@/components/DeckBuilder';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Sparkles, Target } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('scanner');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'scanner':
        return <CardScanner />;
      case 'inventory':
        return <InventoryManager />;
      case 'deckbuilder':
        return <DeckBuilder />;
      default:
        return <CardScanner />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="bg-gradient-primary text-primary-foreground py-12 mb-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="h-10 w-10 animate-energy-pulse" />
            <h1 className="text-4xl md:text-6xl font-bold">Pokémon TCG Master</h1>
            <Sparkles className="h-10 w-10 animate-float" />
          </div>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Scan, collect, and build championship decks with AI-powered insights
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Badge className="bg-white/90 text-black px-4 py-2 font-semibold">
              <Target className="h-4 w-4 mr-2" />
              Card Recognition
            </Badge>
            <Badge className="bg-white/90 text-black px-4 py-2 font-semibold">
              <Sparkles className="h-4 w-4 mr-2" />
              AI Deck Building
            </Badge>
            <Badge className="bg-white/90 text-black px-4 py-2 font-semibold">
              <Zap className="h-4 w-4 mr-2" />
              Meta Analysis
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* Main Content */}
        <div className="animate-bounce-in">
          {renderActiveTab()}
        </div>

        {/* Feature Highlights */}
        {activeTab === 'scanner' && (
          <Card className="mt-12 bg-gradient-card border-2 border-primary/20 shadow-card">
            <CardHeader>
              <CardTitle className="text-center">How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="space-y-3">
                  <div className="h-12 w-12 bg-energy-electric rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold text-black">1</span>
                  </div>
                  <h3 className="font-semibold">Scan or Upload</h3>
                  <p className="text-sm text-muted-foreground">
                    Take a photo or upload an image of your Pokémon card
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="h-12 w-12 bg-pokeball-red rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h3 className="font-semibold">AI Identification</h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced AI recognizes the card and fetches market data
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="h-12 w-12 bg-pokeball-blue rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h3 className="font-semibold">Instant Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Get card details, pricing, and add to your collection
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
