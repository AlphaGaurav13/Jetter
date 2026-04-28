import { motion } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { useState } from "react";

export function AiAssistant() {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'ai', text: "Hello! I'm your JETTER AI Assistant. I can analyze your spending, suggest budgets, or answer any financial questions you have based on your data." }
    ]);
    const [input, setInput] = useState("");

    const handleSend = async () => {
        if (!input.trim()) return;
        
        const userMsgText = input.trim();
        setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: userMsgText }]);
        setInput("");
        
        const token = localStorage.getItem('token') || "";

        try {
            const response = await fetch("http://localhost:3000/api/v1/ai/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + token
                },
                body: JSON.stringify({ message: userMsgText })
            });

            const data = await response.json();
            
            if (response.ok && data.reply) {
                setMessages(prev => [...prev, { 
                    id: Date.now()+1, 
                    sender: 'ai', 
                    text: data.reply
                }]);
            } else {
                setMessages(prev => [...prev, { id: Date.now()+1, sender: 'ai', text: "Sorry, I couldn't process that right now. Make sure you are logged in." }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { id: Date.now()+1, sender: 'ai', text: "Connection error. Ensure your backend server is running!" }]);
        }
    };

    return (
        <div className="h-[85vh] flex flex-col space-y-6">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4"
            >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                    <Sparkles size={24} />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1">Financial AI</h1>
                    <p className="text-slate-400 mt-1">Powered by Google Gemini ⚡️</p>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl flex flex-col overflow-hidden relative"
            >
                <div className="absolute top-0 inset-x-0 h-32 bg-indigo-500/10 blur-[100px] pointer-events-none" />

                <div className="flex-1 overflow-y-auto p-6 space-y-6 z-10">
                    {messages.map(msg => (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={msg.id} 
                            className={`flex gap-4 max-w-[80%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-indigo-500' : 'bg-slate-800 border border-white/10'}`}>
                                {msg.sender === 'user' ? <User size={20} className="text-white" /> : <Bot size={20} className="text-indigo-400" />}
                            </div>
                            <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-indigo-500 text-white rounded-tr-sm' : 'bg-white/10 text-slate-200 border border-white/10 rounded-tl-sm backdrop-blur-md'}`}>
                                {msg.text}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="p-4 bg-black/20 border-t border-white/10 z-10 w-full">
                    <form 
                        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                        className="flex gap-4 relative max-w-4xl mx-auto"
                    >
                        <input 
                            type="text" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about your expenses, budgets, or tips..." 
                            className="flex-1 bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-500 shadow-inner"
                        />
                        <button 
                            type="submit"
                            disabled={!input.trim()}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-700 disabled:text-slate-400 text-white rounded-xl transition-colors"
                        >
                            <Send size={20} />
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
