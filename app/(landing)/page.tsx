"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CompanionCard } from "@/components/custom/companion-card";
import companionsData from "@/data/companions.json";
import Navbar from "./nav-bar";
import { DesignSection } from "@/components/custom/design-section";
import { MobileNavbar } from "@/components/mobile-navbar";
import ContactPage from "@/components/custom/contact-page";

export default function Component() {
	const { companions } = companionsData;

	return (
		<div className="min-h-screen text-white ">
			<nav>
				<Navbar />
			</nav>
					{/* Hero Section */}
			<section className=" max-h-[200px] sm:max-h-[300px] md:max-h-[400px] relative mx-auto rounded-2xl md:mx-6 py-4 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-[url('/girlfriend/hero-gf.png')] bg-cover bg-center bg-no-repeat  px-12 ">
				<div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-2 md:gap-10 items-center">
					{/* Text */}
					<div className="space-y-6">
						<h1 className="text-xl md:text-3xl font-semibold leading-tight">
							Create your own <br />
							<span className="text-purple-400">Girlfriend AI</span>
						</h1>
						<p className="text-gray-300 text-base  leading-relaxed max-w-xl  hidden lg:block">
							The virtual AI girlfriend is waiting to meet you. NSFW
							conversations, photo exchanges, and voice calls — everything you
							need to create a romantic and intimate relationship with your
							virtual AI fantasies.
						</p>
						<a href="/generate">
							<Button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 sm:px-8 sm:py-6 text-lg rounded-xl sm:text-lg shadow-lg shadow-purple-500/25 ">
								Get Started
							</Button>
						</a>
					</div>

					{/* Image */}
					<div className="relative w-full flex justify-center"></div>
				</div>
			</section>

			{/* Companions Section */}
			<section className="py-6 sm:py-16 sm:px-6">
				<div className="max-w-7xl mx-auto">
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-6">
						{companions.map((companion) => (
							<CompanionCard
								key={companion.id}
								id={companion.id}
								name={companion.name}
								age={companion.age}
								image={companion.image}
								message={companion.message}
								isOnline={companion.isOnline}
							/>
						))}
					</div>
				</div>
			</section>

			<section>
				<DesignSection />
			</section>

			{/* CTA Section */}
		</div>
	);
}
