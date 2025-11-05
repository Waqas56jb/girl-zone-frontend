"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AffiliateCard() {
	return (
		<section
			className="relative my-3 md:m-6 lg:mx-8 text-white rounded-2xl px-6 py-12 md:py-20 overflow-hidden text-center"
			style={{
				background: `radial-gradient(circle at center, rgba(11,11,31,0.6) 0%, #0B0B1F 100%)`,
			}}
		>
			{/* Top coin image */}
			<Image
				src="/custom/dollar-left.png"
				alt="Coin"
				width={120}
				height={120}
				className="absolute top-0 left-0   w-30 h-30 hidden lg:block"
			/>
			<Image
				src="/custom/dollar-right.png"
				alt="Coin"
				width={80}
				height={80}
				className="lg:hidden absolute top-0 right-0 md:top-0 md:left-0 w-24 h-24 md:w-32 md:h-32 "
			/>

			{/* Bottom megaphone image */}
			<Image
				src="/custom/megaphone.png"
				alt="Megaphone"
				width={250}
				height={250}
				className="absolute bottom-[-20px] left-[-20px] md:bottom-[-40px] lg:bottom-0 md:left-4 w-40 h-40 md:w-52 md:h-52"
			/>

			{/* Side coin for larger screens */}
			<Image
				src="/custom/coin.png"
				alt="Coin"
				width={300}
				height={300}
				className="hidden lg:block absolute right-0 bottom-0 w-72 h-72"
			/>

			{/* Text Content */}
			<div className="max-w-xl mx-auto my-12 lg:my-4 space-y-4">
				<p className="text-sm text-purple-400">Affiliate Program</p>
				<h2 className="text-4xl lg:text-6xl font-semibold">
					Drive Traffic and <br /> Get Paid
				</h2>
				<p className="text-base  text-muted-foreground max-w-md mx-auto">
					We have a <span className="text-gray-300">$35 CPA/PPS</span> affiliate
					offer. You get $35 for each paying customer you refer to us.
				</p>
				<Button className="mt-4 p-6 bg-purple-500 hover:bg-purple-700  shadow-lg shadow-purple-500/25">
					Get Started
				</Button>
			</div>
		</section>
	);
}
