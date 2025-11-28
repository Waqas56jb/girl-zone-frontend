"use client";

import { useState } from "react";

// Disable SSR for this page
export const dynamic = 'force-dynamic';
import { Camera, Plus, Info, Star, Loader2 } from "lucide-react";
import { Image as PictureFrameIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import TopBar from "@/components/custom/top-bar";
import clsx from "clsx";
import { useCompanions, useCustomAis, useApiMutation } from "@/hooks/use-api";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { apiClient } from "@/lib/api";
import AiCreator from "@/components/custom/ai-creator";
import StarPackages from "@/components/custom/star-packages";

const tagCategories = [
	{ name: "Vibe", active: true },
	{ name: "Action", active: false },
	{ name: "Clothing", active: false },
	{ name: "Scene", active: false },
	{ name: "Accessories", active: false },
];

const poseTags = [
	"Standing",
	"Sitting",
	"Squatting",
	"Lying Down",
	"Working Out",
	"Swimming",
];

const presetOptions = [
	"ass", "pussy spread out", "bdsm", "cum", "reverse cowgirl", "handjob", 
	"vaginal riding", "double penetration", "anilingus", "naked", "anal doggystyle", 
	"buttplug", "fingering", "missionary position", "boobs", "vaginal sex", 
	"gangbang", "cowgirl", "analriding", "blowjob", "fucked by black male", "dildo"
];

const pictureOptions = [1, 4, 8];

export default function GeneratePage() {
	const { user } = useAuth();
	const [selectedCharacter, setSelectedCharacter] = useState<
		"existing" | "new"
	>("existing");
	const [prompt, setPrompt] = useState(
		"Long Sundress, Walking, Beach Background, Palm Trees",
	);
	const [selectedTags, setSelectedTags] = useState<string[]>(["Standing"]);
	const [selectedPictures, setSelectedPictures] = useState(4);
	const [activeCategory, setActiveCategory] = useState("Vibe");
	const [selectedCompanion, setSelectedCompanion] = useState<number | null>(null);
	const [selectedCustomAi, setSelectedCustomAi] = useState<number | null>(null);
	const [showAiCreator, setShowAiCreator] = useState(false);
	const [showStarPackages, setShowStarPackages] = useState(false);
	const [generating, setGenerating] = useState(false);
	const [generatedImages, setGeneratedImages] = useState<string[]>([]);
	const [selectedStyle, setSelectedStyle] = useState<'realistic' | 'anime'>('realistic');

	const { data: companions = [] } = useCompanions() as { data: any[]; loading: boolean; error: string | null };
	const { data: customAis = [] } = useCustomAis() as { data: any[]; loading: boolean; error: string | null };
	const { mutate: createGeneration } = useApiMutation();

	const toggleTag = (tag: string) => {
		setSelectedTags((prev) =>
			prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
		);
	};

	const getStarCost = () => {
		const baseCost = selectedPictures * 7;
		return baseCost;
	};

	const canAfford = () => {
		if (!user) return false;
		const stars = user.stars ?? 0;
		return stars >= getStarCost();
	};

	const handleGenerate = async () => {
		if (!user) {
			toast.error('You must be logged in to generate images');
			return;
		}

		if (!canAfford()) {
			toast.error(`You need ${getStarCost()} stars to generate ${selectedPictures} image(s)`);
			setShowStarPackages(true);
			return;
		}

		if (selectedCharacter === 'existing' && !selectedCompanion) {
			toast.error('Please select a companion');
			return;
		}

		if (selectedCharacter === 'new' && !selectedCustomAi) {
			toast.error('Please select a custom AI or create one');
			return;
		}

		setGenerating(true);
		try {
			const result = await createGeneration(
				(data: any) => apiClient.createGeneration(data),
				{
					prompt,
					companion_id: selectedCharacter === 'existing' ? selectedCompanion : undefined,
					custom_ai_id: selectedCharacter === 'new' ? selectedCustomAi : undefined,
					tags: selectedTags,
					number_of_pictures: selectedPictures,
					character_type: selectedCharacter,
					quality: 'high', // Default to high quality
					style: selectedStyle, // Use selected style
					width: 512, // Default width
					height: 512, // Default height
				}
			);

			if (result && (result as any).data) {
				toast.success('Image generation started!');
				setGeneratedImages([]); // Reset for new generation
				
				// Poll for completion
				pollGenerationStatus((result as any).data.id);
			}
		} catch (error) {
			toast.error('Failed to start image generation');
		} finally {
			setGenerating(false);
		}
	};

	const pollGenerationStatus = async (generationId: number) => {
		const maxAttempts = 60; // 5 minutes with 5-second intervals
		let attempts = 0;

		const poll = async () => {
			try {
				const response = await apiClient.getGenerationStatus(generationId);
				
				if (response.success && (response as any).data) {
					const data = (response as any).data;
					if (data.status === 'completed' && data.images) {
						// Generation completed successfully
						setGeneratedImages(data.images.map((img: any) => img.url || img.path));
						toast.success(`Generated ${data.images.length} image(s) successfully!`);
						return;
					} else if (data.status === 'failed') {
						toast.error('Image generation failed. Please try again.');
						return;
					} else if (data.status === 'processing' || data.status === 'pending') {
						// Still processing, continue polling
						attempts++;
						if (attempts < maxAttempts) {
							setTimeout(poll, 5000); // Poll every 5 seconds
						} else {
							toast.error('Image generation timed out. Please check your gallery.');
						}
					}
				}
			} catch (error) {
				console.error('Error polling generation status:', error);
				attempts++;
				if (attempts < maxAttempts) {
					setTimeout(poll, 5000);
				} else {
					toast.error('Failed to check generation status.');
				}
			}
		};

		poll();
	};

	return (
		<div className="min-h-screen text-white">
			<nav className="hidden md:flex">
				<TopBar title="NSFW AI Image Generator" />
			</nav>
			<div className="container mx-auto px-4 py-8 max-w-7xl">
				{/* Header */}
				<div className="mb-8 ">
					<h1 className="text-3xl md:text-4xl font-bold text-center mb-8 md:hidden">
						Character Generator
					</h1>

					{/* Step 1: Choose Character */}
					<div className="mb-8 md:hidden">
						<h2 className="text-lg font-semibold mb-4 flex items-center">
							<span className=" text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
								1.
							</span>
							Choose Character
						</h2>

						<div className="grid grid-cols-2 gap-4 max-w-md mx-auto md:mx-0">
							<button
								onClick={() => setSelectedCharacter("existing")}
								className={cn(
									"flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200",
									selectedCharacter === "existing"
										? "border-purple-500 bg-purple-500/20"
										: "border-slate-600 bg-slate-800/50 hover:border-slate-500",
								)}
							>
								<Camera className="w-8 h-8 mb-2" />
								<span className="text-sm font-medium">Existing Character</span>
							</button>

							<button
								onClick={() => setSelectedCharacter("new")}
								className={cn(
									"flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200",
									selectedCharacter === "new"
										? "border-purple-500 bg-purple-500/20"
										: "border-slate-600 bg-slate-800/50 hover:border-slate-500",
								)}
							>
								<Plus className="w-8 h-8 mb-2 rounded-full p-4" />
								<span className="text-sm font-medium">New Character</span>
							</button>
						</div>
					</div>
				</div>

				{/* Main Content */}
				<div className="grid lg:grid-cols-2 gap-8">
					{/* Left Side - Preview */}
					<div className="order-2 lg:order-1 md:sticky md:top-16">
						<div className="bg-gradient-to-tr from-purple-900 via-gray-900 to-black backdrop-blur-sm rounded-2xl  border border-slate-700/50 p-8 h-80 lg:h-96 flex items-center justify-center">
							<div className="justify-center items-center flex-row">
								<PictureFrameIcon className="w-12 h-12 text-gray-500 w-full" />
								<p className="text-gray-400 text-center">
									Pictures you generate will be shown here
								</p>
							</div>
						</div>
					</div>

					{/* Right Side - Controls */}
					<div className="order-1 lg:order-2 space-y-6">
						<div className="mb-8 hidden md:block">
							<h2 className="text-lg font-semibold mb-4 flex items-center">
								<span className=" text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
									1.
								</span>
								Choose Character
							</h2>

							<div className="grid grid-cols-2 gap-4 max-w-md mx-auto md:mx-0">
								<button
									onClick={() => setSelectedCharacter("existing")}
									className={cn(
										"flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200",
										selectedCharacter === "existing"
											? "border-purple-500 bg-purple-500/20"
											: "border-slate-600 bg-slate-800/50 hover:border-slate-500",
									)}
								>
									<Camera className="w-8 h-8 mb-2" />
									<span className="text-sm font-medium text-white">
										Existing Character
									</span>
								</button>

								<button
									onClick={() => setSelectedCharacter("new")}
									className={cn(
										"flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200",
										selectedCharacter === "new"
											? "border-purple-500 bg-purple-500/20"
											: "border-slate-600 bg-slate-800/50 hover:border-slate-500",
									)}
								>
									<Plus className="w-8 h-8 mb-2" />
									<span className="text-sm font-medium text-white">New Character</span>
								</button>
							</div>
						</div>
						{/* Character Selection */}
						{selectedCharacter === 'existing' && companions && Array.isArray(companions) && companions.length > 0 && (
							<div>
								<h2 className="text-lg font-semibold mb-4 flex items-center">
									<span className=" text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
										2.
									</span>
									Select Companion
								</h2>
								<div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-40 overflow-y-auto">
									{companions.map((companion: any) => (
										<button
											key={companion.id}
											onClick={() => setSelectedCompanion(companion.id)}
											className={cn(
												"flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-200",
												selectedCompanion === companion.id
													? "border-purple-500 bg-purple-500/20"
													: "border-slate-600 bg-slate-800/50 hover:border-slate-500"
											)}
										>
											<img
												src={companion.image}
												alt={companion.name}
												className="w-12 h-12 rounded-full object-cover mb-2"
											/>
											<span className="text-xs font-medium text-center text-white">{companion.name}</span>
										</button>
									))}
								</div>
							</div>
						)}

						{selectedCharacter === 'new' && (
							<div>
								<h2 className="text-lg font-semibold mb-4 flex items-center">
									<span className=" text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
										2.
									</span>
									Select Custom AI
								</h2>
								<div className="space-y-3">
									{customAis && Array.isArray(customAis) && customAis.length > 0 ? (
										<div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-40 overflow-y-auto">
											{customAis.map((ai: any) => (
												<button
													key={ai.id}
													onClick={() => setSelectedCustomAi(ai.id)}
													className={cn(
														"flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-200",
														selectedCustomAi === ai.id
															? "border-purple-500 bg-purple-500/20"
															: "border-slate-600 bg-slate-800/50 hover:border-slate-500"
													)}
												>
													<div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center mb-2">
														<span className="text-white font-bold text-sm">{ai.name[0]}</span>
													</div>
													<span className="text-xs font-medium text-center text-white">{ai.name}</span>
												</button>
											))}
										</div>
									) : (
										<div className="text-center py-8">
											<p className="text-gray-400 mb-4">No custom AIs created yet</p>
											<Button
												onClick={() => setShowAiCreator(true)}
												className="bg-purple-600 hover:bg-purple-700 text-white"
											>
												Create Your First AI
											</Button>
										</div>
									)}
									<Button
										onClick={() => setShowAiCreator(true)}
										variant="outline"
										className="w-full bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
									>
										+ Create New AI
									</Button>
								</div>
							</div>
						)}

						{/* Step 3: Select Style */}
						<div>
							<h2 className="text-lg font-semibold mb-4 flex items-center">
								<span className="text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
									{selectedCharacter === 'existing' ? '3' : '3'}.
								</span>
								Select Style
							</h2>
							<div className="grid grid-cols-2 gap-4 max-w-md mx-auto md:mx-0">
								<button
									onClick={() => setSelectedStyle('realistic')}
									className={cn(
										"flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200",
										selectedStyle === 'realistic'
											? "border-purple-500 bg-purple-500/20"
											: "border-slate-600 bg-slate-800/50 hover:border-slate-500",
									)}
								>
									<PictureFrameIcon className="w-8 h-8 mb-2" />
									<span className="text-sm font-medium text-white">Realistic</span>
								</button>

								<button
									onClick={() => setSelectedStyle('anime')}
									className={cn(
										"flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200",
										selectedStyle === 'anime'
											? "border-purple-500 bg-purple-500/20"
											: "border-slate-600 bg-slate-800/50 hover:border-slate-500",
									)}
								>
									<Star className="w-8 h-8 mb-2" />
									<span className="text-sm font-medium text-white">Anime</span>
								</button>
							</div>
						</div>

						{/* Step 4: Enter Prompt */}
						<div>
							<h2 className="text-lg font-semibold mb-4 flex items-center">
								<span className=" text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
									{selectedCharacter === 'existing' ? '4' : '4'}.
								</span>
								Enter Prompt - what you'd like to see
								<Info className="w-4 h-4 ml-2 text-gray-400" />
							</h2>

							<Textarea
								value={prompt}
								onChange={(e) => setPrompt(e.target.value)}
								placeholder="Example: Long Sundress, Walking, Beach Background, Palm Trees"
								className="bg-slate-800/50 border-slate-600 text-white placeholder:text-gray-400 min-h-[100px] resize-none"
							/>

							{/* Preset Options */}
							<div className="mt-3">
								<p className="text-sm text-gray-400 mb-2">Quick presets:</p>
								<div className="flex flex-wrap gap-2">
									{presetOptions.slice(0, 6).map((preset) => (
										<button
											key={preset}
											onClick={() => setPrompt(preset)}
											className="px-3 py-1 text-xs bg-slate-700 border border-slate-600 rounded-full text-gray-300 hover:bg-slate-600 hover:text-white transition-colors"
										>
											{preset}
										</button>
									))}
								</div>
							</div>
						</div>

						{/* Tag Categories */}
						<div className="p-1 rounded-lg text-white">
							{/* Category Tabs */}
							<div className="flex flex-wrap justify-between mb-4 p-2 rounded-lg border border-slate-700/50 ">
								{tagCategories.map((category) => (
									<button
										key={category.name}
										onClick={() => setActiveCategory(category.name)}
										className={clsx(
											"p-4 rounded-lg text-sm font-medium transition-all duration-200",
											activeCategory === category.name
												? "bg-purple-600 text-white"
												: " text-gray-300 hover:bg-slate-600",
										)}
									>
										{category.name}
									</button>
								))}
							</div>

							{/* Tags */}
							<div className="flex flex-wrap gap-2">
								{poseTags.map((tag) => (
									<button
										key={tag}
										onClick={() => toggleTag(tag)}
										className={clsx(
											"flex items-center pl-1.5 pr-3 py-1.5  rounded-full text-sm font-medium  transition-all",
											selectedTags.includes(tag)
												? "bg-purple-600/20 border-purple-500 text-purple-300"
												: "bg-slate-800/50 text-gray-300 hover:border-slate-500",
										)}
									>
										<Plus className="w-6 h-6 mr-1 rounded-full p-1 bg-slate-600/20 text-white" />
										{tag}
									</button>
								))}
							</div>
						</div>

						{/* Step 4: Select Number of Pictures */}
						<div>
							<h2 className="text-lg font-semibold mb-4 flex items-center">
								<span className="text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
									{selectedCharacter === 'existing' ? '5' : '5'}.
								</span>
								Select Number of Pictures
							</h2>

							<div className="flex gap-4">
								{pictureOptions.map((num) => (
									<div key={num} className="text-center">
										<button
											onClick={() => setSelectedPictures(num)}
											className={cn(
												"w-16 h-16 lg:w-24 lg:h-24 rounded-xl border-2 font-bold text-lg transition-all duration-200",
												selectedPictures === num
													? "border-purple-500 bg-purple-500/20 text-white"
													: "border-slate-600 bg-slate-800/50 text-gray-300 hover:border-slate-500",
											)}
										>
											{num}
										</button>
										<div className="text-xs text-gray-400 mt-1">
											{num * 7} stars
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Star Cost Display */}
						<div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<Star className="w-5 h-5 text-yellow-500" />
									<span className="text-white font-medium">Total Cost</span>
								</div>
								<div className="text-right">
									<div className="text-2xl font-bold text-yellow-500">
										{getStarCost()} stars
									</div>
									{user && (
										<div className="text-sm text-gray-400">
											You have {user.stars ?? 0} stars
										</div>
									)}
								</div>
							</div>
							
							{!canAfford() && user && (
								<div className="mt-3 p-2 bg-red-900/20 border border-red-700 rounded text-red-300 text-sm">
									Not enough stars. Purchase more stars to continue.
								</div>
							)}
						</div>

						{/* Generate Button */}
						<Button 
							onClick={handleGenerate}
							disabled={generating || !canAfford() || !user}
							className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{generating ? (
								<div className="flex items-center gap-2">
									<Loader2 className="w-5 h-5 animate-spin" />
									Generating...
								</div>
							) : (
								`Generate ${selectedPictures} Image${selectedPictures > 1 ? 's' : ''} - ${getStarCost()} Stars`
							)}
						</Button>
					</div>
				</div>
			</div>

			{/* Generated Images Section */}
			{generatedImages.length > 0 && (
				<div className="container mx-auto px-4 py-8">
					<div className="bg-slate-900 rounded-lg p-6 border border-slate-700">
						<h2 className="text-2xl font-bold text-white mb-6 text-center">
							Generated Images
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{generatedImages.map((imageUrl, index) => (
								<div key={index} className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
									<img
										src={imageUrl}
										alt={`Generated image ${index + 1}`}
										className="w-full h-64 object-cover"
										onError={(e) => {
											console.error('Failed to load image:', imageUrl);
											e.currentTarget.style.display = 'none';
										}}
									/>
									<div className="p-4">
										<div className="flex justify-between items-center">
											<span className="text-white text-sm">Image {index + 1}</span>
											<button
												onClick={() => {
													const link = document.createElement('a');
													link.href = imageUrl;
													link.download = `generated-image-${index + 1}.png`;
													link.click();
												}}
												className="text-purple-400 hover:text-purple-300 text-sm"
											>
												Download
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			)}

			{/* Modals */}
			{showAiCreator && (
				<AiCreator
					onClose={() => setShowAiCreator(false)}
					onSuccess={() => {
						// Refresh custom AIs list
						window.location.reload();
					}}
				/>
			)}

			{showStarPackages && (
				<StarPackages
					onClose={() => setShowStarPackages(false)}
					onPurchase={() => {
						// Refresh user data
						window.location.reload();
					}}
				/>
			)}
		</div>
	);
}
