import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Package, TrendingUp, Star } from 'lucide-react';

interface CollectionCard {
  id: string;
  name: string;
  set: string;
  rarity: string;
  type: string;
  price: number;
  quantity: number;
  condition: 'Mint' | 'Near Mint' | 'Lightly Played' | 'Moderately Played' | 'Heavily Played';
  dateAdded: string;
}

export const InventoryManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterRarity, setFilterRarity] = useState('all');
  const [sortBy, setSortBy] = useState('dateAdded');

  // Mock collection data
  const [collection] = useState<CollectionCard[]>([
    {
      id: '1',
      name: 'Pikachu V',
      set: 'Vivid Voltage',
      rarity: 'Ultra Rare',
      type: 'Electric',
      price: 24.99,
      quantity: 2,
      condition: 'Mint',
      dateAdded: '2024-01-15'
    },
    {
      id: '2',
      name: 'Charizard VMAX',
      set: 'Silver Tempest',
      rarity: 'Secret Rare',
      type: 'Fire',
      price: 89.99,
      quantity: 1,
      condition: 'Near Mint',
      dateAdded: '2024-01-10'
    },
    {
      id: '3',
      name: 'Gardevoir ex',
      set: 'Brilliant Stars',
      rarity: 'Ultra Rare',
      type: 'Psychic',
      price: 15.50,
      quantity: 3,
      condition: 'Mint',
      dateAdded: '2024-01-20'
    },
    {
      id: '4',
      name: 'Lucario V',
      set: 'Astral Radiance',
      rarity: 'Ultra Rare',
      type: 'Fighting',
      price: 12.75,
      quantity: 1,
      condition: 'Lightly Played',
      dateAdded: '2024-01-05'
    }
  ]);

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      Electric: 'bg-energy-electric',
      Fire: 'bg-energy-fire',
      Water: 'bg-energy-water',
      Grass: 'bg-energy-grass',
      Psychic: 'bg-energy-psychic',
      Fighting: 'bg-energy-fighting',
    };
    return colors[type] || 'bg-primary';
  };

  const getRarityColor = (rarity: string) => {
    const colors: Record<string, string> = {
      'Secret Rare': 'bg-gradient-to-r from-purple-500 to-pink-500',
      'Ultra Rare': 'bg-gradient-to-r from-yellow-400 to-orange-500',
      'Rare': 'bg-gradient-to-r from-blue-400 to-blue-600',
      'Uncommon': 'bg-gray-400',
      'Common': 'bg-gray-300'
    };
    return colors[rarity] || 'bg-gray-400';
  };

  const filteredCollection = collection.filter(card => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.set.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || card.type.toLowerCase() === filterType;
    const matchesRarity = filterRarity === 'all' || card.rarity.toLowerCase().replace(' ', '') === filterRarity;
    
    return matchesSearch && matchesType && matchesRarity;
  });

  const totalValue = collection.reduce((sum, card) => sum + (card.price * card.quantity), 0);
  const totalCards = collection.reduce((sum, card) => sum + card.quantity, 0);
  const uniqueCards = collection.length;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-card border-2 border-primary/20 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold text-energy-electric">
                  ${totalValue.toFixed(2)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-energy-electric animate-float" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-2 border-primary/20 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Cards</p>
                <p className="text-2xl font-bold text-pokeball-blue">
                  {totalCards}
                </p>
              </div>
              <Package className="h-8 w-8 text-pokeball-blue animate-float" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-2 border-primary/20 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Unique Cards</p>
                <p className="text-2xl font-bold text-pokeball-red">
                  {uniqueCards}
                </p>
              </div>
              <Star className="h-8 w-8 text-pokeball-red animate-float" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-gradient-card border-2 border-primary/20 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Collection Manager
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search cards or sets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="electric">Electric</SelectItem>
                <SelectItem value="fire">Fire</SelectItem>
                <SelectItem value="water">Water</SelectItem>
                <SelectItem value="grass">Grass</SelectItem>
                <SelectItem value="psychic">Psychic</SelectItem>
                <SelectItem value="fighting">Fighting</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterRarity} onValueChange={setFilterRarity}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by rarity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Rarities</SelectItem>
                <SelectItem value="secretrare">Secret Rare</SelectItem>
                <SelectItem value="ultrarare">Ultra Rare</SelectItem>
                <SelectItem value="rare">Rare</SelectItem>
                <SelectItem value="uncommon">Uncommon</SelectItem>
                <SelectItem value="common">Common</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Collection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCollection.map((card) => (
          <Card key={card.id} className="bg-gradient-card border-2 border-primary/20 shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{card.name}</CardTitle>
                <Badge className={`${getTypeColor(card.type)} text-white`}>
                  {card.type}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{card.set}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <Badge className={`${getRarityColor(card.rarity)} text-white`}>
                  {card.rarity}
                </Badge>
                <span className="text-lg font-bold text-energy-electric">
                  ${card.price}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Quantity</p>
                  <p className="font-semibold">×{card.quantity}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Condition</p>
                  <p className="font-semibold">{card.condition}</p>
                </div>
              </div>

              <div className="pt-2 border-t">
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-lg font-bold text-energy-electric">
                  ${(card.price * card.quantity).toFixed(2)}
                </p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
                <Button variant="pokeball" size="sm" className="flex-1">
                  Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCollection.length === 0 && (
        <Card className="bg-gradient-card border-2 border-primary/20 shadow-card">
          <CardContent className="text-center py-12">
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No cards found</p>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};