import React, { useState, useRef, useEffect } from 'react';
import { Send, Maximize2, Minimize2, Brain } from 'lucide-react';
import { useNova } from '../hooks/useNova';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function WelcomeAgent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm Nova, your Welcome EVE™. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { chat, error } = useNova();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-expand on first interaction
  useEffect(() => {
    if (hasInteracted && isCollapsed) {
      setIsCollapsed(false);
    }
  }, [hasInteracted]);

  const handleSendMessage = async () => {
    if (!input.trim() || isProcessing) return;

    setHasInteracted(true);

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    try {
      let responseContent = '';
      
      await chat(input, (chunk) => {
        responseContent += chunk;
        setMessages(prev => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage?.sender === 'ai' && lastMessage.id === 'streaming') {
            // Update the streaming message
            return [
              ...prev.slice(0, -1),
              { ...lastMessage, content: responseContent }
            ];
          } else {
            // Add a new streaming message
            return [
              ...prev,
              {
                id: 'streaming',
                content: responseContent,
                sender: 'ai',
                timestamp: new Date()
              }
            ];
          }
        });
      });

      // Replace the streaming message with the final message
      setMessages(prev => [
        ...prev.slice(0, -1),
        {
          id: (Date.now() + 1).toString(),
          content: responseContent,
          sender: 'ai',
          timestamp: new Date()
        }
      ]);
    } catch (err) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: error || 'I apologize, but I encountered an error. Please try again.',
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatMessage = (content: string) => {
    return content.split('\n').map((line, i) => (
      <p key={i} className="mb-2">{line}</p>
    ));
  };

  return (
    <div 
      className={`fixed transition-all duration-500 ease-in-out ${
        isExpanded 
          ? 'inset-4 md:inset-20 bg-[#040707]/95'
          : isCollapsed
            ? 'bottom-4 right-4 w-96 h-16 bg-[#040707]/95'
            : 'bottom-4 right-4 w-96 h-[600px] bg-[#040707]/95'
      } rounded-lg shadow-xl border border-[#72f68e]/20 z-50`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#72f68e]/20 p-1.5 mr-3">
            <Brain className="w-full h-full text-[#72f68e]" />
          </div>
          <div>
            <h3 className="text-white font-medium">Nova</h3>
            <p className="text-xs text-gray-400">Welcome EVE™</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {!isCollapsed && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {isExpanded ? 'Minimize' : 'Expand'}
            </button>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Minimize2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <>
          {/* Messages */}
          <div 
            className={`${
              isExpanded ? 'h-[calc(100%-8rem)]' : 'h-[calc(100%-8rem)]'
            } overflow-y-auto p-4 space-y-4`}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-[#72f68e]/20 flex items-center justify-center mr-2">
                    <Brain className="h-4 w-4 text-[#72f68e]" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-[#72f68e] text-[#040707]'
                      : 'bg-white/5 text-gray-200'
                  }`}
                >
                  <div className="text-sm space-y-2">
                    {formatMessage(message.content)}
                  </div>
                  <span className="text-xs opacity-75 mt-2 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2 bg-white/5 rounded-lg px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-[#72f68e] rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-[#72f68e] rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-[#72f68e] rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Message Nova..."
                className="flex-1 bg-white/5 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#72f68e] border border-white/10"
              />
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || isProcessing}
                className="p-2 bg-[#72f68e]/20 text-[#72f68e] rounded-full hover:bg-[#72f68e]/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}