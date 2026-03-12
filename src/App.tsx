import { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'preview'>('chat');

  return (
    <div className="fixed inset-0 flex flex-col bg-zinc-950 text-zinc-100 font-sans">

      {/* HEADER */}
      <header className="flex-none p-4 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md z-10 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tighter bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          Alchememe
        </h1>
        <span className="text-xs text-zinc-500 font-mono bg-zinc-900 px-2 py-1 rounded">
          Pico Code
        </span>
      </header>

      {/* MAIN VIEWPORT */}
      <main className="flex-1 overflow-hidden relative">

        {/* CHAT TAB */}
        <div className={`absolute inset-0 flex flex-col transition-opacity duration-200 ${activeTab === 'chat' ? 'opacity-100 z-10' : 'opacity-0 -z-10 pointer-events-none'}`}>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="text-zinc-400 text-sm text-center mt-10">
              What do you want to build today?
            </div>
          </div>
          {/* Input Area - Pushed up slightly to avoid the thumb tabs */}
          <div className="p-4 bg-zinc-900 border-t border-zinc-800 pb-24">
            <input
              type="text"
              placeholder="Describe your app..."
              className="w-full bg-zinc-800 text-white rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg"
            />
          </div>
        </div>

        {/* PREVIEW TAB */}
        <div className={`absolute inset-0 bg-white transition-opacity duration-200 ${activeTab === 'preview' ? 'opacity-100 z-10' : 'opacity-0 -z-10 pointer-events-none'}`}>
          <iframe
            src="about:blank"
            className="w-full h-full border-none pb-20"
            title="App Preview"
          />
        </div>
      </main>

      {/* THE THUMB ZONE: Fixed Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-zinc-900 border-t border-zinc-800 pb-safe z-50">
        <div className="flex justify-around items-center p-2">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex flex-col items-center justify-center w-full py-3 rounded-xl transition-all ${activeTab === 'chat' ? 'text-purple-400 bg-zinc-800/50' : 'text-zinc-500 hover:text-zinc-400'}`}
          >
            <span className="material-symbols-outlined text-[24px] mb-1">chat</span>
            <span className="text-xs font-medium">Chat</span>
          </button>

          <button
            onClick={() => setActiveTab('preview')}
            className={`flex flex-col items-center justify-center w-full py-3 rounded-xl transition-all ${activeTab === 'preview' ? 'text-blue-400 bg-zinc-800/50' : 'text-zinc-500 hover:text-zinc-400'}`}
          >
            <span className="material-symbols-outlined text-[24px] mb-1">bolt</span>
            <span className="text-xs font-medium">Preview</span>
          </button>
        </div>
      </nav>

    </div>
  );
}