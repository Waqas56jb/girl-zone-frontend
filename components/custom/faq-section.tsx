"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

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

export function FaqSection() {
	const [openFaq, setOpenFaq] = useState<number | null>(null);

	const toggleFaq = (id: number) => {
		setOpenFaq(openFaq === id ? null : id);
	};

	return (
		<section className=" py-12 lg:mx-8 lg:mx-6">
			<div className="w-full ">
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
								<ChevronDown
									className={`w-5 h-5 text-white transition-transform duration-200 ${
										openFaq === faq.id ? "rotate-180" : ""
									}`}
								/>
							</button>

							<div
								className={`px-6 pb-0 overflow-hidden transition-all duration-500 ease-in-out ${
									openFaq === faq.id
										? "max-h-96 opacity-100 py-3"
										: "max-h-0 opacity-0"
								}`}
							>
								<div className="py-2 border-t border-slate-700/50">
									<p className="text-gray-300 leading-relaxed">{faq.answer}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
