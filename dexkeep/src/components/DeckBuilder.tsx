import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Zap, Target, Trophy, Brain, Users } from 'lucide-react';

interface DeckSuggestion {
  id: string;
  name: string;
  format: 'Standard' | 'Expanded' | 'Casual';
  archetype: string;
  winRate: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  mainCards: string[];
  description: string;
  metaTier: 'Tier 1' | 'Tier 2' | 'Tier 3' | 'Rogue';
  totalCost: number;
  cardsOwned: number;
  cardsNeeded: number;
}

export const DeckBuilder = () => {
  const [selectedFormat, setSelectedFormat] = useState('Standard');
  const [selectedPlaystyle, setSelectedPlaystyle] = useState('aggressive');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Mock deck suggestions
  const deckSuggestions: DeckSuggestion[] = [
    {
      id: '1',
      name: 'Pikachu ex Control',
      format: 'Standard',
      archetype: 'Control',
      winRate: 68,
      difficulty: 'Intermediate',
      mainCards: ['Pikachu ex', 'Professor\'s Research', 'Ultra Ball', 'Electric Generator'],
      description: 'A consistent electric-type deck that controls the game pace with powerful Pikachu ex attacks.',
      metaTier: 'Tier 1',
      totalCost: 124.50,
      cardsOwned: 18,
      cardsNeeded: 42
    },
    {
      id: '2', 
      name: 'Charizard ex Aggro',
      format: 'Standard',
      archetype: 'Aggro',
      winRate: 72,
      difficulty: 'Beginner',
      mainCards: ['Charizard ex', 'Charmander', 'Fire Energy', 'Quick Ball'],
      description: 'Fast-paced fire deck that aims to deal massive damage quickly.',
      metaTier: 'Tier 1',
      totalCost: 89.25,
      cardsOwned: 25,
      cardsNeeded: 35
    },
    {
      id: '3',
      name: 'Gardevoir Control',
      format: 'Standard', 
      archetype: 'Control',
      winRate: 65,
      difficulty: 'Advanced',
      mainCards: ['Gardevoir ex', 'Kirlia', 'Psychic Energy', 'Professor Sada\'s Vitality'],
      description: 'Technical psychic deck with complex combos and late-game power.',
      metaTier: 'Tier 2',
      totalCost: 156.75,
      cardsOwned: 12,
      cardsNeeded: 48
    }
  ];

  const generateDeckSuggestions = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsGenerating(false);
    toast({
      title: "Deck suggestions generated! ⚡",
      description: `Found ${deckSuggestions.length} optimized decks for ${selectedFormat} format`,
    });
  };

  const getTierColor = (tier: string) => {
    const colors: Record<string, string> = {
      'Tier 1': 'bg-energy-electric text-black',
      'Tier 2': 'bg-energy-psychic text-white',
      'Tier 3': 'bg-energy-fighting text-white',
      'Rogue': 'bg-muted text-muted-foreground'
    };
    return colors[tier] || 'bg-muted';
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors: Record<string, string> = {
      'Beginner': 'bg-energy-grass text-white',
      'Intermediate': 'bg-energy-water text-white', 
      'Advanced': 'bg-energy-fire text-white'
    };
    return colors[difficulty] || 'bg-muted';
  };

  const getCompletionPercentage = (owned: number, needed: number) => {
    const total = owned + needed;
    return Math.round((owned / total) * 100);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card className="bg-gradient-card border-2 border-primary/20 shadow-card">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Brain className="h-6 w-6 text-energy-psychic animate-float" />
            AI Deck Builder
            <Sparkles className="h-6 w-6 text-primary animate-energy-pulse" />
          </CardTitle>
          <p className="text-muted-foreground">
            Get personalized deck suggestions based on your collection and the current meta
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Format</label>
              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="Expanded">Expanded</SelectItem>
                  <SelectItem value="Casual">Casual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Playstyle</label>
              <Select value={selectedPlaystyle} onValueChange={setSelectedPlaystyle}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aggressive">Aggressive</SelectItem>
                  <SelectItem value="control">Control</SelectItem>
                  <SelectItem value="combo">Combo</SelectItem>
                  <SelectItem value="midrange">Midrange</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            variant="electric"
            size="xl"
            onClick={generateDeckSuggestions}
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Brain className="h-5 w-5 animate-spin" />
                Analyzing your collection...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Generate AI Deck Suggestions
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {!isGenerating && (
        <Tabs defaultValue="suggestions" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="suggestions" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Deck Suggestions
            </TabsTrigger>
            <TabsTrigger value="meta" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Meta Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="suggestions" className="space-y-4">
            <div className="grid gap-4">
              {deckSuggestions.map((deck) => (
                <Card key={deck.id} className="bg-gradient-card border-2 border-primary/20 shadow-card hover:shadow-glow transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{deck.name}</CardTitle>
                        <p className="text-muted-foreground">{deck.archetype} • {deck.format}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getTierColor(deck.metaTier)}>
                          {deck.metaTier}
                        </Badge>
                        <Badge className={getDifficultyColor(deck.difficulty)}>
                          {deck.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{deck.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Win Rate</p>
                        <p className="font-bold text-energy-electric">{deck.winRate}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Total Cost</p>
                        <p className="font-bold">${deck.totalCost}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Cards Owned</p>
                        <p className="font-bold text-energy-grass">{deck.cardsOwned}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Cards Needed</p>
                        <p className="font-bold text-pokeball-red">{deck.cardsNeeded}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">Collection Completion</p>
                        <p className="text-sm font-bold">
                          {getCompletionPercentage(deck.cardsOwned, deck.cardsNeeded)}%
                        </p>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-electric h-2 rounded-full transition-all duration-500"
                          style={{ width: `${getCompletionPercentage(deck.cardsOwned, deck.cardsNeeded)}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Key Cards</p>
                      <div className="flex flex-wrap gap-2">
                        {deck.mainCards.map((card, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {card}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button variant="outline" className="flex-1">
                        <Users className="h-4 w-4 mr-2" />
                        View Decklist
                      </Button>
                      <Button variant="pokeball" className="flex-1">
                        <Target className="h-4 w-4 mr-2" />
                        Build Deck
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="meta" className="space-y-4">
            <Card className="bg-gradient-card border-2 border-primary/20 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Current Meta Analysis
                </CardTitle>
                <p className="text-muted-foreground">
                  Tournament data from the last 30 days
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <Zap className="h-8 w-8 mx-auto text-energy-electric mb-2" />
                    <p className="font-semibold">Electric Decks</p>
                    <p className="text-2xl font-bold text-energy-electric">34%</p>
                    <p className="text-sm text-muted-foreground">Meta Share</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="h-8 w-8 mx-auto bg-energy-fire rounded-full mb-2" />
                    <p className="font-semibold">Fire Decks</p>
                    <p className="text-2xl font-bold text-energy-fire">28%</p>
                    <p className="text-sm text-muted-foreground">Meta Share</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="h-8 w-8 mx-auto bg-energy-psychic rounded-full mb-2" />
                    <p className="font-semibold">Psychic Decks</p>
                    <p className="text-2xl font-bold text-energy-psychic">21%</p>
                    <p className="text-sm text-muted-foreground">Meta Share</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Top Tournament Results</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span>Pikachu ex Control</span>
                      <Badge className="bg-energy-electric text-black">1st Place</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span>Charizard ex Aggro</span>
                      <Badge className="bg-energy-fire text-white">2nd Place</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span>Gardevoir Control</span>
                      <Badge className="bg-energy-psychic text-white">Top 4</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};