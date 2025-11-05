// app/pricing/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import clsx from "clsx";

const plans = [
	{
		name: "Pricing",
		price: "$29/mo",
		features: [
			"Keyword optimization",
			"Automated meta tags",
			"SEO monitoring",
			"Monthly reports",
		],
		highlighted: false,
	},
	{
		name: "Pro",
		price: "$79/mo",
		features: [
			"Keyword optimization",
			"Automated meta tags",
			"SEO monitoring",
			"Monthly reports",
			"Content suggestions",
			"Link optimization",
		],
		highlighted: true,
	},
	{
		name: "Business",
		price: "$149/mo",
		features: [
			"Keyword optimization",
			"Automated meta tags",
			"SEO monitoring",
			"Monthly reports",
			"Content suggestions",
			"Link optimization",
			"Multi-user access",
			"API integration",
		],
		highlighted: false,
	},
];

export default function PricingPage() {
	return (
		<div className="min-h-screen bg-[#000212] text-white px-4 py-20 flex items-center justify-center">
			<div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
				{plans.map((plan, i) => (
					<Card
						key={i}
						className={clsx(
							"border border-white/10 bg-[#0b0b14] rounded-2xl transition-all",
							plan.highlighted &&
								"relative bg-gradient-to-br from-[#1a0a40] to-[#0d011f] border-none shadow-[0_0_40px_10px_rgba(124,58,237,0.3)]",
						)}
					>
						<CardHeader>
							<CardTitle className="text-xl font-semibold">
								{plan.name}
							</CardTitle>
							<p className="text-lg text-white/70">{plan.price}</p>
						</CardHeader>
						<CardContent>
							<ul className="space-y-3 my-4">
								{plan.features.map((feature, idx) => (
									<li
										key={idx}
										className="flex items-center gap-2 text-sm text-white/80"
									>
										<Check className="w-4 h-4 text-green-400" />
										{feature}
									</li>
								))}
							</ul>
							<Button
								variant="outline"
								className={clsx(
									"w-full mt-6 border-white/10 text-white hover:bg-white/10",
									plan.highlighted &&
										"bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-none",
								)}
							>
								Join waitlist
							</Button>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
