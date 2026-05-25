import React, { useState, useEffect, useRef } from 'react';

// UNESCO API endpoint - VPS server
const API_URL = "http://85.31.230.163:8000";

interface Message {
  id: number;
  type: 'incoming' | 'outgoing';
  text: string;
}

const BotAvatar = () => (
  <div className="w-12 h-12 bg-[#25d366] rounded-full mr-4 flex items-center justify-center shrink-0 overflow-hidden">
    <img src="https://i.pinimg.com/736x/a7/59/70/a75970bb57b493ba703167005d01c4ec.jpg" alt="Bot Avatar" className="w-full h-full object-cover" />
  </div>
);

const SmallBotAvatar = () => (
  <div className="w-[30px] h-[30px] bg-[#25d366] rounded-full mr-[10px] flex items-center justify-center shrink-0 overflow-hidden">
    <img src="https://i.pinimg.com/736x/a7/59/70/a75970bb57b493ba703167005d01c4ec.jpg" alt="Bot" className="w-full h-full object-cover" />
  </div>
);

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  // Welcome message
  useEffect(() => {
    const welcomeMsg: Message = {
      id: Date.now(),
      type: 'incoming',
      text: '👋 ¡Bienvenido al Asistente UNESCO 2026!\n\nSoy tu asistente virtual de UNEFCO. Puedo ayudarte con información sobre:\n\n📋 Legalización de certificados\n📝 Certificados supletorios\n💰 Costos y depósitos bancarios\n📅 Fechas y plazos\n\n¿En qué puedo ayudarte hoy?'
    };
    setMessages([welcomeMsg]);
  }, []);

  // Scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const addMessage = (type: 'incoming' | 'outgoing', text: string) => {
    setMessages(prev => [...prev, { id: Date.now() + Math.random(), type, text }]);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    const userQuestion = inputValue.trim();
    setInputValue('');
    addMessage('outgoing', userQuestion);
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch(`${API_URL}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userQuestion })
      });
      
      const data = await response.json();
      
      setIsTyping(false);
      
      if (data.answer) {
        addMessage('incoming', data.answer);
      } else {
        addMessage('incoming', 'Lo siento, no pude encontrar una respuesta. ¿Podrías reformular tu pregunta?');
      }
    } catch (error) {
      setIsTyping(false);
      addMessage('incoming', '❌ Error de conexión. Por favor intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col shrink-0 z-50 shadow-md">
        <div className="bg-[#ffffff] text-black p-4 flex items-center justify-between">
            <div className="flex items-center">
                <BotAvatar />
                <div>
                  <h3 className="font-bold text-lg">UNESCO 2026</h3>
                  <p className="text-sm opacity-90">Asistente Educativo</p>
                </div>
            </div>
            <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 overflow-hidden shadow-sm bg-white border border-gray-100">
                <img src="https://i.pinimg.com/736x/5b/77/e0/5b77e0c2759b0f22ae2ddb269b8580c6.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
        </div>
        <div className="h-[6px] w-full flex">
            <div className="flex-1 bg-[#D52B1E]"></div>
            <div className="flex-1 bg-[#F9E300]"></div>
            <div className="flex-1 bg-[#007934]"></div>
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-5 pb-5 bg-[#ededec]"
      >
        {messages.map((msg, index) => (
          <div 
            key={msg.id} 
            ref={index === messages.length - 1 ? lastMessageRef : null}
            className={`mb-4 flex items-end ${msg.type === 'incoming' ? 'justify-start' : 'justify-end'}`}
          >
            {msg.type === 'incoming' && <SmallBotAvatar />}
            <div className={`max-w-[85%] px-4 py-3 rounded-lg text-[15px] leading-relaxed shadow-[0_1px_3px_rgba(0,0,0,0.1)] whitespace-pre-wrap break-words ${
                msg.type === 'incoming' 
                  ? 'bg-white text-[#333] rounded-bl-[3px]' 
                  : 'bg-[#dcf8c6] text-[#333] rounded-br-[3px]'
            }`}>
                {msg.text}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center p-4 bg-white rounded-[18px] w-fit mb-4 ml-[10px] shadow-sm">
             <div className="w-2 h-2 bg-[#999] rounded-full mr-[2px] animate-typing"></div>
             <div className="w-2 h-2 bg-[#999] rounded-full mr-[2px] animate-typing [animation-delay:0.2s]"></div>
             <div className="w-2 h-2 bg-[#999] rounded-full animate-typing [animation-delay:0.4s]"></div>
          </div>
        )}

        <div className="h-[130px] w-full shrink-0"></div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="bg-[#f0f0f0] p-2.5 flex items-center gap-2.5 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <input 
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
                if(e.key === 'Enter' && !isLoading) handleSendMessage();
            }}
            placeholder="Escribe tu pregunta aquí..."
            className="flex-1 p-3 px-4 border-none rounded-[25px] text-base outline-none bg-white shadow-inner"
            autoFocus
            disabled={isLoading}
        />
        <button 
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            className="p-3 w-12 h-12 bg-[#25d366] text-white border-none rounded-full text-lg cursor-pointer shrink-0 disabled:bg-[#ccc] disabled:cursor-not-allowed flex items-center justify-center transition-colors shadow-md active:scale-95"
        >
            ➤
        </button>
      </div>
    </div>
  );
}