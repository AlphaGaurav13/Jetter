import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Receipt, Bot, Settings, LogOut } from "lucide-react";
import { motion } from "framer-motion";

export function Sidebar() {
    const location = useLocation();

    const navItems = [
        { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
        { name: "Transactions", path: "/transactions", icon: <Receipt size={20} /> },
        { name: "AI Assistant", path: "/ai-assistant", icon: <Bot size={20} /> },
        { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
    ];

    return (
        <aside className="w-64 h-screen bg-slate-900/50 backdrop-blur-xl border-r border-white/10 flex flex-col pt-8 pb-4 fixed text-slate-200">
            <div className="px-8 mb-12 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                    J
                </div>
                <h1 className="text-2xl font-bold tracking-wider bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">JETTER</h1>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link key={item.name} to={item.path} className="block relative">
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-indigo-500/20 border border-indigo-500/30 rounded-xl"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <div className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-colors duration-200 ${isActive ? 'text-indigo-300' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}>
                                {item.icon}
                                <span className="font-medium">{item.name}</span>
                            </div>
                        </Link>
                    )
                })}
            </nav>

            <div className="px-4 mt-auto">
                <button className="w-full flex items-center gap-4 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors">
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}
