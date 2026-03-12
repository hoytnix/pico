import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { requestProjectDirectory } from './lib/fileSystem';

export default function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'preview'>('chat');
  const [projectDir, setProjectDir] = useState<FileSystemDirectoryHandle | null>(null);

  // Vercel AI SDK Core Hook routing securely to your Supabase Edge Vault
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: 'https://dmxsysktnlhpgebqjzgk.supabase.co/functions/v1/alchememe',
  });

  const handleSelectDirectory = async () => {
    const handle = await requestProjectDirectory();
    if (handle) {
      setProjectDir(handle);
    }
  };

  // ----------------------------------------------------------------
  // THE GATE: Request Hard Drive Access First
  // ----------------------------------------------------------------
  if (!projectDir) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-zinc-950 text-zinc-100 font-sans p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            Alchememe
          </h1>
          <p className="text-zinc-400">Select a local folder to start vibe coding.</p>
          <button
            onClick={handleSelectDirectory}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-6 py-4 font-medium transition-all shadow-lg shadow-purple-900/20"
          >
            <span className="material-symbols-outlined text-[20px]">folder_open</span>
            Mount Local Directory
          </button>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------
  // THE MAGIC BOX: Chat & Preview UI
  // ----------------------------------------------------------------
  return (
    <div className="fixed inset-0 flex flex-col bg-zinc-950 text-zinc-100 font-sans">

      {/* HEADER */}
      <header className="flex-none p-4 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md z-10 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tighter bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          Alchememe
        </h1>
        <span className="text-xs text-zinc-500 font-mono bg-zinc-900 px-2 py-1 rounded truncate max-w-[150px]">
          {projectDir.name}
        </span>
      </header>

      {/* MAIN VIEWPORT */}
      <main className="flex-1 overflow-hidden relative">

        {/* CHAT TAB */}
        <div className={`absolute inset-0 flex flex-col transition-opacity duration-200 ${activeTab === 'chat' ? 'opacity-100 z-10' : 'opacity-0 -z-10 pointer-events-none'}`}>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-32">
            {messages.length === 0 ? (
              <div className="text-zinc-400 text-sm text-center mt-10">
                Editing <span className="text-purple-400">{projectDir.name}</span>. What do you want to build?
              </div>
            ) : (
              messages.map(m => (
                <div key={m.id} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <span className={`text-xs mb-1 font-mono ${m.role === 'user' ? 'text-purple-400' : 'text-blue-400'}`}>
                    {m.role === 'user' ? 'You' : 'Pico'}
                  </span>
                  <div className={`p-3 rounded-2xl max-w-[85%] text-sm ${m.role === 'user' ? 'bg-purple-600/20 border border-purple-500/30 text-zinc-100' : 'bg-zinc-900 border border-zinc-800 text-zinc-300'} whitespace-pre-wrap`}>
                    {m.content.replace(/<gemini_thought_sig>[\s\S]*?<\/gemini_thought_sig>/g, "").trim()}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="text-zinc-500 text-xs flex items-center gap-2 mt-4">
                <span className="material-symbols-outlined animate-spin text-[16px]">sync</span>
                Pico is thinking...
              </div>
            )}
          </div>

          {/* Form Input Area */}
          <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-zinc-950 via-zinc-950 to-transparent pb-20">
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={input || ''}
                onChange={handleInputChange}
                placeholder="Describe your app..."
                className="w-full bg-zinc-800 text-white rounded-full pl-6 pr-12 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg"
              />
              <button
                type="submit"
                disabled={!input?.trim() || isLoading}
                className="absolute right-2 top-2 p-2 bg-purple-600 rounded-full text-white hover:bg-purple-500 disabled:opacity-50 disabled:hover:bg-purple-600 transition-all flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[20px]">send</span>
              </button>
            </form>
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