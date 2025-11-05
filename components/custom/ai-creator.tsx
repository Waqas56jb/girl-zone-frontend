"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useAiAttributes } from '@/hooks/use-api';
import { useApiMutation } from '@/hooks/use-api';
import { apiClient } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface AiCreatorProps {
  onClose: () => void;
  onSuccess: () => void;
}

interface AiFormData {
  name: string;
  gender: 'male' | 'female';
  style: 'realistic' | 'anime';
  personality_prompt?: string;
  hobbies?: string[];
  career?: string;
  personality?: string[];
  relationship?: string;
  family?: string;
  financial?: string;
  texting?: string;
  fetishes?: string[];
  initial_message?: string;
}

const attributeCategories = [
  'hobbies',
  'career',
  'personality',
  'relationship',
  'family',
  'financial',
  'texting',
  'fetishes',
];

const getSuggestedNames = (gender: string) => {
  return gender === 'male' 
    ? ['Alex', 'Jake', 'Ryan', 'Lucas', 'Ethan', 'Noah', 'Mason', 'Liam',
       'Owen', 'Caleb', 'Ben', 'Sam', 'Max', 'Leo', 'James', 'Henry']
    : ['Emily', 'Sara', 'Ruby', 'Sophie', 'Robin', 'Rachel', 'Phoebe',
       'Luna', 'Aria', 'Zoe', 'Maya', 'Lily', 'Nova', 'Ivy', 'Grace', 'Stella'];
};

export default function AiCreator({ onClose, onSuccess }: AiCreatorProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState<AiFormData>({
    name: '',
    gender: 'female',
    style: 'realistic',
    personality_prompt: '',
    hobbies: [],
    career: '',
    personality: [],
    relationship: '',
    family: '',
    financial: '',
    texting: '',
    fetishes: [],
    initial_message: '',
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [attributes, setAttributes] = useState<Record<string, string[]>>({});
  const { mutate: createCustomAi, loading } = useApiMutation();

  // Load attributes for all categories
  useEffect(() => {
    const loadAttributes = async () => {
      const loadedAttributes: Record<string, string[]> = {};
      
      for (const category of attributeCategories) {
        try {
          const response = await apiClient.getAiAttributes(category);
          if (response.success && response.data) {
            loadedAttributes[category] = (response.data as any[]).map((attr: any) => attr.value);
          }
        } catch (error) {
          console.error(`Failed to load ${category} attributes:`, error);
          // Set empty array as fallback to prevent component errors
          loadedAttributes[category] = [];
        }
      }
      
      setAttributes(loadedAttributes);
    };

    loadAttributes().catch(error => {
      console.error('Error loading attributes:', error);
      // Set empty attributes to prevent component crashes
      setAttributes({});
    });
  }, []);

  const handleInputChange = (field: keyof AiFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field: 'hobbies' | 'personality' | 'fetishes', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field]?.includes(value)
        ? prev[field]?.filter(item => item !== value)
        : [...(prev[field] || []), value]
    }));
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error('You must be logged in to create a custom AI');
      return;
    }

    if (!formData.name.trim()) {
      toast.error('Please enter a name for your AI');
      return;
    }

    // Map the form data to backend expected format
    const submissionData = {
      ...formData,
      ethnicity: 'caucasian', // Default value
      age_range: 'twenties', // Default value
      hairstyle: 'straight', // Default value
      hair_length: 'long', // Default value
      hair_color: 'brunette', // Default value
      eye_color: 'brown', // Default value
      body_type: 'slim', // Default value
      breast_size: 'average', // Default value
      ass_size: 'average', // Default value
      personality_traits: formData.personality, // Map personality to personality_traits
      family_background: formData.family, // Map family to family_background
      financial_status: formData.financial, // Map financial to financial_status
      texting_style: formData.texting, // Map texting to texting_style
    };

    try {
      const result = await createCustomAi(
        (data: any) => apiClient.createCustomAi(data),
        submissionData
      );

      if (result) {
        toast.success('Custom AI created successfully!');
        onSuccess();
        onClose();
      }
    } catch (error) {
      toast.error('Failed to create custom AI');
    }
  };

  const steps = [
    { title: 'Basic Info', fields: ['name', 'gender', 'style'] },
    { title: 'Personality', fields: ['personality', 'hobbies', 'career', 'relationship'] },
    { title: 'Background', fields: ['family', 'financial', 'texting', 'fetishes'] },
    { title: 'Final', fields: ['personality_prompt', 'initial_message'] },
  ];

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  // Check if current step is valid
  const isCurrentStepValid = () => {
    if (currentStep === 0) {
      return formData.name.trim() !== '' && formData.gender && formData.style;
    }
    return true; // For now, allow navigation to other steps
  };

  const renderField = (field: string) => {
    switch (field) {
      case 'name':
        return (
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter AI name"
              className="bg-slate-800/50 border-slate-600 text-white"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {getSuggestedNames(formData.gender).map(name => (
                <Button
                  key={name}
                  variant="outline"
                  size="sm"
                  onClick={() => handleInputChange('name', name)}
                  className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                >
                  {name}
                </Button>
              ))}
            </div>
          </div>
        );

      case 'gender':
      case 'style':
        const options = field === 'gender' 
          ? [['male', 'Male'], ['female', 'Female']]
          : [['realistic', 'Realistic'], ['anime', 'Anime']];
        
        return (
          <div className="space-y-2">
            <Label className="text-white">{field === 'gender' ? 'Gender' : 'Style'}</Label>
            <div className="flex gap-2">
              {options.map(([value, label]) => (
                <Button
                  key={value}
                  variant={formData[field as keyof AiFormData] === value ? 'default' : 'outline'}
                  onClick={() => handleInputChange(field as keyof AiFormData, value)}
                  className={cn(
                    'flex-1',
                    formData[field as keyof AiFormData] === value
                      ? 'bg-purple-600 hover:bg-purple-700'
                      : 'bg-slate-700 border-slate-600 text-white hover:bg-slate-600'
                  )}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
        );

      case 'personality_prompt':
        return (
          <div className="space-y-2">
            <Label htmlFor="personality_prompt" className="text-white">Custom Personality Prompt</Label>
            <Textarea
              id="personality_prompt"
              value={formData.personality_prompt || ''}
              onChange={(e) => handleInputChange('personality_prompt', e.target.value)}
              placeholder="Describe your AI's personality in detail..."
              className="bg-slate-800/50 border-slate-600 text-white min-h-[100px]"
            />
          </div>
        );

      case 'initial_message':
        return (
          <div className="space-y-2">
            <Label htmlFor="initial_message" className="text-white">Initial Message</Label>
            <Textarea
              id="initial_message"
              value={formData.initial_message || ''}
              onChange={(e) => handleInputChange('initial_message', e.target.value)}
              placeholder="What should your AI say when you first start chatting?"
              className="bg-slate-800/50 border-slate-600 text-white min-h-[100px]"
            />
          </div>
        );

      default:
        const fieldAttributes = attributes[field] || [];
        const isArrayField = ['hobbies', 'personality', 'fetishes'].includes(field);
        
        if (isArrayField) {
          return (
            <div className="space-y-2">
              <Label className="text-white">{field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</Label>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {fieldAttributes.length > 0 ? (
                  fieldAttributes.map(attr => (
                    <Button
                      key={attr}
                      variant={formData[field as keyof AiFormData]?.includes(attr) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleArrayChange(field as 'hobbies' | 'personality' | 'fetishes', attr)}
                      className={cn(
                        'text-xs',
                        formData[field as keyof AiFormData]?.includes(attr)
                          ? 'bg-purple-600 hover:bg-purple-700'
                          : 'bg-slate-700 border-slate-600 text-white hover:bg-slate-600'
                      )}
                    >
                      {attr}
                    </Button>
                  ))
                ) : (
                  <div className="text-gray-400 text-sm">Loading options...</div>
                )}
              </div>
            </div>
          );
        }

        return (
          <div className="space-y-2">
            <Label className="text-white">{field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</Label>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {fieldAttributes.length > 0 ? (
                fieldAttributes.map(attr => (
                  <Button
                    key={attr}
                    variant={formData[field as keyof AiFormData] === attr ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleInputChange(field as keyof AiFormData, attr)}
                    className={cn(
                      'text-xs',
                      formData[field as keyof AiFormData] === attr
                        ? 'bg-purple-600 hover:bg-purple-700'
                        : 'bg-slate-700 border-slate-600 text-white hover:bg-slate-600'
                    )}
                  >
                    {attr}
                  </Button>
                ))
              ) : (
                <div className="text-gray-400 text-sm">Loading options...</div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-slate-900 border-slate-700 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Create Custom AI</h2>
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </Button>
          </div>
          
          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <h3 className="text-lg font-semibold text-white mb-4">{currentStepData.title}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentStepData.fields.map(field => (
              <div key={field}>
                {renderField(field)}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-slate-700 flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(currentStep - 1)}
            disabled={isFirstStep}
            className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
          >
            Previous
          </Button>
          
          {isLastStep ? (
            <Button
              onClick={handleSubmit}
              disabled={loading || !user}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {loading ? 'Creating...' : 'Create AI'}
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!isCurrentStepValid()}
              className="bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50"
            >
              Next
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
