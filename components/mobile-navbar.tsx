"use client";

import { SidebarTrigger } from "./ui/sidebar";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";

export function MobileNavbar() {
	const { user, logout } = useAuth();
	const router = useRouter();
	const starBalance = user?.stars ?? 0;

	const handleLogout = () => {
		logout();
		router.push("/");
	};
	return (
		<div className="px-1  md:hidden w-full flex justify-between  py-3 bg-[#070917] text-white shadow-lg">
			<div className="flex col gap-4">
				{/* Hamburger */}
				<SidebarTrigger className="md:hidden" />
				{/* Logo */}
				<div className="flex items-center space-x-2">
					<div className="w-7 h-7  rounded-full flex items-center justify-center">
						<Image
							src="/icon/logo.svg?height=600&width=400"
							alt="Logo"
							width={32}
							height={32}
							className="rounded-full"
						/>
					</div>
					<span className="text-2xl font-semibold text-white">ELLARIA</span>
				</div>
			</div>

			{/* Right Controls */}
			<div className="flex items-center space-x-4">
				{user ? (
					<>
						{/* User info */}
						<div className="flex items-center space-x-1 text-white">
							<User className="w-4 h-4" />
							<span className="text-xs font-medium">{user.name}</span>
							<span className="text-xs text-gray-400">({starBalance}⭐)</span>
						</div>
						
						{/* Logout button */}
						<button
							onClick={handleLogout}
							className="text-sm font-medium bg-red-600/20 hover:bg-red-600/30 text-red-300 px-3 py-1 rounded-md border border-red-500/30 flex items-center gap-1"
						>
							<LogOut className="w-3 h-3" />
							Logout
						</button>
					</>
				) : (
					<>
						{/* Auth Buttons */}
						<a
							href="/login"
							className="text-sm font-medium text-gray-300 hover:text-white"
						>
							Login
						</a>
						<a
							href="/register"
							className="text-sm font-medium bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md"
						>
							Register
						</a>
					</>
				)}
			</div>
		</div>
	);
}
