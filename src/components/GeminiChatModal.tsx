import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  MapPin,
  Search,
  Zap,
  Brain,
  ExternalLink,
  Bot,
  User,
  RotateCcw,
  Compass,
  Utensils,
  ChevronRight,
  ShieldCheck,
  Flame,
} from 'lucide-react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  modelUsed?: string;
  groundingType?: 'maps' | 'search' | 'none';
  mapsChunks?: {
    uri: string;
    title: string;
    placeAnswerSources?: string[];
  }[];
  webChunks?: {
    uri: string;
    title: string;
  }[];
  timestamp: string;
}

interface GeminiChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

type ChatMode = 'general' | 'maps' | 'search' | 'fast' | 'complex';

export const GeminiChatModal: React.FC<GeminiChatModalProps> = ({
  isOpen,
  onClose,
  initialPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `Hello! I am your **Kok Sen Culinary Concierge**, powered by Google Gemini.

I can help you with:
• **Menu & Pairings**: Signature Big Prawn Hor Fun, Claypot Yong Tau Foo, and wok-hei recommendations.
• **Google Maps Grounding**: Exact location at **4 Keong Saik Road**, transit directions from Outram Park/Maxwell MRT, and delivery zones.
• **Google Search Grounding**: Up-to-date Michelin Bib Gourmand accolades, diner reviews, and news.
• **Allergens & Custom Banquets**: Shellfish, gluten, and dietary accommodations.

How can I assist your dining experience today?`,
      modelUsed: 'gemini-3.5-flash',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [mode, setMode] = useState<ChatMode>('general');
  const [isLoading, setIsLoading] = useState(false);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Request user geolocation for maps grounding if available
  useEffect(() => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserCoords({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        () => {
          // Default to Kok Sen Keong Saik coordinates
          setUserCoords({ lat: 1.2804, lng: 103.8420 });
        }
      );
    }
  }, []);

  // Handle initial prompt if passed
  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const prompt = (textToSend || inputText).trim();
    if (!prompt || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr_${Date.now()}`,
      role: 'user',
      text: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInputText('');
    setIsLoading(true);

    try {
      // Prepare payload for server
      const payloadMessages = newHistory
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({
          role: m.role,
          text: m.text,
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: payloadMessages,
          mode,
          userLocation: userCoords || { lat: 1.2804, lng: 103.8420 },
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();

      const aiMessage: ChatMessage = {
        id: `ai_${Date.now()}`,
        role: 'model',
        text: data.text || 'I apologize, I could not complete your request. Please try again.',
        modelUsed: data.modelUsed,
        groundingType: data.groundingType,
        mapsChunks: data.mapsChunks || [],
        webChunks: data.webChunks || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: `err_${Date.now()}`,
        role: 'model',
        text: `We could not reach the Kok Sen AI Culinary Concierge. Please verify your connection or try again shortly. (${err.message || 'Error'})`,
        modelUsed: 'gemini-3.5-flash',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome_reset',
        role: 'model',
        text: 'Conversation cleared. How can I help you with Kok Sen Restaurant today?',
        modelUsed: 'gemini-3.5-flash',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const quickPrompts = [
    {
      label: '📍 Location & Directions',
      prompt: 'Where is Kok Sen located and how do I walk from Outram Park or Maxwell MRT?',
      mode: 'maps' as ChatMode,
    },
    {
      label: '🏆 Michelin Guide Review',
      prompt: 'What did the Michelin Bib Gourmand guide highlight about Kok Sen Restaurant?',
      mode: 'search' as ChatMode,
    },
    {
      label: '🍤 Recommend for 4 People',
      prompt: 'Plan an ideal 4-person dinner menu balancing seafood, meat, greens, and Big Prawn Hor Fun.',
      mode: 'general' as ChatMode,
    },
    {
      label: '🛵 Delivery Zones & Fees',
      prompt: 'Explain the delivery zones from 4 Keong Saik Rd and how to get free delivery.',
      mode: 'maps' as ChatMode,
    },
    {
      label: '🌿 Gluten & Shellfish Safe',
      prompt: 'Which signature dishes at Kok Sen are safe for guests avoiding shellfish or gluten?',
      mode: 'fast' as ChatMode,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl flex flex-col h-[90vh] max-h-[820px] overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#7A0D13] via-[#9B131B] to-[#C61E28] text-white p-4 relative shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center backdrop-blur-xs">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="font-epilogue text-base font-bold text-white leading-tight">
                    Kok Sen AI Concierge
                  </h2>
                  <span className="bg-amber-300/20 text-amber-200 text-[10px] font-bold px-1.5 py-0.5 rounded border border-amber-300/30">
                    Gemini Live
                  </span>
                </div>
                <p className="text-[11px] text-white/80">
                  Grounding with Google Maps & Google Search
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                title="Clear Chat History"
                aria-label="Clear chat"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* AI Mode Selector Tabs */}
          <div className="flex gap-1.5 mt-3 pt-2.5 border-t border-white/15 overflow-x-auto no-scrollbar pb-0.5">
            <button
              onClick={() => setMode('general')}
              className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold flex items-center gap-1 whitespace-nowrap transition-all cursor-pointer ${
                mode === 'general'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'bg-white/10 text-white/85 hover:bg-white/20'
              }`}
            >
              <Bot className="w-3 h-3 text-[#C61E28]" />
              <span>General (3.5 Flash)</span>
            </button>

            <button
              onClick={() => setMode('maps')}
              className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold flex items-center gap-1 whitespace-nowrap transition-all cursor-pointer ${
                mode === 'maps'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'bg-white/10 text-white/85 hover:bg-white/20'
              }`}
            >
              <MapPin className="w-3 h-3 text-emerald-600" />
              <span>Google Maps</span>
            </button>

            <button
              onClick={() => setMode('search')}
              className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold flex items-center gap-1 whitespace-nowrap transition-all cursor-pointer ${
                mode === 'search'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'bg-white/10 text-white/85 hover:bg-white/20'
              }`}
            >
              <Search className="w-3 h-3 text-blue-500" />
              <span>Google Search</span>
            </button>

            <button
              onClick={() => setMode('fast')}
              className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold flex items-center gap-1 whitespace-nowrap transition-all cursor-pointer ${
                mode === 'fast'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'bg-white/10 text-white/85 hover:bg-white/20'
              }`}
            >
              <Zap className="w-3 h-3 text-amber-500" />
              <span>Fast (3.1 Lite)</span>
            </button>

            <button
              onClick={() => setMode('complex')}
              className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold flex items-center gap-1 whitespace-nowrap transition-all cursor-pointer ${
                mode === 'complex'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'bg-white/10 text-white/85 hover:bg-white/20'
              }`}
            >
              <Brain className="w-3 h-3 text-purple-500" />
              <span>Pro Reasoning</span>
            </button>
          </div>
        </div>

        {/* Scrollable Conversation Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#FAF9F7]/70">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-[#C61E28] text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                    <Sparkles className="w-4 h-4 text-amber-200" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs shadow-xs leading-relaxed ${
                    isUser
                      ? 'bg-[#C61E28] text-white rounded-tr-xs'
                      : 'bg-white text-gray-800 border border-gray-200/80 rounded-tl-xs'
                  }`}
                >
                  {/* Model Tag Header if AI */}
                  {!isUser && msg.modelUsed && (
                    <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-gray-100 text-[10px] text-gray-400">
                      <span className="font-mono font-medium text-gray-500">
                        {msg.modelUsed}
                      </span>
                      {msg.groundingType === 'maps' && (
                        <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-bold flex items-center gap-0.5">
                          <MapPin className="w-2.5 h-2.5" /> Google Maps Grounded
                        </span>
                      )}
                      {msg.groundingType === 'search' && (
                        <span className="text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded font-bold flex items-center gap-0.5">
                          <Search className="w-2.5 h-2.5" /> Google Search Grounded
                        </span>
                      )}
                    </div>
                  )}

                  {/* Message Content formatted with linebreaks and bold */}
                  <div className="whitespace-pre-wrap space-y-1">
                    {msg.text.split('\n').map((line, i) => {
                      if (!line.trim()) return <div key={i} className="h-1.5" />;
                      // Bold styling parse
                      const parts = line.split(/(\*\*.*?\*\*)/g);
                      return (
                        <p key={i}>
                          {parts.map((part, pIdx) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return (
                                <strong key={pIdx} className="font-bold">
                                  {part.slice(2, -2)}
                                </strong>
                              );
                            }
                            return part;
                          })}
                        </p>
                      );
                    })}
                  </div>

                  {/* Grounding Citations: Google Maps Links */}
                  {!isUser && msg.mapsChunks && msg.mapsChunks.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-gray-100 space-y-1.5">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                        Verified Google Maps Locations:
                      </span>
                      <div className="space-y-1">
                        {msg.mapsChunks.map((mapChunk, cIdx) => (
                          <a
                            key={cIdx}
                            href={mapChunk.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-2 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-emerald-900 hover:bg-emerald-100/70 transition-colors"
                          >
                            <div className="flex items-center gap-1.5 truncate">
                              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span className="font-bold text-[11px] truncate">
                                {mapChunk.title || 'Kok Sen Restaurant (Google Maps)'}
                              </span>
                            </div>
                            <ExternalLink className="w-3 h-3 text-emerald-600 shrink-0 ml-1" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Grounding Citations: Google Search Links */}
                  {!isUser && msg.webChunks && msg.webChunks.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-gray-100 space-y-1.5">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                        Google Search Sources:
                      </span>
                      <div className="space-y-1">
                        {msg.webChunks.slice(0, 3).map((webChunk, wIdx) => (
                          <a
                            key={wIdx}
                            href={webChunk.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-1.5 rounded-lg bg-blue-50/70 border border-blue-200/70 text-blue-900 hover:bg-blue-100/70 transition-colors text-[10.5px]"
                          >
                            <span className="truncate font-medium">{webChunk.title}</span>
                            <ExternalLink className="w-3 h-3 text-blue-600 shrink-0 ml-1" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <span
                    className={`block text-[9.5px] mt-1 text-right ${
                      isUser ? 'text-white/70' : 'text-gray-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-full bg-stone-200 text-gray-700 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-gray-500 italic p-2">
              <div className="w-7 h-7 rounded-full bg-[#C61E28] text-white flex items-center justify-center shrink-0 animate-pulse">
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              </div>
              <span className="flex items-center gap-1">
                Consulting Kok Sen Culinary Archives & Live Grounding...
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-3 py-2 bg-white border-t border-gray-100 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => {
                setMode(qp.mode);
                handleSendMessage(qp.prompt);
              }}
              disabled={isLoading}
              className="text-[11px] px-2.5 py-1.5 rounded-full bg-gray-100 hover:bg-red-50 hover:text-[#C61E28] text-gray-700 border border-gray-200 whitespace-nowrap transition-colors cursor-pointer active:scale-95 disabled:opacity-50 shrink-0"
            >
              {qp.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-gray-200/90 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  mode === 'maps'
                    ? 'Ask about location, directions or delivery zones...'
                    : mode === 'search'
                    ? 'Search Michelin reviews, articles or history...'
                    : 'Ask anything about Kok Sen dishes, wok hei, pairings...'
                }
                disabled={isLoading}
                className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C61E28] pr-8 bg-gray-50/50"
              />
            </div>

            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="w-10 h-10 rounded-xl bg-[#C61E28] hover:bg-red-800 text-white flex items-center justify-center transition-all disabled:opacity-40 cursor-pointer shrink-0 active:scale-95 shadow-sm"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex items-center justify-between text-[10px] text-gray-400 mt-1.5 px-1">
            <span>Powered by Gemini 3.5 Flash & 3.1 Flash Lite</span>
            <span>Real-time Google Maps & Search</span>
          </div>
        </div>
      </div>
    </div>
  );
};
