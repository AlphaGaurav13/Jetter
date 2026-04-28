import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Wallet, CreditCard } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: 'Jan', expense: 4000, income: 6400 },
  { name: 'Feb', expense: 3000, income: 5398 },
  { name: 'Mar', expense: 2000, income: 7800 },
  { name: 'Apr', expense: 2780, income: 3908 },
  { name: 'May', expense: 1890, income: 4800 },
  { name: 'Jun', expense: 2390, income: 3800 },
  { name: 'Jul', expense: 3490, income: 4300 },
];

const StatCard = ({ title, amount, icon, type, delay }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl relative overflow-hidden group"
    >
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            {icon}
        </div>
        <h3 className="text-slate-400 font-medium mb-2">{title}</h3>
        <p className="text-3xl font-bold text-white mb-4">${amount.toLocaleString()}</p>
        <div className={`flex items-center gap-2 text-sm ${type === 'increase' ? 'text-emerald-400' : 'text-rose-400'}`}>
            {type === 'increase' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            <span>12% from last month</span>
        </div>
    </motion.div>
);

export function Dashboard() {
    return (
        <div className="space-y-8">
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Hello, User! 👋</h1>
                    <p className="text-slate-400">Here's your financial overview for this month.</p>
                </div>
                <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                    + Add Transaction
                </button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Balance" amount={12450.50} icon={<Wallet size={80} />} type="increase" delay={0.1} />
                <StatCard title="Total Income" amount={8400.00} icon={<ArrowUpRight size={80} />} type="increase" delay={0.2} />
                <StatCard title="Total Expense" amount={3250.75} icon={<ArrowDownRight size={80} />} type="decrease" delay={0.3} />
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl"
            >
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-white">Cash Flow</h3>
                    <p className="text-slate-400 text-sm">Income vs Expenses over time</p>
                </div>
                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#fb7185" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#fb7185" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                            <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
                            <YAxis stroke="#64748b" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} tickFormatter={(val) => '$' + val} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '1rem' }}
                                itemStyle={{ color: '#f8fafc' }}
                            />
                            <Area type="monotone" dataKey="income" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                            <Area type="monotone" dataKey="expense" stroke="#fb7185" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </div>
    );
}