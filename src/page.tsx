'use client';

import { useState } from 'react';
import { MessageSquare, Zap } from 'lucide-react'; // Standard feather icons

export default function AlchememePico() {
  // The ultimate binary state: Talk to the AI, or look at the app.
  const [activeTab, setActiveTab] = useState<'chat' | 'preview'>('chat');

  return (
    <div className="fixed inset-0 flex flex-col bg-zinc-950 text-zinc-100 font-sans">
      
      {/* HEADER: Minimalist Branding */}
      <header className="flex-none p-4 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md z-10">
        <h1 className="text-xl font-bold tracking-tighter bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          Alchememe
        </h1>
      </header>

      {/* MAIN VIEWPORT: Hides the inactive tab entirely */}
      <main className="flex-1 overflow-hidden relative">
        
        {/* CHAT TAB */}
        <div className={`absolute inset-0 flex flex-col ${activeTab === 'chat' ? 'opacity-100 z-10' : 'opacity-0 -z-10 pointer-events-none'}`}>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* AI and User message bubbles will stream here */}
            <div className="text-zinc-400 text-sm text-center mt-10">
              What do you want to build today?
            </div>
          </div>
          <div className="p-4 bg-zinc-900 border-t border-zinc-800 pb-24">
            <input 
              type="text" 
              placeholder="Describe your app..." 
              className="w-full bg-zinc-800 text-white rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* PREVIEW TAB */}
        <div className={`absolute inset-0 bg-white ${activeTab === 'preview' ? 'opacity-100 z-10' : 'opacity-0 -z-10 pointer-events-none'}`}>
          {/* This is where your Service Worker feeds the compiled esbuild-wasm code */}
          <iframe 
            src="https://preview.alchememe.local" 
            className="w-full h-full border-none pb-20"
            title="App Preview"
          />
        </div>
      </main>

      {/* THE THUMB ZONE: Fixed Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-zinc-900 border-t border-zinc-800 pb-safe">
        <div className="flex justify-around items-center p-2">
          <button 
            onClick={() => setActiveTab('chat')}
            className={`flex flex-col items-center justify-center w-full py-3 rounded-xl transition-all ${activeTab === 'chat' ? 'text-purple-400 bg-zinc-800/50' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <MessageSquare size={24} className="mb-1" />
            <span className="text-xs font-medium">Chat</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('preview')}
            className={`flex flex-col items-center justify-center w-full py-3 rounded-xl transition-all ${activeTab === 'preview' ? 'text-blue-400 bg-zinc-800/50' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Zap size={24} className="mb-1" />
            <span className="text-xs font-medium">Preview</span>
          </button>
        </div>
      </nav>

    </div>
  );
}