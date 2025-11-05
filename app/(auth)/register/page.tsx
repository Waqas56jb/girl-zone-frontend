"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RegisterPage() {
	return (
		<div className="min-h-screen  text-white flex items-center justify-center px-4 md:py-8">
			<div className="flex w-full  flex-col md:flex-row  rounded-3xl overflow-hidden">
				{/* Image Section */}
				<div className="md:w-1/2 hidden md:flex w-full relative h-120 md:h-auto">
					<Image
						src="/custom/auth.png" // replace with your image path in /public
						alt="Hero Image"
						fill
						className="object-cover rounded-3xl"
					/>
				</div>

				{/* Form Section */}
				<div className="md:w-1/2 w-full p-3 sm:p-10 md:p-14">
					<h2 className="text-2xl md:text-3xl font-semibold mb-2">
						Create an account
					</h2>
					<p className="text-sm text-gray-400 mb-6">
						Already have an account?{" "}
						<a className="text-blue-400 hover:underline" href="/login">
							Log in
						</a>
					</p>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Input placeholder="First name" className="h-12" />
						<Input placeholder="Last name" className="h-12" />
					</div>
					<div className="mt-4 space-y-4">
						<Input type="email" placeholder="Email" className="h-12" />
						<Input
							type="password"
							placeholder="Enter your password"
							className="h-12"
						/>

						<div className="flex items-center space-x-2">
							<Checkbox id="terms" />
							<Label htmlFor="terms" className="text-sm text-gray-400">
								I agree to the{" "}
								<a href="#" className="text-blue-400 hover:underline">
									Terms & Conditions
								</a>
							</Label>
						</div>

						<Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full h-12 ">
							Create account
						</Button>

						<div className="flex items-center my-4">
							<div className="flex-grow h-px bg-gray-700"></div>
							<span className="mx-2 text-sm text-gray-400">
								or register with
							</span>
							<div className="flex-grow h-px bg-gray-700"></div>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Button
								variant="outline"
								className="w-full border boder-slate-700 h-12 text-white"
							>
								<Image
									src="/icon/google.png"
									alt="Google"
									width={24}
									height={24}
									className="mr-2"
								/>
								Google
							</Button>
							<Button
								variant="outline"
								className="w-full border boder-slate-700 h-12 text-white"
							>
								<FontAwesomeIcon icon={faApple} size="2x" className="mr-2" />{" "}
								Apple
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
