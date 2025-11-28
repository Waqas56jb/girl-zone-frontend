"use client";

import { Heart, Users, User, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
	const { user, logout } = useAuth();
	const starBalance = user?.stars ?? 0;
	const router = useRouter();

	const handleLogout = () => {
		logout();
		router.push("/");
	};
	return (
		<nav className="py-4 md:px-6 w-full border-slate-800 ">
			<div className="mx-auto ">
				<div className="flex items-center justify-between h-16">
					{/* Left side navigation */}
					<div className="flex items-center space-x-5 md:space-x-1 p-1 rounded-lg bg-[#111026] backdrop-blur-md">
						<Link
							href="/"
							className="flex items-center space-x-2 text-white hover:text-slate-100 transition-colors p-4 rounded-lg hover:bg-slate-600 border border-transparent hover:border-slate-500"
						>
							{" "}
							<div className="w-3 h-3  rounded-full flex items-center justify-center">
								<Image
									src="/icon/girl.svg"
									alt="Logo"
									width={24}
									height={24}
									className="rounded-full"
								/>
							</div>
							<span className="text-sm font-medium">Girlfriend</span>
						</Link>

						<Link
							href="/hentai"
							className="flex items-center space-x-2 text-white hover:text-slate-100 transition-colors p-4 rounded-lg hover:bg-slate-600/80 border border-transparent hover:border-slate-500"
						>
							<div className="w-4 h-4  rounded-full flex items-center justify-center">
								<Image
									src="/icon/anime.svg"
									alt="Logo"
									width={24}
									height={24}
									className="rounded-full"
								/>
							</div>
							<span className="text-sm font-medium">Hentai</span>
						</Link>

						<Link
							href="/boyfriend"
							className="flex items-center space-x-2 text-white hover:text-slate-100 transition-colors p-4 rounded-lg hover:bg-slate-600/80 border border-transparent hover:border-slate-500"
						>
							<div className="w-4 h-4  rounded-full flex items-center justify-center">
								<Image
									src="/icon/male.svg"
									alt="Logo"
									width={24}
									height={24}
									className="rounded-full"
								/>
							</div>
							<span className="text-sm font-medium">Boyfriend</span>
						</Link>
					</div>

					{/* Right side buttons */}
					<div className="hidden md:flex items-center space-x-4">
						{user ? (
							<>
								{/* User info */}
								<div className="flex items-center space-x-2 text-white">
									<User className="w-4 h-4" />
									<span className="text-sm font-medium">{user.name}</span>
									<span className="text-xs text-gray-400">({starBalance} ⭐)</span>
								</div>
								
								{/* Dashboard link */}
								<Link href="/generate">
									<Button
										variant="ghost"
										className="text-white bg-[#111026] hover:text-slate-300 p-6 hover:bg-slate-800"
									>
										Dashboard
									</Button>
								</Link>

								{/* Logout button */}
								<Button
									onClick={handleLogout}
									variant="ghost"
									className="text-white bg-red-600/20 hover:bg-red-600/30 p-6 hover:text-red-300 border border-red-500/30"
								>
									<LogOut className="w-4 h-4 mr-2" />
									Logout
								</Button>
							</>
						) : (
							<>
								<Link href="/login">
									<Button
										variant="ghost"
										className="text-white bg-[#111026] hover:text-slate-300 p-6 hover:bg-slate-800"
									>
										Login
									</Button>
								</Link>
								<Link href="/register">
									<Button className="bg-purple-600 p-6 hover:bg-purple-700 text-white">
										Register
									</Button>
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}
