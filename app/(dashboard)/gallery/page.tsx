"use client";

import { Wand2 } from "lucide-react";
import Link from "next/link";

export default function EmptyState() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-[#0e0e23] text-white px-4 text-center space-y-6">
			<h1 className="text-4xl md:text-5xl font-bold">
				There's <span className="text-purple-400">Nothing</span> to Show
			</h1>

			<p className="text-gray-400 text-lg">Start Generating Pictures!</p>

			<Link
				href="/generate"
				className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 transition-all duration-300"
			>
				<Wand2 className="w-5 h-5" />
				Go to Generator
			</Link>
		</div>
	);
}
