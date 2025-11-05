"use client";

import Image from "next/image";
import { Clock, Info, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface CompanionCardProps {
	id: number;
	name: string;
	age: string;
	image: string;
	message: string;
	isOnline: boolean;
}

export function CompanionCard({
	name,
	age,
	image,
	message,
	isOnline,
}: CompanionCardProps) {
	return (
		<div className="group relative bg-slate-800/90 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-slate-800 transition-all duration-300 cursor-pointer border border-slate-700/50 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/25">
			<div className="aspect-[3/4] relative">
				<Image
					src={image || "/placeholder.svg"}
					alt={name}
					width={1000}
					height={1000}
					className="object-cover transition-transform duration-300 group-hover:scale-105"
				/>

				{/* Online status indicator */}
				<div className="absolute top-4 right-4">
					<div
						className={cn(
							"w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm border",
							isOnline
								? "bg-green-500/20 border-green-500/50"
								: "bg-gray-500/20 border-gray-500/50",
						)}
					>
						<Info
							className={cn(
								"w-4 h-4",
								isOnline ? "text-green-400" : "text-gray-400",
							)}
						/>
					</div>
				</div>

				{/* Gradient overlay */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/100  via-black/20 to-transparent" />

				{/* Content overlay */}
				<div className="absolute bottom-0 left-0 right-0 py-4 px-3">
					<div className="space-y-3">
						{/* Name and age */}
						<div>
							<h3 className="text-xl font-s emibold text-white">{name}</h3>
							<p className="text-gray-300 text-sm font-medium">{age}</p>
						</div>

						{/* Message */}
						<div className="flex items-center space-x-2">
							<Sparkles className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
							<p className="text-gray-200 text-sm leading-relaxed">{message}</p>
						</div>
					</div>
				</div>

				{/* Hover effect overlay */}
				<div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
			</div>
		</div>
	);
}
