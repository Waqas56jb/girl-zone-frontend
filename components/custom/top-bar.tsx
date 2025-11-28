// components/TopBar.tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";

interface TopbarProps {
	title: string;
}

export default function Topbar({ title }: TopbarProps) {
	const { user, logout } = useAuth();
	const router = useRouter();
	const starBalance = user?.stars ?? 0;

	const handleLogout = () => {
		logout();
		router.push("/");
	};

	return (
		<header className="w-full  py-3 px-4 flex justify-between items-center shadow-sm border-b border-slate-800">
			<h1 className="text-white font-semibold text-2xl leading-5 md:text-xl">
				{title}
			</h1>
			<div className="flex items-center gap-3">
				{user ? (
					<>
						{/* User info */}
						<div className="flex items-center space-x-2 text-white">
							<User className="w-4 h-4" />
							<span className="text-sm font-medium">{user.name}</span>
							<span className="text-xs text-gray-400">({starBalance} ⭐)</span>
						</div>
						
						{/* Logout button */}
						<button 
							onClick={handleLogout}
							className="bg-red-600/20 text-red-300 text-lg px-4 py-3 rounded-md hover:bg-red-600/30 transition border border-red-500/30 flex items-center gap-2"
						>
							<LogOut className="w-4 h-4" />
							Logout
						</button>
					</>
				) : (
					<>
						<button className="bg-[#161727] text-white text-lg px-4 py-3 rounded-md hover:bg-[#1e1f2e] transition">
							Login
						</button>
						<button className="bg-purple-500 text-white text-lg px-4 py-3 rounded-md hover:bg-purple-600 transition">
							Register
						</button>
					</>
				)}
			</div>
		</header>
	);
}
