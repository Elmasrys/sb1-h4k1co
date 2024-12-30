import React, { useState, useRef, useEffect } from 'react';
import { Mic, Send, Maximize2, Minimize2, X, Brain, Upload, Link } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type: 'text' | 'voice' | 'file' | 'link';
  fileUrl?: string;
  fileName?: string;
  fileType?: string;
  link?: {
    url: string;
    title: string;
  };
}

export default function CompanyChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "I'm Atlas, your Chief EVE™. I monitor all operations and coordinate with other EVEs™. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'text',
    },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
      type: 'text',
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsProcessing(true);

    // Example response with internal link
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I found relevant information in your reports. You can view the detailed analytics here:",
        sender: 'ai',
        timestamp: new Date(),
        type: 'link',
        link: {
          url: '/dashboard/reports',
          title: 'View Reports'
        }
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, upload to storage and get URL
      const fileMessage: Message = {
        id: Date.now().toString(),
        content: `Uploaded: ${file.name}`,
        sender: 'user',
        timestamp: new Date(),
        type: 'file',
        fileName: file.name,
        fileType: file.type,
      };

      setMessages(prev => [...prev, fileMessage]);

      // Simulate Atlas response
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: `I've received your document "${file.name}". I'll analyze it and provide insights shortly.`,
          sender: 'ai',
          timestamp: new Date(),
          type: 'text',
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const fileMessage: Message = {
        id: Date.now().toString(),
        content: `Dropped file: ${file.name}`,
        sender: 'user',
        timestamp: new Date(),
        type: 'file',
        fileName: file.name,
        fileType: file.type,
      };

      setMessages(prev => [...prev, fileMessage]);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    setIsListening(!isListening);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    setIsCollapsed(false);
  };

  return (
    <div
      ref={chatContainerRef}
      className={`${
        isFullScreen 
          ? 'fixed inset-0 z-50 m-4'
          : 'fixed bottom-0 right-6 w-96'
      } bg-[#040707]/95 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-300 ease-in-out ${
        isCollapsed ? 'h-12' : isFullScreen ? 'h-auto' : 'h-[600px]'
      } border border-[#72f68e]/20`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#72f68e]/10 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-[#72f68e] animate-pulse" />
          <span className="text-sm font-medium text-white">Atlas - Chief EVE™</span>
        </div>
        <div className="flex items-center space-x-2">
          {!isCollapsed && (
            <button
              onClick={toggleFullScreen}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isCollapsed ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Messages */}
      {!isCollapsed && (
        <>
          <div 
            className={`relative flex-1 overflow-y-auto p-4 space-y-4 ${
              isFullScreen ? 'h-[calc(100vh-12rem)]' : 'h-[500px]'
            } scrollbar-thin scrollbar-thumb-[#72f68e]/20 scrollbar-track-transparent`}
          >
            {isDragging && (
              <div className="absolute inset-0 bg-[#72f68e]/10 border-2 border-dashed border-[#72f68e] rounded-lg flex items-center justify-center">
                <div className="text-[#72f68e] text-lg">Drop files here</div>
              </div>
            )}
            
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
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
                  {message.type === 'file' && (
                    <div className="flex items-center space-x-2 mb-2">
                      <Upload className="h-4 w-4" />
                      <span className="text-sm">{message.fileName}</span>
                    </div>
                  )}
                  
                  {message.type === 'link' && message.link && (
                    <RouterLink
                      to={message.link.url}
                      className="flex items-center space-x-2 text-[#72f68e] hover:underline"
                    >
                      <Link className="h-4 w-4" />
                      <span>{message.link.title}</span>
                    </RouterLink>
                  )}
                  
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-75 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
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
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleRecording}
                className={`p-2 rounded-full ${
                  isRecording
                    ? 'bg-red-500/20 text-red-500'
                    : 'bg-[#72f68e]/20 text-[#72f68e]'
                } hover:bg-[#72f68e]/30 transition-colors`}
              >
                <Mic className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 rounded-full bg-[#72f68e]/20 text-[#72f68e] hover:bg-[#72f68e]/30 transition-colors"
              >
                <Upload className="h-5 w-5" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileUpload}
              />
              
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Message Atlas..."
                className="flex-1 bg-white/5 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#72f68e] border border-white/10"
              />
              
              <button
                onClick={handleSendMessage}
                disabled={!input.trim()}
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