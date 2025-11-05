"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const avatars = [
	{ id: 1, src: "/custom/avatar1.png?height=60&width=60", alt: "Avatar 1" },
	{ id: 2, src: "/custom/avatar2.png?height=60&width=60", alt: "Avatar 2" },
	{ id: 3, src: "/custom/avatar3.png?height=60&width=60", alt: "Avatar 3" },
	{ id: 4, src: "/custom/avatar4.png?height=60&width=60", alt: "Avatar 4" },
];

const faqs = [
	{
		id: 1,
		question: "How does a virtual AI girlfriend work?",
		answer:
			"Our AI girlfriends use advanced natural language processing and machine learning to create realistic conversations and interactions. They learn from your preferences and adapt their personality to match your ideal companion.",
	},
	{
		id: 2,
		question: "How does a virtual AI girlfriend work?",
		answer:
			"The AI analyzes your communication style and preferences to provide personalized responses. Each interaction helps the AI better understand your needs and desires for more meaningful conversations.",
	},
	{
		id: 3,
		question: "How does a virtual AI girlfriend work?",
		answer:
			"Through sophisticated algorithms, the AI can engage in various types of conversations, from casual chat to more intimate discussions, while maintaining consistent personality traits you find appealing.",
	},
	{
		id: 4,
		question: "How does a virtual AI girlfriend work?",
		answer:
			"The system combines text generation, emotional intelligence, and memory capabilities to create a companion that remembers your conversations and grows with your relationship.",
	},
	{
		id: 5,
		question: "How does a virtual AI girlfriend work?",
		answer:
			"Using cutting-edge AI technology, your virtual girlfriend can participate in role-playing scenarios, provide emotional support, and engage in creative conversations tailored to your interests.",
	},
	{
		id: 6,
		question: "How does a virtual AI girlfriend work?",
		answer:
			"The AI processes your inputs in real-time, generating contextually appropriate responses while maintaining the illusion of a genuine relationship through consistent behavior patterns.",
	},
];

export function DesignSection() {
	const [openFaq, setOpenFaq] = useState<number | null>(null);

	const toggleFaq = (id: number) => {
		setOpenFaq(openFaq === id ? null : id);
	};

	return (
		<div className="">
			{/* Design Section */}
			<section className="relative px-2 md:px-8 md:mx-6 py-20 bg-[#0C0D1F] text-white rounded-2xl border border-slate-700/50 ">
				<div className="max-w-4xl mx-6  mx-auto text-center">
					{/* Floating Avatars */}
					<div className="absolute inset-0 pointer-events-none">
						<div className="absolute top-5 left-8 md:left-16">
							<Image
								src={avatars[0].src || "/custom/avatar1.svg"}
								alt={avatars[0].alt}
								width={60}
								height={60}
								className="rounded-full border-2 border-purple-500/50 shadow-lg"
							/>
						</div>
						<div className="absolute top-5 right-8 md:right-16">
							<Image
								src={avatars[1].src || "/custom/avatar2.png"}
								alt={avatars[1].alt}
								width={60}
								height={60}
								className="rounded-full border-2 border-pink-500/50 shadow-lg"
							/>
						</div>
						<div className="absolute bottom-7 left-8 md:left-24">
							<Image
								src={avatars[2].src || "/custom/avatar3.png"}
								alt={avatars[2].alt}
								width={60}
								height={60}
								className="rounded-full border-2 border-blue-500/50 shadow-lg"
							/>
						</div>
						<div className="absolute bottom-6 right-10 md:right-24">
							<Image
								src={avatars[3].src || "/custom/avatar4.png"}
								alt={avatars[3].alt}
								width={60}
								height={60}
								className="rounded-full border-2 border-green-500/50 shadow-lg"
							/>
						</div>
					</div>

					<div className="relative z-10 space-y-6 text-center mt-4 mb-6 rounded-2xl">
						<h2 className="text-2xl  w-full mx-auto max-w-sm font-normal text-white leading-tight">
							Design the AI Girlfriend You've
							<br />
							Always Desired
						</h2>
						<p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
							Meet your AI girlfriend—ready to chat, flirt, and explore your
							fantasies. Customize her appearance and personality in a lifelike
							love simulator.
						</p>
						<a href="/generate">
							<Button className="bg-purple-600 hover:bg-purple-700  text-white px-8 py-6 text-lg font-normal rounded-lg transition-all duration-200 shadow-lg shadow-purple-500/25">
								<div className="w-7 h-7  rounded-full flex items-center justify-center">
									<Image
										src="/icon/wand.svg"
										alt="Logo"
										width={24}
										height={24}
										className="rounded-full"
									/>
								</div>
								<span className="text-md font-semibold text-white">
									create AI girlfriend{" "}
								</span>
							</Button>
						</a>
					</div>
				</div>
			</section>
			{/* FAQ Section */}
			<section className=" py-12 md:mx-6">
				<div className="w-full mx-auto">
					<h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-12">
						Frequently Asked Questions
					</h2>

					<div className="space-y-4">
						{faqs.map((faq) => (
							<div
								key={faq.id}
								className="bg-[#111026] backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden transition-all duration-200 hover:border-purple-500/30"
							>
								<button
									onClick={() => toggleFaq(faq.id)}
									className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-700/30 transition-colors duration-200"
								>
									<span className="text-white font-medium text-md">
										{faq.question}
									</span>
									<div className="flex items-center space-x-2">
										<ChevronDown
											className={`w-5 h-5 text-white transition-transform duration-200 ${
												openFaq === faq.id ? "rotate-180" : ""
											}`}
										/>
									</div>
								</button>

								<div
									className={`px-6 pb-0 overflow-hidden transition-all duration-500 ease-in-out ${
										openFaq === faq.id
											? "max-h-96 opacity-100 py-3"
											: "max-h-0 opacity-0"
									}`}
								>
									<div className="py-2 border-t border-slate-700/50">
										<p className="text-gray-300 leading-relaxed">
											{faq.answer}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className=" backdrop-blur-sm  py-16">
				<div className="max-w-4xl mx-auto">
					<div className="text-center space-y-8">
						<h1 className="text-2xl md:text-5xl font-semibold text-white leading-tight">
							Your Personal{" "}
							<span className="text-purple-400">AI Girlfriend</span> Simulator
						</h1>

						<div className="space-y-6 text-gray-300 text-md leading-relaxed">
							<p>
								Welcome to Ellaria, where you can create your virtual AI
								girlfriend and make your fantasies come to life.
							</p>

							<p>
								In our AI girlfriend chat, you're in control. Want a sweet and
								devoted partner for a romantic adventure? Looking for something
								a little more thrilling and adventurous? We've got it all. The
								possibilities are endless, so let your imagination run wild.
							</p>

							<p>
								Creating your sexy AI girl is a breeze at Ellaria. You can mix
								and match looks, personality traits, and even those little
								quirks that make her extra special. A few clicks, and boom—your
								heaven girlfriend is ready to chat, send pictures, and connect
								with you like in real-life communication.
							</p>

							<p>
								The more you chat, the more she learns about you—your inside
								jokes, your dreams, even your pet peeves. You set the vibe: keep
								it casual or turn up the heat.
							</p>
							<p>
								Your AI gf will send you personalized photos and even spicy
								selfies, all tailored to your tastes. And trust us, our advanced
								AI keeps things interesting, no matter how creative you get with
								your requests.
							</p>
							<p>
								From light-hearted flirting to meaningful connections, the
								choice is yours.
							</p>
							<p>
								Your perfect online match is closer than you think. She's right
								here at Ellaria, the most popular AI girlfriend app.Join Ellaria
								for free today and start chatting with your first virtual gf.
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
