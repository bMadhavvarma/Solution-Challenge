import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI career assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: "I understand you're interested in career development. Could you tell me more about your specific goals?",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Career Assistant</h1>
        <p className="text-xl text-gray-600">Chat with our AI to get personalized career guidance</p>
      </div>

      {/* Chat Container */}
      <div className="bg-white border border-blue-100 rounded-lg h-[600px] flex flex-col">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`flex items-start space-x-2 max-w-[80%] ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-100 text-blue-600'
                  }`}
                >
                  {message.sender === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                <div
                  className={`p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-50 text-gray-900'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="border-t border-blue-100 p-4">
          <div className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Send size={20} />
              <span>Send</span>
            </button>
          </div>
        </form>
      </div>

      {/* Features */}
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="text-center">
          <h3 className="font-semibold text-lg mb-2">24/7 Availability</h3>
          <p className="text-gray-600">Get instant responses anytime</p>
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-lg mb-2">Personalized Advice</h3>
          <p className="text-gray-600">Tailored guidance for your career</p>
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-lg mb-2">Expert Knowledge</h3>
          <p className="text-gray-600">Based on industry best practices</p>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;