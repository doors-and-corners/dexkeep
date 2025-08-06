import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Package, Brain, Zap, Menu, X } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      id: 'scanner',
      label: 'Card Scanner',
      icon: Camera,
      description: 'Scan & identify cards'
    },
    {
      id: 'inventory',
      label: 'My Collection',
      icon: Package,
      description: 'Manage your cards'
    },
    {
      id: 'deckbuilder',
      label: 'Deck Builder',
      icon: Brain,
      description: 'AI-powered suggestions'
    }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <Card className="hidden md:block bg-gradient-card border-2 border-primary/20 shadow-card mb-6">
        <div className="p-6">
          <div className="flex items-center justify-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "electric" : "ghost"}
                  size="lg"
                  onClick={() => onTabChange(item.id)}
                  className={`flex flex-col items-center gap-2 h-auto py-4 px-6 ${
                    isActive ? 'scale-105' : 'hover:scale-105'
                  } transition-all duration-300`}
                >
                  <Icon className={`h-6 w-6 ${isActive ? 'animate-energy-pulse' : ''}`} />
                  <div className="text-center">
                    <div className="font-semibold">{item.label}</div>
                    <div className="text-xs opacity-80">{item.description}</div>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Mobile Navigation */}
      <div className="md:hidden mb-6">
        <Card className="bg-gradient-card border-2 border-primary/20 shadow-card">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Zap className="h-6 w-6 text-energy-electric animate-energy-pulse" />
                <span className="font-bold text-lg">Pokémon TCG</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>

            {isMobileMenuOpen && (
              <div className="mt-4 space-y-2 animate-bounce-in">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  
                  return (
                    <Button
                      key={item.id}
                      variant={isActive ? "electric" : "ghost"}
                      onClick={() => {
                        onTabChange(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full justify-start gap-3"
                    >
                      <Icon className="h-5 w-5" />
                      <div className="text-left">
                        <div className="font-semibold">{item.label}</div>
                        <div className="text-xs opacity-80">{item.description}</div>
                      </div>
                      {isActive && (
                        <Badge variant="secondary" className="ml-auto">
                          Active
                        </Badge>
                      )}
                    </Button>
                  );
                })}
              </div>
            )}
          </div>
        </Card>
      </div>
    </>
  );
};