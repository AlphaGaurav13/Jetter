import { motion } from "framer-motion";
import { Plus, Search, Filter } from "lucide-react";
import { useState } from "react";

const mockTransactions = [
    { id: 1, desc: "Grocery Shopping", category: "Food", date: "2026-04-25", amount: 120.50, type: "expense" },
    { id: 2, desc: "Monthly Salary", category: "Income", date: "2026-04-24", amount: 4500.00, type: "income" },
    { id: 3, desc: "Netflix Subscription", category: "Entertainment", date: "2026-04-22", amount: 15.99, type: "expense" },
    { id: 4, desc: "Uber to Office", category: "Transport", date: "2026-04-21", amount: 24.50, type: "expense" },
];

export function Transactions() {
    return (
        <div className="space-y-8 h-full flex flex-col">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Transactions</h1>
                    <p className="text-slate-400">View and manage all your income and expenses.</p>
                </div>
                <button className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                    <Plus size={20} /> Add New
                </button>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden flex-1"
            >
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <div className="relative w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search transactions..." 
                            className="w-full bg-black/20 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-500"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-slate-300 transition-colors border border-white/10">
                        <Filter size={18} /> Filter
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-black/20 text-slate-400 text-sm">
                                <th className="p-4 font-medium first:pl-6">Description</th>
                                <th className="p-4 font-medium">Category</th>
                                <th className="p-4 font-medium">Date</th>
                                <th className="p-4 font-medium text-right last:pr-6">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockTransactions.map((t, idx) => (
                                <motion.tr 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * idx }}
                                    key={t.id} 
                                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group cursor-pointer"
                                >
                                    <td className="p-4 first:pl-6 font-medium text-slate-200">{t.desc}</td>
                                    <td className="p-4">
                                        <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-slate-300 border border-white/10">{t.category}</span>
                                    </td>
                                    <td className="p-4 text-slate-400">{t.date}</td>
                                    <td className={`p-4 text-right last:pr-6 font-bold ${t.type === 'income' ? 'text-emerald-400' : 'text-slate-200'}`}>
                                        {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
