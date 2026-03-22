"use client";

import { ToolLayout } from '@/components/ui/ToolLayout';
import { useState, useMemo } from 'react';
import { ArrowLeftRight, Weight, Ruler, Thermometer } from 'lucide-react';

type Category = 'length' | 'weight' | 'temperature';

const UNITS = {
  length: {
    icon: Ruler,
    baseUrl: 1, // base is meters
    units: {
      meters: { name: 'Meters (m)', factor: 1 },
      kilometers: { name: 'Kilometers (km)', factor: 1000 },
      centimeters: { name: 'Centimeters (cm)', factor: 0.01 },
      millimeters: { name: 'Millimeters (mm)', factor: 0.001 },
      miles: { name: 'Miles (mi)', factor: 1609.34 },
      yards: { name: 'Yards (yd)', factor: 0.9144 },
      feet: { name: 'Feet (ft)', factor: 0.3048 },
      inches: { name: 'Inches (in)', factor: 0.0254 },
    }
  },
  weight: {
    icon: Weight,
    baseUrl: 1, // base is kilograms
    units: {
      kilograms: { name: 'Kilograms (kg)', factor: 1 },
      grams: { name: 'Grams (g)', factor: 0.001 },
      milligrams: { name: 'Milligrams (mg)', factor: 0.000001 },
      pounds: { name: 'Pounds (lb)', factor: 0.453592 },
      ounces: { name: 'Ounces (oz)', factor: 0.0283495 },
    }
  },
  temperature: {
    icon: Thermometer,
    baseUrl: 1, // special handling
    units: {
      celsius: { name: 'Celsius (°C)', factor: 1 },
      fahrenheit: { name: 'Fahrenheit (°F)', factor: 1 },
      kelvin: { name: 'Kelvin (K)', factor: 1 }
    }
  }
};

export default function UnitConverterPage() {
  const [category, setCategory] = useState<Category>('length');
  const [fromUnit, setFromUnit] = useState<string>('meters');
  const [toUnit, setToUnit] = useState<string>('feet');
  const [inputValue, setInputValue] = useState<string>('1');

  // When category changes, reset the default units
  const handleCategoryChange = (cat: Category) => {
    setCategory(cat);
    const keys = Object.keys(UNITS[cat].units);
    setFromUnit(keys[0]);
    setToUnit(keys[1] || keys[0]);
    setInputValue('1');
  };

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const result = useMemo(() => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) return '';

    if (category === 'temperature') {
      let cVal = 0;
      // Convert everything to Celsius first
      if (fromUnit === 'celsius') cVal = val;
      else if (fromUnit === 'fahrenheit') cVal = (val - 32) * 5/9;
      else if (fromUnit === 'kelvin') cVal = val - 273.15;

      // Convert Celsius to target
      if (toUnit === 'celsius') return cVal.toFixed(4).replace(/\.?0+$/, '');
      else if (toUnit === 'fahrenheit') return ((cVal * 9/5) + 32).toFixed(4).replace(/\.?0+$/, '');
      else if (toUnit === 'kelvin') return (cVal + 273.15).toFixed(4).replace(/\.?0+$/, '');
      return '';
    }

    // Standard multiplicative conversion (via base unit)
    const catData = UNITS[category].units as any;
    const fromFactor = catData[fromUnit].factor;
    const toFactor = catData[toUnit].factor;

    const baseValue = val * fromFactor;
    const finalValue = baseValue / toFactor;
    
    // Format nicely without annoying trailing zeros
    return finalValue.toFixed(6).replace(/\.?0+$/, '');
  }, [inputValue, fromUnit, toUnit, category]);

  return (
    <ToolLayout
      toolId="unit-converter"
      title="Unit Converter"
      description="Instantly convert between length, weight, and temperature measurements."
    >
      <div className="flex flex-col gap-8 max-w-3xl mx-auto">
        
        {/* Category Tabs */}
        <div className="flex rounded-xl bg-secondary/30 p-1.5 border border-border shadow-inner">
          {(Object.keys(UNITS) as Category[]).map((cat) => {
            const Icon = UNITS[cat].icon;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold text-sm transition-all ${
                  category === cat 
                    ? 'bg-card text-foreground shadow-sm border border-border/50' 
                    : 'text-secondary-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                <Icon className="h-4 w-4" />
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            );
          })}
        </div>

        {/* Converter Body */}
        <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center gap-6">
          
          <div className="flex-1 w-full flex flex-col gap-2">
            <label className="text-sm font-semibold">From</label>
            <div className="flex rounded-lg border border-border focus-within:ring-2 focus-within:ring-primary/50 overflow-hidden shadow-sm transition-shadow">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-secondary/30 px-4 py-3 outline-none text-lg font-mono min-w-[120px]"
                placeholder="0"
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="bg-card px-4 py-3 outline-none border-l border-border font-medium cursor-pointer"
              >
                {Object.entries(UNITS[category].units).map(([key, data]) => (
                  <option key={key} value={key}>{data.name}</option>
                ))}
              </select>
            </div>
          </div>

          <button 
            onClick={handleSwap}
            className="p-3 mt-4 md:mt-6 bg-secondary text-secondary-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all border border-border shadow-sm active:scale-90"
            title="Swap units"
          >
            <ArrowLeftRight className="h-5 w-5" />
          </button>

          <div className="flex-1 w-full flex flex-col gap-2">
            <label className="text-sm font-semibold">To</label>
            <div className="flex rounded-lg border border-border overflow-hidden shadow-sm">
              <input
                type="text"
                readOnly
                value={result}
                className="w-full bg-card px-4 py-3 outline-none text-lg font-mono text-primary font-bold min-w-[120px] tracking-wide"
                placeholder="0"
              />
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="bg-card px-4 py-3 outline-none border-l border-border font-medium cursor-pointer"
              >
                {Object.entries(UNITS[category].units).map(([key, data]) => (
                  <option key={key} value={key}>{data.name}</option>
                ))}
              </select>
            </div>
          </div>

        </div>

      </div>
    </ToolLayout>
  );
}
