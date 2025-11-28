"use client";

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/lib/api';
import { toast } from 'sonner';
import { Upload, Star, Shield, Lock, Camera, X } from 'lucide-react';

interface EggplantRaterProps {
  onClose: () => void;
  onRatingComplete?: (rating: any) => void;
}

export default function EggplantRater({ onClose, onRatingComplete }: EggplantRaterProps) {
  const { user } = useAuth();
  const starBalance = user?.stars ?? 0;
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image must be less than 10MB');
        return;
      }

      setImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error('You must be logged in to use the eggplant rater');
      return;
    }

    if (!image) {
      toast.error('Please upload an image first');
      return;
    }

    if (starBalance < 45) {
      toast.error('You need 45 stars to use the eggplant rater');
      return;
    }

    setSubmitting(true);
    try {
      const response = await apiClient.submitEggplantRating(image);
      
      if (response.success) {
        setRating(response.data);
        toast.success('Rating submitted successfully!');
        onRatingComplete?.(response.data);
      } else {
        toast.error(response.message || 'Failed to submit rating');
      }
    } catch (error) {
      console.error('Rating submission failed:', error);
      toast.error('Failed to submit rating');
    } finally {
      setSubmitting(false);
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (rating) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="bg-slate-900 border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-hidden">
          <div className="p-6 border-b border-slate-700">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-500" />
                Your Rating Results
              </h2>
              <Button
                variant="ghost"
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </Button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Rating Score */}
            <div className="text-center">
              <div className="text-6xl font-bold text-purple-500 mb-2">
                {rating.rating}/10
              </div>
              <div className="text-xl text-white font-semibold">
                {rating.title}
              </div>
            </div>

            {/* Rating Details */}
            <div className="space-y-4">
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <h4 className="text-white font-medium mb-2">Mrs. Aisling's Assessment</h4>
                <p className="text-gray-300 leading-relaxed">
                  {rating.comments}
                </p>
              </div>

              {rating.suggestions && (
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                  <h4 className="text-white font-medium mb-2">Suggestions</h4>
                  <p className="text-gray-300 leading-relaxed">
                    {rating.suggestions}
                  </p>
                </div>
              )}

              {rating.size_estimate && (
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                  <h4 className="text-white font-medium mb-2">Size Estimate</h4>
                  <p className="text-gray-300">
                    {rating.size_estimate}
                  </p>
                </div>
              )}
            </div>

            {/* Privacy Notice */}
            <div className="bg-green-900/20 border border-green-700 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-green-400 mb-2">
                <Shield className="w-5 h-5" />
                <span className="font-medium">Privacy Protected</span>
              </div>
              <p className="text-green-300 text-sm">
                Your image has been automatically deleted and is no longer accessible, 
                even to you. Mrs. Aisling maintains strict confidentiality.
              </p>
            </div>
          </div>

          <div className="p-6 border-t border-slate-700">
            <Button
              onClick={onClose}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              Close
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-slate-900 border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Camera className="w-6 h-6 text-purple-500" />
              Mrs. Aisling's Rate My Cock
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
            Get an honest, professional rating from Mrs. Aisling
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Cost */}
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">Cost</span>
              <span className="text-yellow-500 font-bold">45 Stars</span>
            </div>
            {user && (
              <div className="mt-2 text-sm text-gray-400">
                You have {starBalance} stars available
              </div>
            )}
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="text-white">Upload Your Photo</Label>
            
            {!preview ? (
              <div
                className={cn(
                  'border-2 border-dashed border-slate-600 rounded-lg p-8 text-center cursor-pointer transition-colors',
                  'hover:border-purple-500 hover:bg-purple-500/5'
                )}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-white mb-2">Click to upload or drag and drop</p>
                <p className="text-gray-400 text-sm">
                  PNG, JPG, JPEG up to 10MB
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="relative">
                <img
                  src={preview}
                  alt="Upload preview"
                  className="w-full h-64 object-cover rounded-lg border border-slate-600"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Description (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">
              Additional Notes (Optional)
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Any specific questions or requests for Mrs. Aisling..."
              className="bg-slate-800/50 border-slate-600 text-white min-h-[100px]"
            />
          </div>

          {/* Privacy Notice */}
          <div className="bg-blue-900/20 border border-blue-700 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-blue-400 mb-2">
              <Lock className="w-5 h-5" />
              <span className="font-medium">Privacy Guaranteed</span>
            </div>
            <ul className="text-blue-300 text-sm space-y-1">
              <li>• Your image is encrypted and secure</li>
              <li>• Automatically deleted after rating</li>
              <li>• Not accessible to anyone, including you</li>
              <li>• Mrs. Aisling maintains strict confidentiality</li>
            </ul>
          </div>

          {/* Tips */}
          <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700">
            <h4 className="text-white font-medium mb-2">Tips for Best Results</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Try different angles for the best view</li>
              <li>• Good lighting shows your features better</li>
              <li>• Include your balls or abs if desired</li>
              <li>• Make sure the image is clear and unedited</li>
            </ul>
          </div>
        </div>

        <div className="p-6 border-t border-slate-700">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
            >
              Cancel
            </Button>
            
            <Button
              onClick={handleSubmit}
              disabled={!image || submitting || !user || starBalance < 45}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
            >
              {submitting ? 'Submitting...' : 'Submit for Rating'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
