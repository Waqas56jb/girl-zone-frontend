"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";

export default function SettingsSection() {
	const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
	const [notificationsEnabled, setNotificationsEnabled] = useState(true);

	return (
		<div className="m-3 p-[2px] max-w-4xl rounded-2xl bg-gradient-to-r from-violate-500 to-purple-600">
			<div className="rounded-2xl min-h-screen bg-[#000212] text-white">
				<div className="flex">
					{/* Main Content */}
					<div className="flex-1 p-8">
						<div className="max-w-4xl mx-auto">
							<Tabs defaultValue="profile" className="w-full">
								<TabsList className="bg-transparent border-b border-[#131331] rounded-none h-auto p-0 mb-8">
									<TabsTrigger
										value="profile"
										className="bg-transparent border-b-2 border-x-0 border-t-0 border-transparent data-[state=active]:border-[#6c42f9] data-[state=active]:bg-transparent rounded-none px-6 py-3"
									>
										Profile
									</TabsTrigger>
									<TabsTrigger
										value="billing"
										className="bg-transparent border-b-2 border-transparent data-[state=active]:border-[#6c42f9] data-[state=active]:bg-transparent rounded-none px-6 py-3"
									>
										Billing
									</TabsTrigger>
								</TabsList>

								<TabsContent value="profile" className="space-y-8">
									{/* Profile Details */}
									<div>
										<h2 className="text-xl font-semibold mb-6">
											Profile details
										</h2>

										<div className="flex items-center gap-4 mb-6">
											<Avatar className="w-16 h-16">
												<AvatarImage src="/placeholder.svg?height=64&width=64" />
												<AvatarFallback>RB</AvatarFallback>
											</Avatar>
											<div className="flex gap-2">
												<Button
													variant="ghost"
													size="sm"
													className="text-[#cccccc] hover:text-white p-4 bg-slate-600/20"
												>
													Change photo
												</Button>
												<Button
													variant="ghost"
													size="sm"
													className="text-[#cccccc] hover:text-white"
												>
													Remove
												</Button>
											</div>
										</div>

										<div className="space-y-4 max-w-md">
											<div>
												<label className="block text-sm text-[#cccccc] mb-2">
													Name
												</label>
												<div className="flex items-center gap-2">
													<Input
														value="Ryan Boris"
														className=" border-[#131331] text-white flex-1 h-12"
														readOnly
													/>
													<Button
														variant="ghost"
														size="sm"
														className="text-[#cccccc]"
													>
														<Edit className="w-4 h-4" />
													</Button>
												</div>
											</div>

											<div>
												<label className="block text-sm text-[#cccccc] mb-2">
													Username
												</label>
												<div className="flex items-center gap-2">
													<Input
														value="@user64340067"
														className=" h-12 border-[#131331] text-white flex-1"
														readOnly
													/>
													<Button
														variant="ghost"
														size="sm"
														className="text-[#cccccc]"
													>
														<Edit className="w-4 h-4" />
													</Button>
												</div>
											</div>

											<div>
												<label className="block text-sm text-[#cccccc] mb-2">
													Email
												</label>
												<div className="flex items-center gap-2">
													<Input
														value="ryan.boris@gmail.com"
														className="h-12 border-[#131331] text-white flex-1"
														readOnly
													/>
													<Button
														variant="ghost"
														size="sm"
														className="text-[#cccccc]"
													>
														<Edit className="w-4 h-4" />
													</Button>
												</div>
											</div>
										</div>
									</div>

									{/* Connected Accounts */}
									<div className="border-t border-[#131331] pt-8">
										<h2 className="text-xl font-semibold mb-2">
											Connected accounts
										</h2>
										<p className="text-[#cccccc] text-sm mb-6">
											Duis aute irure dolor in reprehenderit in voluptate velit
											esse cillum.
										</p>

										<div className="flex items-center justify-between p-4   ">
											<div className="flex items-center gap-6">
												<div className="flex items-center gap-2 p-3 border border-slate-600/20 rounded-xl">
													<div className=" rounded flex items-center justify-center">
														<Image
															src="/icon/google.png"
															alt="Google"
															width={24}
															height={24}
														/>
													</div>
													<span>Google</span>
												</div>
												<span className="text-green-500 text-sm">
													Connected
												</span>
											</div>
											<Button
												variant="outline"
												size="sm"
												className="border-[#131331] text-[#cccccc]"
											>
												Disconnect
											</Button>
										</div>
									</div>

									{/* Password */}
									<div className="border-t border-[#131331] pt-8">
										<h2 className="text-xl font-semibold mb-2">Password</h2>
										<p className="text-[#cccccc] text-sm mb-6 max-w-2xl">
											Duis aute irure dolor in reprehenderit in voluptate velit
											esse cillum. Duis aute irure dolor in reprehenderit in
											voluptate velit esse cillum.
										</p>
										<Button className="bg-[#6c42f9] hover:bg-[#5a35d1]">
											Set new password
										</Button>
									</div>

									{/* Security */}
									<div className="border-t border-[#131331] pt-8">
										<div className="flex items-center justify-between mb-2">
											<h2 className="text-xl font-semibold">Security</h2>
											<Switch
												checked={twoFactorEnabled}
												onCheckedChange={setTwoFactorEnabled}
												className="data-[state=checked]:bg-[#6c42f9]"
											/>
										</div>
										<p className="text-[#cccccc] text-sm mb-2 ">
											Two-factor authentication
										</p>
										<p className="text-[#cccccc] text-sm max-w-2xl">
											Duis aute irure dolor in reprehenderit in voluptate velit
											esse cillum. Duis aute irure dolor in reprehenderit in
											voluptate velit esse cillum.
										</p>
									</div>

									{/* Notifications */}
									<div className="border-t border-[#131331] pt-8">
										<div className="flex items-center justify-between mb-2">
											<h2 className="text-xl font-semibold">Notifications</h2>
											<Switch
												checked={notificationsEnabled}
												onCheckedChange={setNotificationsEnabled}
												className="data-[state=checked]:bg-[#6c42f9]"
											/>
										</div>
										<p className="text-[#cccccc] text-sm mb-2">
											Duis aute irure dolor in reprehenderit in voluptate
										</p>
										<p className="text-[#cccccc] text-sm max-w-2xl">
											Duis aute irure dolor in reprehenderit in voluptate velit
											esse cillum. Duis aute irure dolor in reprehenderit in
											voluptate velit esse cillum. Duis aute irure dolor in
											reprehenderit in voluptate velit esse cillum. Duis aute
											irure dolor in reprehenderit in voluptate velit esse
											cillum.
										</p>
									</div>

									{/* Delete Account */}
									<div className="border-t border-[#131331] pt-8">
										<Button className="bg-[#6c42f9] hover:bg-[#5a35d1] mb-4">
											Delete Account
										</Button>
										<p className="text-[#cccccc] text-sm">
											Note: Duis aute irure dolor in reprehenderit in voluptate
											velit esse cillum. Duis aute irure dolor in reprehenderit
											in voluptate velit esse cillum.
										</p>
									</div>
								</TabsContent>

								<TabsContent value="billing">
									<div className="text-center py-12">
										<p className="text-[#cccccc]">
											Billing settings coming soon...
										</p>
									</div>
								</TabsContent>
							</Tabs>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
