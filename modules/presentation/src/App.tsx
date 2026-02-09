import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap, Layers, TrendingUp, CheckCircle, Sparkles, Box, Workflow, Clock, DollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Slide {
  id: number;
  type: 'title' | 'content' | 'comparison' | 'features' | 'benefits' | 'cta';
  title: string;
  subtitle?: string;
  content?: string[];
  features?: { icon: React.ReactNode; title: string; description: string }[];
  comparison?: { traditional: string[]; ai: string[] };
  benefits?: { icon: React.ReactNode; title: string; value: string }[];
}

const slides: Slide[] = [
  {
    id: 1,
    type: 'title',
    title: 'Playbook Solutions',
    subtitle: 'Revolutionizing Traditional Art Workflow with 3D Gen AI',
  },
  {
    id: 2,
    type: 'content',
    title: 'The Problem',
    subtitle: 'Traditional 3D Art Workflow Challenges',
    content: [
      'Time-consuming manual modeling and texturing',
      'Steep learning curve for 3D software',
      'Limited iteration speed for creative exploration',
      'High costs for specialized talent and tools',
      'Difficulty in rapid prototyping and concept validation',
    ],
  },
  {
    id: 3,
    type: 'content',
    title: 'The Solution',
    subtitle: '3D Gen AI: Your Creative Accelerator',
    content: [
      'AI-powered 3D asset generation from text or images',
      'Instant iterations and variations',
      'Seamless integration with existing workflows',
      'Democratized access to professional 3D creation',
      'Accelerate from concept to production',
    ],
  },
  {
    id: 4,
    type: 'features',
    title: '3D Gen AI Features',
    subtitle: 'Cutting-Edge Technology at Your Fingertips',
    features: [
      {
        icon: <Sparkles className="w-8 h-8" />,
        title: 'Text-to-3D Generation',
        description: 'Transform descriptions into detailed 3D models instantly',
      },
      {
        icon: <Box className="w-8 h-8" />,
        title: 'Smart Asset Library',
        description: 'Access AI-curated and generated asset collections',
      },
      {
        icon: <Layers className="w-8 h-8" />,
        title: 'Auto-Texturing',
        description: 'Intelligent material and texture application',
      },
      {
        icon: <Workflow className="w-8 h-8" />,
        title: 'Pipeline Integration',
        description: 'Seamless export to industry-standard tools',
      },
    ],
  },
  {
    id: 5,
    type: 'comparison',
    title: 'Workflow Comparison',
    subtitle: 'Traditional vs AI-Enhanced Process',
    comparison: {
      traditional: [
        'Concept sketching: 2-4 hours',
        'Manual modeling: 8-16 hours',
        'UV mapping: 2-4 hours',
        'Texturing: 4-8 hours',
        'Iterations: Days per change',
        'Total: 2-4 days per asset',
      ],
      ai: [
        'AI prompt creation: 5-10 minutes',
        'AI generation: 2-5 minutes',
        'Refinement: 30-60 minutes',
        'Export & integration: 15 minutes',
        'Iterations: Minutes per change',
        'Total: 1-2 hours per asset',
      ],
    },
  },
  {
    id: 6,
    type: 'benefits',
    title: 'Key Benefits',
    subtitle: 'Transform Your Creative Output',
    benefits: [
      { icon: <Clock className="w-6 h-6" />, title: 'Time Saved', value: '90%' },
      { icon: <DollarSign className="w-6 h-6" />, title: 'Cost Reduction', value: '75%' },
      { icon: <TrendingUp className="w-6 h-6" />, title: 'Productivity Boost', value: '10x' },
      { icon: <Users className="w-6 h-6" />, title: 'Team Efficiency', value: '5x' },
    ],
  },
  {
    id: 7,
    type: 'cta',
    title: 'Ready to Transform Your Workflow?',
    subtitle: 'Join the future of 3D content creation',
    content: [
      'Start your free trial today',
      'No credit card required',
      'Full access to all features',
    ],
  },
];

const PresentationSlideshow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const slide = slides[currentSlide];

  const renderSlideContent = () => {
    switch (slide.type) {
      case 'title':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-8 animate-in fade-in">
            <div className="relative">
              <div className="absolute inset-0 blur-3xl opacity-30 bg-[#CCFF00]" />
              <Zap className="w-24 h-24 text-[#CCFF00] relative animate-pulse" />
            </div>
            <h1 className="text-7xl font-bold text-white tracking-tight">
              {slide.title}
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-[#CCFF00] to-transparent" />
            <p className="text-3xl text-gray-300 max-w-3xl leading-relaxed">
              {slide.subtitle}
            </p>
            <Badge className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 text-lg px-6 py-2 mt-8">
              Next Generation Technology
            </Badge>
          </div>
        );

      case 'content':
        return (
          <div className="flex flex-col h-full justify-center space-y-8 animate-in fade-in slide-in-from-right-10">
            <div className="space-y-4">
              <Badge className="bg-[#CCFF00]/20 text-[#CCFF00] border border-[#CCFF00]/50 hover:bg-[#CCFF00]/30">
                {slide.id === 2 ? 'Problem' : 'Solution'}
              </Badge>
              <h2 className="text-6xl font-bold text-white">{slide.title}</h2>
              <p className="text-2xl text-gray-400">{slide.subtitle}</p>
            </div>
            <div className="space-y-4 mt-8">
              {slide.content?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-[#CCFF00]/50 transition-all duration-300 animate-in fade-in slide-in-from-left-5"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CheckCircle className="w-6 h-6 text-[#CCFF00] flex-shrink-0 mt-1" />
                  <p className="text-xl text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'features':
        return (
          <div className="flex flex-col h-full justify-center space-y-8 animate-in fade-in">
            <div className="space-y-4 text-center">
              <Badge className="bg-[#CCFF00]/20 text-[#CCFF00] border border-[#CCFF00]/50 hover:bg-[#CCFF00]/30">
                Features
              </Badge>
              <h2 className="text-6xl font-bold text-white">{slide.title}</h2>
              <p className="text-2xl text-gray-400">{slide.subtitle}</p>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-8">
              {slide.features?.map((feature, index) => (
                <Card
                  key={index}
                  className="bg-white/5 border-white/10 hover:border-[#CCFF00]/50 transition-all duration-300 p-6 space-y-4 animate-in fade-in zoom-in-95"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="w-16 h-16 rounded-lg bg-[#CCFF00]/10 flex items-center justify-center text-[#CCFF00]">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                  <p className="text-lg text-gray-400">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'comparison':
        return (
          <div className="flex flex-col h-full justify-center space-y-8 animate-in fade-in">
            <div className="space-y-4 text-center">
              <Badge className="bg-[#CCFF00]/20 text-[#CCFF00] border border-[#CCFF00]/50 hover:bg-[#CCFF00]/30">
                Comparison
              </Badge>
              <h2 className="text-6xl font-bold text-white">{slide.title}</h2>
              <p className="text-2xl text-gray-400">{slide.subtitle}</p>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-8">
              <Card className="bg-red-950/20 border-red-500/30 p-8 space-y-4">
                <h3 className="text-3xl font-bold text-red-400 mb-6">Traditional Workflow</h3>
                {slide.comparison?.traditional.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 text-gray-300 animate-in fade-in slide-in-from-left-5"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="text-red-400">•</span>
                    <p className="text-lg">{item}</p>
                  </div>
                ))}
              </Card>
              <Card className="bg-[#CCFF00]/10 border-[#CCFF00]/50 p-8 space-y-4">
                <h3 className="text-3xl font-bold text-[#CCFF00] mb-6">AI-Enhanced Workflow</h3>
                {slide.comparison?.ai.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 text-gray-300 animate-in fade-in slide-in-from-right-5"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CheckCircle className="w-5 h-5 text-[#CCFF00] flex-shrink-0 mt-0.5" />
                    <p className="text-lg">{item}</p>
                  </div>
                ))}
              </Card>
            </div>
          </div>
        );

      case 'benefits':
        return (
          <div className="flex flex-col h-full justify-center space-y-8 animate-in fade-in">
            <div className="space-y-4 text-center">
              <Badge className="bg-[#CCFF00]/20 text-[#CCFF00] border border-[#CCFF00]/50 hover:bg-[#CCFF00]/30">
                Impact
              </Badge>
              <h2 className="text-6xl font-bold text-white">{slide.title}</h2>
              <p className="text-2xl text-gray-400">{slide.subtitle}</p>
            </div>
            <div className="grid grid-cols-4 gap-6 mt-8">
              {slide.benefits?.map((benefit, index) => (
                <Card
                  key={index}
                  className="bg-white/5 border-white/10 hover:border-[#CCFF00]/50 transition-all duration-300 p-8 space-y-4 text-center animate-in fade-in zoom-in-95"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="w-16 h-16 rounded-full bg-[#CCFF00]/10 flex items-center justify-center text-[#CCFF00] mx-auto">
                    {benefit.icon}
                  </div>
                  <div className="text-5xl font-bold text-[#CCFF00]">{benefit.value}</div>
                  <p className="text-xl text-gray-300">{benefit.title}</p>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'cta':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-8 animate-in fade-in">
            <div className="relative">
              <div className="absolute inset-0 blur-3xl opacity-30 bg-[#CCFF00]" />
              <Sparkles className="w-24 h-24 text-[#CCFF00] relative animate-pulse" />
            </div>
            <h2 className="text-6xl font-bold text-white max-w-4xl leading-tight">
              {slide.title}
            </h2>
            <p className="text-3xl text-gray-300">{slide.subtitle}</p>
            <div className="space-y-3 mt-8">
              {slide.content?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center space-x-3 text-xl text-gray-400"
                >
                  <CheckCircle className="w-6 h-6 text-[#CCFF00]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-12">
              <Button
                size="lg"
                className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 text-xl px-12 py-6 h-auto font-bold"
              >
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#CCFF00] text-[#CCFF00] hover:bg-[#CCFF00]/10 text-xl px-12 py-6 h-auto"
              >
                Watch Demo
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(57,255,20,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(57,255,20,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#CCFF00]/5 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#CCFF00]/5 blur-[150px] rounded-full" />

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Slide Content */}
        <div className="flex-1 px-16 py-12">
          <div className="h-full max-w-7xl mx-auto">
            {renderSlideContent()}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="px-16 pb-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Progress Dots */}
            <div className="flex items-center space-x-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'w-12 bg-[#CCFF00]'
                      : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Slide Counter */}
            <div className="text-gray-400 text-lg font-mono">
              {currentSlide + 1} / {slides.length}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="border-white/20 text-white hover:bg-white/10 hover:text-[#CCFF00] disabled:opacity-30"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                disabled={currentSlide === slides.length - 1}
                className="border-white/20 text-white hover:bg-white/10 hover:text-[#CCFF00] disabled:opacity-30"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-600 text-sm">
        Use arrow keys to navigate
      </div>
    </div>
  );
};

export default PresentationSlideshow;
