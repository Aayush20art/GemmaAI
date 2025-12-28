import React, { useState } from 'react';
import { AppStatus, GenerationResult } from './types';
import { generateSocialCaptions } from './services/geminiService';
import {
  Upload, Sparkles, Image as ImageIcon, Check, Copy,
  RefreshCw, AlertCircle, Instagram, Linkedin, X,
  Zap, Globe
} from 'lucide-react';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('');
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) {
      setError('Please upload a valid image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string);
      setMimeType(file.type);
      setStatus(AppStatus.IDLE);
      setResult(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!image) return;
    setStatus(AppStatus.GENERATING);
    setError(null);

    try {
      const data = await generateSocialCaptions(image, mimeType);
      setResult(data);
      setStatus(AppStatus.SUCCESS);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setStatus(AppStatus.ERROR);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const reset = () => {
    setImage(null);
    setMimeType('');
    setResult(null);
    setStatus(AppStatus.IDLE);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-50 to-pink-50 text-slate-800 flex flex-col font-sans">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-pink-200 px-6 py-6">
        <div
          className="max-w-7xl mx-auto flex items-center gap-4 cursor-pointer"
          onClick={reset}
        >
          <div className="w-12 h-12 rounded-xl bg-pink-500 flex items-center justify-center shadow-md">
            <Sparkles className="w-6 h-6 text-white" />
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl font-extrabold tracking-tight">
              Gemma<span className="text-pink-500">AI</span>
            </h1>
            <span className="text-sm text-slate-600 font-semibold">
              AI-powered social media caption generator
            </span>
            <div className="flex items-center gap-1 text-[11px] uppercase text-pink-500 font-bold mt-0.5">
              <Globe className="w-3 h-3" />
              Turn images into scroll-stopping captions
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Upload Section */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <h2 className="text-4xl font-extrabold leading-tight">
                Turn Images into <span className="text-pink-500">Viral</span> Captions
              </h2>
              <p className="text-slate-600 max-w-md">
                Upload an image and let AI write catchy captions in seconds.
              </p>
            </div>

            {!image ? (
              <label className="flex flex-col items-center justify-center aspect-[4/3] rounded-2xl border-2 border-dashed border-pink-400 bg-white hover:bg-pink-50 transition cursor-pointer">
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                <Upload className="w-12 h-12 text-pink-500 mb-3" />
                <p className="uppercase font-semibold tracking-wide">Upload Image</p>
              </label>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <img src={image} className="rounded-xl border border-pink-200" />
                  <button
                    onClick={reset}
                    aria-label="Remove image"
                    className="absolute top-3 right-3 bg-white p-2 rounded-lg border border-pink-300 hover:bg-pink-100 transition"
                  >
                    <X />
                  </button>
                </div>

                {/* UPDATED BUTTON */}
                <button
                  onClick={handleGenerate}
                  className="w-full py-4 rounded-xl bg-pink-500 hover:bg-pink-600 text-white transition font-bold uppercase tracking-wide shadow-md"
                >
                  <Zap className="inline mr-2" />
                  Generate Captions
                </button>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 text-red-600 font-semibold">
                <AlertCircle /> {error}
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="lg:col-span-7">
            {status === AppStatus.IDLE && !image && (
              <div className="h-full min-h-[350px] flex flex-col items-center justify-center rounded-2xl border border-pink-200 bg-white">
                <ImageIcon className="w-16 h-16 text-pink-300 mb-4" />
                <p className="text-slate-500 text-center max-w-sm">
                  Your AI captions will appear here ✨
                </p>
              </div>
            )}

            {status === AppStatus.GENERATING && (
              <p className="font-semibold text-pink-500 animate-pulse">
                Generating captions with AI…
              </p>
            )}

            {status === AppStatus.SUCCESS && result && (
              <div className="space-y-8">

                <div className="p-6 rounded-2xl bg-white border border-pink-200 shadow-sm">
                  <h3 className="flex items-center gap-2 font-bold text-lg mb-3">
                    <Instagram className="text-pink-500" /> Instagram
                  </h3>
                  <p className="leading-relaxed">{result.instagram.caption}</p>
                  <button
                    onClick={() => copyToClipboard(result.instagram.caption, 'insta')}
                    className="mt-4 text-pink-500 hover:text-pink-600 transition"
                  >
                    {copiedId === 'insta' ? <Check /> : <Copy />}
                  </button>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-yellow-300 shadow-sm">
                  <h3 className="flex items-center gap-2 font-bold text-lg mb-3">
                    <Linkedin className="text-yellow-600" /> LinkedIn
                  </h3>
                  <p className="leading-relaxed">{result.linkedin.caption}</p>
                  <button
                    onClick={() => copyToClipboard(result.linkedin.caption, 'linked')}
                    className="mt-4 text-yellow-600 hover:text-yellow-700 transition"
                  >
                    {copiedId === 'linked' ? <Check /> : <Copy />}
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleGenerate}
                    className="flex-1 py-3 rounded-xl border border-pink-300 hover:bg-pink-50 transition font-semibold"
                  >
                    <RefreshCw className="inline mr-2" />
                    Retry
                  </button>
                  <button
                    onClick={reset}
                    className="flex-1 py-3 rounded-xl border border-yellow-300 hover:bg-yellow-50 transition font-semibold"
                  >
                    <Upload className="inline mr-2" />
                    New Image
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>
      </main>

      {/* Footer */}
     <footer className="border-t border-pink-200 py-8 text-center text-sm font-bold text-slate-700">
  © {new Date().getFullYear()} Built by Aayush Sharma
</footer>

    </div>
  );
};

export default App;
