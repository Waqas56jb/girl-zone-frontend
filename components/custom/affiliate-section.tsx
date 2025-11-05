import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Radio, FileText } from "lucide-react";
import Image from "next/image";

export default function AffiliateLanding() {
	return (
		<div className="text-white">
			{/* How does it work section */}
			<div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-12 lg:mb-16">
						<h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-8 text-gray-200">
							How does it work?
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
							{/* Step 1 Card */}
							<Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 h-full">
								<CardContent className="p-6 lg:p-8 text-center h-full flex flex-col">
									<div className="flex justify-center mb-6">
										<div className="w-16 h-16 rounded-full bg-slate-700/50 flex items-center justify-center">
											<Users className="w-8 h-8 text-gray-300" />
										</div>
									</div>
									<h3 className="text-xl lg:text-2xl font-medium text-white mb-4">
										1. Sign Up
									</h3>
									<p className="text-gray-400 leading-relaxed flex-grow">
										Create an account on our platform and receive your unique
										affiliate link within 24 hours.
									</p>
								</CardContent>
							</Card>

							{/* Step 2 Card */}
							<Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 h-full">
								<CardContent className="p-6 lg:p-8 text-center h-full flex flex-col">
									<div className="flex justify-center mb-6">
										<div className="w-16 h-16 rounded-full bg-slate-700/50 flex items-center justify-center">
											<Radio className="w-8 h-8 text-gray-300" />
										</div>
									</div>
									<h3 className="text-xl lg:text-2xl font-medium text-white mb-4">
										2. Drive Traffic
									</h3>
									<p className="text-gray-400 leading-relaxed flex-grow">
										Start sending leads our way and track your clicks and
										conversions in real time on our dashboard.
									</p>
								</CardContent>
							</Card>

							{/* Step 3 Card */}
							<Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 h-full md:col-span-2 lg:col-span-1">
								<CardContent className="p-6 lg:p-8 text-center h-full flex flex-col">
									<div className="flex justify-center mb-6">
										<div className="w-16 h-16 rounded-full bg-slate-700/50 flex items-center justify-center">
											<FileText className="w-8 h-8 text-gray-300" />
										</div>
									</div>
									<h3 className="text-xl lg:text-2xl font-medium text-white mb-4">
										3. Get Paid
									</h3>
									<p className="text-gray-400 leading-relaxed flex-grow">
										$$$ starts appearing on your bank account or crypto wallet.
										The more you send the more you earn.
									</p>
								</CardContent>
							</Card>
						</div>

						<div className="mt-10 lg:mt-12">
							<Button className="mt-4 p-6 bg-purple-500 hover:bg-purple-700  shadow-lg shadow-purple-500/25">
								Get Started
							</Button>
						</div>
					</div>
				</div>

				{/* How do I get paid section */}
				<div className="max-w-7xl mx-auto mt-20 lg:mt-32">
					<div className="text-center">
						<h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-6 text-gray-200">
							How do I get paid?
						</h2>

						<p className="text-gray-400 mb-10 lg:mb-12 text-lg lg:text-xl">
							Payments are sent on a weekly basis
						</p>

						{/* Payment method cards */}
						<div className="mb-10 lg:mb-12">
							{/* Desktop Grid */}
							<div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-8">
								{/* Crypto Card */}
								<Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 h-full">
									<CardContent className="p-6 text-center flex flex-col justify-center h-32">
										<div className="flex justify-center gap-1">
											<div className="w-20 h-20 flex items-center justify-center">
												<Image
													src="/icon/bit.svg"
													alt="Cryptocurrency"
													width={80}
													height={80}
													className="object-contain"
												/>
											</div>
											<div className="w-20 h-20 flex items-center justify-center">
												<Image
													src="/icon/bitcoin.svg"
													alt="Bitcoin"
													width={80}
													height={80}
													className="object-contain"
												/>
											</div>
											<div className="w-20 h-20 flex items-center justify-center">
												<Image
													src="/icon/tron.svg"
													alt="Tron"
													width={80}
													height={80}
													className="object-contain"
												/>
											</div>
											<div className="w-20 h-20 flex items-center justify-center">
												<Image
													src="/icon/ethirium.svg"
													alt="Ethereum"
													width={80}
													height={80}
													className="object-contain"
												/>
											</div>
										</div>
									</CardContent>
								</Card>

								{/* PayPal Card */}
								<Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 h-full">
									<CardContent className="p-6 text-center flex justify-center items-center h-32">
										<Image
											src="/icon/paypal.svg"
											alt="PayPal"
											width={200}
											height={100}
											className="object-contain"
										/>
									</CardContent>
								</Card>

								{/* SEPA Card */}
								<Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 h-full">
									<CardContent className="p-6 text-center flex justify-center items-center h-32">
										<Image
											src="/icon/sepa.svg"
											alt="SEPA Transfer"
											width={200}
											height={100}
											className="object-contain"
										/>
									</CardContent>
								</Card>

								{/* Wire Transfer Card */}
								<Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 h-full">
									<CardContent className="p-6 text-center flex justify-center items-center h-32">
										<Image
											src="/icon/wire.svg"
											alt="Wire Transfer"
											width={200}
											height={100}
											className="object-contain"
										/>
									</CardContent>
								</Card>
							</div>

							{/* Mobile and Tablet Carousel */}
							<div className="lg:hidden">
								<div className="overflow-x-auto scrollbar-hide">
									<div
										className="flex gap-4 pb-4 px-4"
										style={{ width: "max-content" }}
									>
										{/* Crypto Card */}
										<Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 flex-shrink-0 w-72">
											<CardContent className="p-6 text-center flex flex-col justify-center h-32">
												<div className="flex justify-center gap-3">
													<div className="w-10 h-10 flex items-center justify-center">
														<Image
															src="/icon/bit.svg"
															alt="Cryptocurrency"
															width={50}
															height={50}
															className="object-contain"
														/>
													</div>
													<div className="w-10 h-10 flex items-center justify-center">
														<Image
															src="/icon/bitcoin.svg"
															alt="Bitcoin"
															width={50}
															height={50}
															className="object-contain"
														/>
													</div>
													<div className="w-10 h-10 flex items-center justify-center">
														<Image
															src="/icon/tron.svg"
															alt="Tron"
															width={50}
															height={50}
															className="object-contain"
														/>
													</div>
													<div className="w-10 h-10 flex items-center justify-center">
														<Image
															src="/icon/ethirium.svg"
															alt="Ethereum"
															width={50}
															height={50}
															className="object-contain"
														/>
													</div>
												</div>
											</CardContent>
										</Card>

										{/* PayPal Card */}
										<Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 flex-shrink-0 w-72">
											<CardContent className="p-6 text-center flex justify-center items-center h-32">
												<Image
													src="/icon/paypal.svg"
													alt="PayPal"
													width={200}
													height={100}
													className="object-contain"
												/>
											</CardContent>
										</Card>

										{/* SEPA Card */}
										<Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 flex-shrink-0 w-72">
											<CardContent className="p-6 text-center flex justify-center items-center h-32">
												<Image
													src="/icon/sepa.svg"
													alt="SEPA Transfer"
													width={200}
													height={100}
													className="object-contain"
												/>
											</CardContent>
										</Card>

										{/* Wire Transfer Card */}
										<Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 flex-shrink-0 w-72">
											<CardContent className="p-6 text-center flex justify-center items-center h-32">
												<Image
													src="/icon/wire.svg"
													alt="Wire Transfer"
													width={200}
													height={100}
													className="object-contain"
												/>
											</CardContent>
										</Card>
									</div>
								</div>

								{/* Carousel indicators */}
								<div className="flex justify-center gap-2 mt-6">
									<div className="w-2 h-2 rounded-full bg-purple-600"></div>
									<div className="w-2 h-2 rounded-full bg-slate-600"></div>
									<div className="w-2 h-2 rounded-full bg-slate-600"></div>
									<div className="w-2 h-2 rounded-full bg-slate-600"></div>
								</div>
							</div>
						</div>

						<div className="mt-10 lg:mt-12">
							<Button className="mt-4 p-6 bg-purple-500 hover:bg-purple-700  shadow-lg shadow-purple-500/25">
								Get Started
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
