"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useStarPackages } from '@/hooks/use-api';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Star, Crown, Zap } from 'lucide-react';

interface StarPackagesProps {
  onClose: () => void;
  onPurchase?: () => void;
}

export default function StarPackages({ onClose, onPurchase }: StarPackagesProps) {
  const { user } = useAuth();
  const starBalance = user?.stars ?? 0;
  const { data: packages = [], loading, error } = useStarPackages() as { data: any[]; loading: boolean; error: string | null };
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [purchasing, setPurchasing] = useState(false);

  const handlePurchase = async (packageId: number) => {
    if (!user) {
      toast.error('You must be logged in to purchase stars');
      return;
    }

    setPurchasing(true);
    try {
      // In a real app, you would integrate with Stripe or another payment provider
      // For now, we'll simulate the purchase
      toast.success('Stars purchased successfully! (Demo mode)');
      setSelectedPackage(null);
      onPurchase?.();
    } catch (error) {
      toast.error('Failed to purchase stars');
    } finally {
      setPurchasing(false);
    }
  };

  const getPackageIcon = (packageData: any) => {
    if (packageData.is_popular) return <Crown className="w-5 h-5" />;
    if (packageData.stars >= 3600) return <Zap className="w-5 h-5" />;
    return <Star className="w-5 h-5" />;
  };

  const getPackageColor = (packageData: any) => {
    if (packageData.is_popular) return 'border-purple-500 bg-purple-500/10';
    if (packageData.stars >= 3600) return 'border-orange-500 bg-orange-500/10';
    return 'border-slate-600 bg-slate-800/50';
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="bg-slate-900 border-slate-700 p-8">
          <div className="text-white text-center">Loading packages...</div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="bg-slate-900 border-slate-700 p-8">
          <div className="text-red-400 text-center mb-4">Failed to load packages</div>
          <Button onClick={onClose} className="bg-slate-700 text-white">
            Close
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-slate-900 border-slate-700 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500" />
              Star Packages
            </h2>
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </Button>
          </div>
          <p className="text-gray-400 mt-2">
            Buy stars to generate images, create characters, and unlock premium features
          </p>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {packages?.map((packageData: any) => (
              <Card
                key={packageData.id}
                className={cn(
                  'p-6 border-2 transition-all duration-200 cursor-pointer hover:scale-105',
                  getPackageColor(packageData),
                  selectedPackage === packageData.id ? 'ring-2 ring-purple-500' : ''
                )}
                onClick={() => setSelectedPackage(packageData.id)}
              >
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    {getPackageIcon(packageData)}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {packageData.name}
                  </h3>
                  
                  {packageData.is_popular && (
                    <Badge className="bg-purple-600 text-white mb-3">
                      Popular
                    </Badge>
                  )}
                  
                  <div className="text-3xl font-bold text-white mb-2">
                    {packageData.formatted_price}
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-300 mb-4">
                    <div className="flex justify-between">
                      <span>Base Stars:</span>
                      <span className="text-white">{packageData.stars.toLocaleString()}</span>
                    </div>
                    
                    {packageData.bonus_stars > 0 && (
                      <div className="flex justify-between text-green-400">
                        <span>Bonus Stars:</span>
                        <span>+{packageData.bonus_stars.toLocaleString()}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between font-semibold text-white border-t border-slate-600 pt-2">
                      <span>Total Stars:</span>
                      <span>{packageData.total_stars.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-400">
                    {packageData.price_per_star > 0 
                      ? `${packageData.price_per_star.toFixed(3)} per star`
                      : 'Best value'
                    }
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Current user stars */}
          {user && (
            <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-white font-medium">Your Stars</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {starBalance.toLocaleString()}
                </div>
              </div>
              
              {user.has_premium_subscription && (
                <div className="mt-2 text-sm text-green-400">
                  Premium subscriber - 100 free stars monthly
                </div>
              )}
            </div>
          )}

          {/* Pricing info */}
          <div className="mt-6 p-4 bg-slate-800/30 rounded-lg border border-slate-700">
            <h4 className="text-white font-medium mb-2">Star Usage Costs</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-300">
              <div>Voice message: <span className="text-white">2 stars</span></div>
              <div>Generate picture: <span className="text-white">7 stars</span></div>
              <div>Create character: <span className="text-white">14 stars</span></div>
              <div>Send picture: <span className="text-white">20 stars</span></div>
              <div>Eggplant rating: <span className="text-white">45 stars</span></div>
              <div>Premium subscription: <span className="text-white">€19.95/month</span></div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-700">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-400">
              {selectedPackage ? 'Selected package' : 'Choose a package to purchase'}
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
              >
                Cancel
              </Button>
              
              {selectedPackage && (
                <Button
                  onClick={() => handlePurchase(selectedPackage)}
                  disabled={purchasing || !user}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {purchasing ? 'Processing...' : 'Purchase Stars'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
