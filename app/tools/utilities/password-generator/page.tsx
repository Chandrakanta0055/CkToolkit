"use client";

import { ToolLayout } from '@/components/ui/ToolLayout';
import { useState, useEffect, useCallback } from 'react';
import { Copy, RefreshCw, CheckCircle2, ShieldCheck, ShieldAlert, ShieldX } from 'lucide-react';

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let validChars = '';
    if (includeUppercase) validChars += uppercaseChars;
    if (includeLowercase) validChars += lowercaseChars;
    if (includeNumbers) validChars += numberChars;
    if (includeSymbols) validChars += symbolChars;

    if (!validChars) {
      setPassword('');
      return;
    }

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * validChars.length);
      generatedPassword += validChars[randomIndex];
    }

    // Ensure at least one of each selected type
    let finalPassword = generatedPassword.split('');
    let currentIndex = 0;
    
    if (includeUppercase && length > currentIndex) finalPassword[currentIndex++] = uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
    if (includeLowercase && length > currentIndex) finalPassword[currentIndex++] = lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
    if (includeNumbers && length > currentIndex) finalPassword[currentIndex++] = numberChars[Math.floor(Math.random() * numberChars.length)];
    if (includeSymbols && length > currentIndex) finalPassword[currentIndex++] = symbolChars[Math.floor(Math.random() * symbolChars.length)];

    // Shuffle
    for (let i = finalPassword.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [finalPassword[i], finalPassword[j]] = [finalPassword[j], finalPassword[i]];
    }

    setPassword(finalPassword.join(''));
    setCopied(false);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const handleCopy = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = () => {
    let score = 0;
    if (length > 8) score++;
    if (length > 12) score++;
    if (includeUppercase) score++;
    if (includeLowercase) score++;
    if (includeNumbers) score++;
    if (includeSymbols) score++;

    if (score < 3) return { label: 'Weak', color: 'text-red-500', icon: ShieldX };
    if (score < 5) return { label: 'Medium', color: 'text-yellow-500', icon: ShieldAlert };
    return { label: 'Strong', color: 'text-green-500', icon: ShieldCheck };
  };

  const strength = getStrength();
  const StrengthIcon = strength.icon;

  return (
    <ToolLayout
      toolId="password-generator"
      title="Password Generator"
      description="Create strong, secure, and purely random passwords for your accounts."
    >
      <div className="max-w-2xl mx-auto flex flex-col gap-8">
        {/* Output Area */}
        <div className="relative group">
          <div className="w-full bg-secondary/50 border border-border rounded-xl p-6 md:p-8 flex items-center justify-center min-h-[120px] shadow-inner transition-shadow">
            <span className="text-2xl md:text-4xl font-mono tracking-wider text-center break-all text-foreground">
              {password || 'Select options to generate'}
            </span>
          </div>
          
          {password && (
            <button
              onClick={handleCopy}
              className="absolute top-4 right-4 p-2.5 rounded-lg bg-card border border-border hover:bg-secondary text-secondary-foreground transition-all shadow-sm group-hover:scale-105"
              title="Copy to clipboard"
            >
              {copied ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
            </button>
          )}

          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-card border border-border rounded-full flex items-center gap-2 text-sm shadow-sm">
            <StrengthIcon className={`h-4 w-4 ${strength.color}`} />
            <span className="font-medium text-foreground">{strength.label} Password</span>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-card border border-border/60 rounded-xl p-6 shadow-sm mt-4">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-semibold">Password Length</label>
              <span className="text-xl font-bold text-primary">{length}</span>
            </div>
            <input
              type="range"
              min="4"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              { label: 'Uppercase Letters (A-Z)', checked: includeUppercase, setter: setIncludeUppercase },
              { label: 'Lowercase Letters (a-z)', checked: includeLowercase, setter: setIncludeLowercase },
              { label: 'Numbers (0-9)', checked: includeNumbers, setter: setIncludeNumbers },
              { label: 'Symbols (!@#$)', checked: includeSymbols, setter: setIncludeSymbols },
            ].map((option, idx) => (
              <label key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:bg-secondary/30 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={option.checked}
                  onChange={(e) => option.setter(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary accent-primary"
                />
                <span className="text-sm font-medium">{option.label}</span>
              </label>
            ))}
          </div>

          <button
            onClick={generatePassword}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            <RefreshCw className="h-5 w-5" />
            Generate New Password
          </button>
        </div>
      </div>
    </ToolLayout>
  );
}
