"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Sitefooter() {
	return (
		<footer className="backdrop-blur-sm px-6 py-10 md:py-20 text-sm text-gray-300">
			<div className="max-w-7xl mx-auto w-full space-y-10">
				{/* Top Section: Grid Layout */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-10">
					{/* Logo and Info */}
					<div className="space-y-4 text-center md:text-left">
						<div className="flex items-center justify-center md:justify-start space-x-2">
							<Image
								src="/icon/logo.svg"
								alt="Logo"
								width={32}
								height={32}
								className="rounded-full"
							/>
							<span className="text-xl font-bold text-white">GIRLZONE</span>
						</div>
						<p className="text-gray-400">
							Copyright © 2025, GirlZone. All rights reserved.
						</p>
						<p className="text-gray-400">
							7901 4th St N, Ste 133, St. Petersburg FL 45702, USA
						</p>
						<p className="text-gray-400">
							All content is{" "}
							<span className="text-purple-400">AI-generated</span>.
						</p>
						{/* Payment Methods */}
						<div className="flex justify-center md:justify-start gap-2 pt-3">
							<div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
								VISA
							</div>
							<div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
								MC
							</div>
							<div className="bg-orange-600 text-white px-2 py-1 rounded text-xs font-bold">
								DISCOVER
							</div>
						</div>
					</div>

					{/* Policy Links */}
					<div className="grid grid-cols-2 gap-4 text-center md:text-left">
						<div className="space-y-2">
							<Link href="#" className="hover:text-white transition">
								Terms of Service
							</Link>
							<Link href="#" className="hover:text-white transition">
								Company Policy
							</Link>
							<Link href="#" className="hover:text-white transition">
								Cancellation Policy
							</Link>
							<Link href="#" className="hover:text-white transition">
								Complaint Policy
							</Link>
						</div>
						<div className="space-y-2">
							<Link href="#" className="hover:text-white transition">
								Privacy Policy
							</Link>
							<Link href="#" className="hover:text-white transition">
								Content Removal Policy
							</Link>
							<Link href="#" className="hover:text-white transition">
								Report Content
							</Link>
							<Link href="#" className="hover:text-white transition">
								Blog
							</Link>
						</div>
					</div>

					{/* Social & Contact */}
					<div className="space-y-4 text-center md:text-left">
						<div className="flex justify-center md:justify-start gap-4">
							<Link
								href="#"
								className="w-10 h-10 bg-slate-700 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors"
							>
								<Facebook className="w-5 h-5 text-white" />
							</Link>
							<Link
								href="#"
								className="w-10 h-10 bg-slate-700 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors"
							>
								<Instagram className="w-5 h-5 text-white" />
							</Link>
							<Link
								href="#"
								className="w-10 h-10 bg-slate-700 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors"
							>
								<Twitter className="w-5 h-5 text-white" />
							</Link>
						</div>
						<div className="text-gray-400">support@girlzone.ai</div>
					</div>
				</div>

				{/* Bottom Section */}
				<div className="border-t border-slate-700/50 pt-6 flex flex-col md:flex-row justify-between items-center text-center gap-4">
					<p className="text-gray-400">Made with ❤️ for AI enthusiasts</p>
					<p className="text-gray-400">Cancellation Policy</p>
				</div>
			</div>
		</footer>
	);
}
