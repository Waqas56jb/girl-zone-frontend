"use client";

import { useState } from "react";

// Disable SSR for this page
export const dynamic = 'force-dynamic';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import TopBar from "@/components/custom/top-bar";
import EggplantRater from "@/components/custom/eggplant-rater";
import { useAuth } from "@/contexts/AuthContext";
import { Star, Shield, Lock } from "lucide-react";

export default function RaterCard() {
	const { user } = useAuth();
	const [showRater, setShowRater] = useState(false);

	const canAfford = () => {
		if (!user) return false;
		return user.stars >= 45;
	};

	return (
		<div className="">
			<nav className="hidden md:flex">
				<TopBar title="Rate my cock" />
			</nav>
			<section className=" text-white min-h-screen flex flex-col items-center justify-center px-4 py-12">
				<h1 className="text-2xl md:hidden font-semibold text-center mb-8 ">
					Rate my cock
				</h1>
				<div className="max-w-5xl w-full mx-auto grid lg:grid-cols-2 gap-12 items-center">
					{/* Left Image */}
					<div className="flex justify-center lg:justify-end">
						<Image
							src="/custom/rate.png"
							alt="Rater"
							width={300}
							height={300}
							className="rounded-lg object-cover"
						/>
					</div>

					{/* Right Text */}
					<div className="space-y-4 text-center lg:text-left">
						<h2 className="text-3xl font-semibold">Hi there, darling</h2>
						<p className="text-gray-300 leading-relaxed">
							My name is Mrs. Aisling Rater. I'm actually married... But one of
							my favourite pastimes is rating different things. Upload a picture
							of your cock and I'll give you my honest opinion :)
						</p>
						
						{/* Features */}
						<div className="space-y-3 mt-6">
							<div className="flex items-center gap-3 text-sm text-gray-300">
								<Shield className="w-4 h-4 text-green-400" />
								<span>Complete privacy - images auto-deleted</span>
							</div>
							<div className="flex items-center gap-3 text-sm text-gray-300">
								<Lock className="w-4 h-4 text-blue-400" />
								<span>Encrypted and secure</span>
							</div>
							<div className="flex items-center gap-3 text-sm text-gray-300">
								<Star className="w-4 h-4 text-yellow-400" />
								<span>Honest, professional rating</span>
							</div>
						</div>
					</div>
				</div>

				{/* Upload Card */}
				<div className="mt-8 lg:mt-0 w-full max-w-3xl bg-[#0A0D1E] rounded-2xl p-8 border border-slate-800 shadow-lg">
					<div className="flex flex-col items-center justify-center space-y-6">
						<div className=" rounded-3xl border border-slate-800 p-4">
							<Image
								src="/icon/pickle-white.svg"
								alt="Rater"
								width={32}
								height={32}
								className="rounded-lg text-white object-cover"
							/>
						</div>
						<h3 className="text-lg font-semibold">Upload a Photo to Rate</h3>
						<p className="text-sm text-gray-400">
							Supported formats: .jpg, .png, .heic (max 10MB)
						</p>
						
						{/* Cost Display */}
						<div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
							<div className="flex items-center justify-between">
								<span className="text-white font-medium">Cost</span>
								<span className="text-yellow-500 font-bold flex items-center gap-1">
									<Star className="w-4 h-4" />
									45 stars
								</span>
							</div>
							{user && (
								<div className="text-sm text-gray-400 mt-1">
									You have {user.stars} stars available
								</div>
							)}
						</div>

						{!user && (
							<div className="bg-red-900/20 border border-red-700 p-3 rounded-lg text-red-300 text-sm">
								You must be logged in to use the eggplant rater
							</div>
						)}

						{user && !canAfford() && (
							<div className="bg-red-900/20 border border-red-700 p-3 rounded-lg text-red-300 text-sm">
								Not enough stars. You need 45 stars to use the rater.
							</div>
						)}

						<Button 
							onClick={() => setShowRater(true)}
							disabled={!user || !canAfford()}
							className="bg-purple-600 hover:bg-purple-700 px-8 py-3 text-white text-sm rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{!user ? 'Login Required' : !canAfford() ? 'Not Enough Stars' : 'Upload & Rate'}
						</Button>
					</div>
				</div>

				{/* Information Section */}
				<div className="mt-12 w-full max-w-4xl space-y-6">
					<div className="bg-slate-800/30 rounded-lg p-6 border border-slate-700">
						<h3 className="text-xl font-semibold text-white mb-4">Why Rate My Cock?</h3>
						<p className="text-gray-300 leading-relaxed mb-4">
							Men get their cocks rated for all sorts of reasons. Some are feeling curious and wonder if their dick is big enough or normal looking. Is it thick enough? Is it good enough to suck? Some think their dong is great and just want a second opinion. Others want to know if they should trim or go full bush. Although many men want praise or reassurance, others have a humiliation kink and want their cock to be roasted instead.
						</p>
						<p className="text-gray-300 leading-relaxed">
							Whatever your reason, Mrs. Aisling Rater's Rate My Cock service is here to help with genuine and honest responses.
						</p>
					</div>

					<div className="bg-slate-800/30 rounded-lg p-6 border border-slate-700">
						<h3 className="text-xl font-semibold text-white mb-4">How Does It Work?</h3>
						<p className="text-gray-300 leading-relaxed">
							Dad cocks, British cocks, American cocks, uncut cocks, circumcised cocks, virgin cocks, I rate them all. Simply upload an unedited photo of your cock and I will tell you how well hung you are and give you some ideas about what you can do with your cock.
						</p>
					</div>

					<div className="bg-slate-800/30 rounded-lg p-6 border border-slate-700">
						<h3 className="text-xl font-semibold text-white mb-4">Privacy Protection</h3>
						<p className="text-gray-300 leading-relaxed">
							Mrs. Aisling Rater maintains strict confidentiality of pictures uploaded to this platform. The pictures are encrypted and become inaccessible after the rating is completed, even to the account owner.
						</p>
					</div>
				</div>
			</section>

			{/* Eggplant Rater Modal */}
			{showRater && (
				<EggplantRater
					onClose={() => setShowRater(false)}
					onRatingComplete={(rating) => {
						console.log('Rating completed:', rating);
						setShowRater(false);
					}}
				/>
			)}
		</div>
	);
}
