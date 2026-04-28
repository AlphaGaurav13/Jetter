import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";

export function Layout() {
    return (
        <div className="min-h-screen bg-slate-950 flex selection:bg-indigo-500/30">
            <Sidebar />
            <main className="flex-1 ml-64 p-8 overflow-y-auto">
                <div className="max-w-6xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
