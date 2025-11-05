"use client";

import {
	Search,
	Users,
	Camera,
	MessageCircle,
	Bookmark,
	Star,
	Heart,
	Settings,
	ChevronRight,
	LogOut,
	User,
} from "lucide-react";
import Image from "next/image";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarFooter,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

// Main menu items
const mainItems = [
	{
		title: "Explore",
		url: "/",
		iconSrc: "/icon/compass.svg",
		hasArrow: true,
	},
	{
		title: "Generator",
		url: "/generate",
		iconSrc: "/icon/generator-grey.svg",
	},
	{
		title: "Gallery",
		url: "/gallery",
		iconSrc: "/icon/Picture.svg",
	},
	{
		title: "Chat",
		url: "/chat",
		iconSrc: "/icon/chat.svg",
	},
	{
		title: "Saved",
		url: "/saved",
		iconSrc: "/icon/bookmark.svg",
	},
	{
		title: "Rater",
		url: "/rate",
		iconSrc: "/icon/pickle.svg",
	},
];

// Footer items
const footerItems = [
	{
		title: "Affiliate",
		url: "/affiliate",
		iconSrc: "/icon/affiliate.svg",
	},
	{
		title: "Settings",
		url: "/settings",
		iconSrc: "/icon/settings-grey.svg",
	},
];

export function AppSidebar() {
	const { user, logout } = useAuth();
	const router = useRouter();

	const handleLogout = () => {
		logout();
		router.push("/");
	};

	return (
		<Sidebar className="border-none shadow-lg  bg-white  text-white">
			<div className="flex h-full md:rounded-lg md:m-3 flex-col bg-slate-900/95 backdrop-blur-sm">
				<SidebarHeader className="p-4">
					<div className="flex items-center justify-center space-x-2 ">
						<div className="w-7 h-7  rounded-full flex items-center justify-center">
							<Image
								src="/icon/logo.svg?height=600&width=400"
								alt="Logo"
								width={32}
								height={32}
								className="rounded-full"
							/>
						</div>
						<span className="text-2xl font-semibold text-white">GIRLZONE</span>
					</div>
				</SidebarHeader>

				<SidebarContent className="flex-1 px-3">
					<SidebarGroup>
						<SidebarGroupContent>
							<SidebarMenu className="">
								{mainItems.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton
											asChild
											className="w-full justify-start text-gray-300 hover:text-white hover:bg-slate-600/20 rounded-lg transition-all duration-200 group"
										>
											<a
												href={item.url}
												className="flex items-center justify-between w-full "
											>
												<div className="flex items-center space-x-3 py-4">
													<Image
														src={item.iconSrc}
														alt={item.title}
														className="w-6 h-6"
														width={24}
														height={24}
													/>
													<span className="font-medium text-lg">
														{item.title}
													</span>
												</div>
												{item.hasArrow && (
													<ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
												)}
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>

				<SidebarFooter className="m-3 p-3 border rounded-lg border-slate-700/50">
					<SidebarMenu className="">
						{footerItems.map((item) => (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton
									asChild
									className="w-full justify-start text-gray-400 hover:text-white hover:bg-slate-600/20 rounded-lg transition-all duration-200"
								>
									<a href={item.url} className="flex items-center space-x-3">
										<Image
											src={item.iconSrc}
											alt={item.title}
											className="w-6 h-6"
											width={24}
											height={24}
										/>
										<span className="text-sm font-medium">{item.title}</span>
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
						
						{/* User info and logout */}
						{user && (
							<>
								{/* User info */}
								<SidebarMenuItem>
									<div className="flex items-center space-x-3 p-3 text-gray-300 border-t border-slate-700/50 mt-2 pt-3">
										<User className="w-5 h-5" />
										<div className="flex-1">
											<div className="text-sm font-medium">{user.name}</div>
											<div className="text-xs text-gray-400">{user.stars} ⭐</div>
										</div>
									</div>
								</SidebarMenuItem>
								
								{/* Logout button */}
								<SidebarMenuItem>
									<SidebarMenuButton
										onClick={handleLogout}
										className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-600/20 rounded-lg transition-all duration-200"
									>
										<LogOut className="w-5 h-5" />
										<span className="text-sm font-medium ml-3">Logout</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							</>
						)}
					</SidebarMenu>
				</SidebarFooter>
			</div>
		</Sidebar>
	);
}
