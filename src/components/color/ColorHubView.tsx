import React, { useState } from 'react';
import { 
  Palette, 
  Sparkles, 
  Copy, 
  Check, 
  ArrowRight, 
  SlidersHorizontal,
  Compass,
  Layers,
  Heart
} from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { ProductCard } from '../shop/ProductCard';

export const ColorHubView: React.FC = () => {
  const { 
    colorPresets, 
    products, 
    setSelectedColorHex, 
    selectedColorHex, 
    setActiveView, 
    addToast 
  } = useCommerce();

  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [activePaletteId, setActivePaletteId] = useState<string>(colorPresets[0]?.id || '');

  const handleCopy = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    addToast(`Copied ${hex}`, 'HEX code copied to clipboard', 'info');
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const handleFilterByColor = (hex: string) => {
    setSelectedColorHex(hex);
    setActiveView('shop');
    addToast(`Filtering by ${hex}`, 'Showing all products featuring this color code.');
  };

  // Color psychology and design moods
  const colorMoods = [
    {
      title: 'Warm Earth & Desert Minerals',
      description: 'Grounded, inviting, natural ceramics and organic cotton apparel.',
      hexList: ['#C2410C', '#D97706', '#EA580C', '#FEF3C7', '#451A03']
    },
    {
      title: 'Nordic Serenity & Monochromes',
      description: 'Brutalist clarity, titanium acoustics, and clean architectural lines.',
      hexList: ['#0F172A', '#334155', '#94A3B8', '#F8FAFC', '#18181B']
    },
    {
      title: 'Bioluminescent & Cyberpunk Neons',
      description: 'Electrifying UI components, RGB mechanical devices, and futuristic contrast.',
      hexList: ['#06B6D4', '#EC4899', '#8B5CF6', '#84CC16', '#F43F5E']
    },
    {
      title: 'Botanical Emerald & Forest Vitality',
      description: 'Lush wellness elixirs, active yoga essentials, and biophilic interior pieces.',
      hexList: ['#166534', '#15803D', '#4D7C0F', '#064E3B', '#86EFAC']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10 border border-amber-200/40 text-xs font-bold text-slate-800">
          <Palette className="w-4 h-4 text-indigo-600" />
          <span>CHROMATIC ARCHITECTURE STUDIO</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Shop by Precision Color Codes & Harmonious Palettes
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Explore calibrated HEX codes, test color combinations, and discover merchandise tailored to your exact visual aesthetic.
        </p>
      </div>

      {/* Curated Color Palettes Cards */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold text-slate-900">Curated Marketplace Palettes</h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">1-Click HEX Copy or Filter</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colorPresets.map((preset) => (
            <div
              key={preset.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-lg transition-all space-y-4"
            >
              <div>
                <h3 className="font-bold text-slate-900 text-base">{preset.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{preset.description}</p>
              </div>

              {/* Swatch bars */}
              <div className="grid grid-cols-4 gap-2 pt-2">
                {preset.colors.map((c) => (
                  <div key={c.hex} className="group flex flex-col items-center">
                    <button
                      onClick={() => handleFilterByColor(c.hex)}
                      className="w-full aspect-square rounded-2xl shadow-inner border border-black/10 transition-transform group-hover:scale-105 relative flex items-center justify-center cursor-pointer"
                      style={{ backgroundColor: c.hex }}
                      title={`Filter by ${c.name} (${c.hex})`}
                    >
                      <span className="opacity-0 group-hover:opacity-100 bg-black/60 text-white rounded p-1 text-[10px]">
                        Shop
                      </span>
                    </button>
                    <button
                      onClick={() => handleCopy(c.hex)}
                      className="mt-1.5 text-[10px] font-mono text-slate-500 hover:text-indigo-600 flex items-center gap-0.5"
                    >
                      <span>{c.hex}</span>
                      {copiedHex === c.hex ? <Check className="w-2.5 h-2.5 text-emerald-500" /> : <Copy className="w-2.5 h-2.5 opacity-50" />}
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                <span className="text-[11px] text-slate-400 font-medium">{preset.colors.length} calibrated tones</span>
                <button
                  onClick={() => handleFilterByColor(preset.colors[0].hex)}
                  className="font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                >
                  <span>Explore items</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mood & Psychology Explorer */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-8">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight">Chromatic Moods & Interior Harmonization</h2>
          <p className="text-xs text-slate-400 mt-1">Discover which color code families resonate with your living and workspace environments.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {colorMoods.map((mood, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-800 border border-slate-700 space-y-4">
              <div>
                <h3 className="font-bold text-sm text-slate-100">{mood.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{mood.description}</p>
              </div>

              <div className="flex items-center gap-3">
                {mood.hexList.map((hex) => (
                  <button
                    key={hex}
                    onClick={() => handleFilterByColor(hex)}
                    className="flex-1 group text-center cursor-pointer"
                  >
                    <div
                      className="w-full h-12 rounded-xl shadow-md border border-white/10 group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: hex }}
                    />
                    <span className="text-[10px] font-mono text-slate-400 block mt-1">{hex}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
