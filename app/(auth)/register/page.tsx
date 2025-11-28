"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
	const router = useRouter();
	const { register } = useAuth();
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		termsAccepted: false,
	});
	const [loading, setLoading] = useState(false);

	const handleInputChange = (field: string, value: string | boolean) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.termsAccepted) {
			toast.error("Please accept the terms & conditions.");
			return;
		}

		setLoading(true);
		const success = await register({
			firstName: formData.firstName,
			lastName: formData.lastName,
			email: formData.email,
			password: formData.password,
		});

		if (success) {
			toast.success("Account created successfully!");
			router.push("/generate");
		}

		setLoading(false);
	};

	return (
		<div className="min-h-screen  text-white flex items-center justify-center px-4 md:py-8">
			<div className="flex w-full  flex-col md:flex-row  rounded-3xl overflow-hidden">
				{/* Image Section */}
				<div className="md:w-1/2 hidden md:flex w-full relative h-120 md:h-auto">
					<Image
						src="/custom/auth.png"
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

					<form onSubmit={handleSubmit}>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Input
								placeholder="First name"
								className="h-12"
								value={formData.firstName}
								onChange={(e) => handleInputChange("firstName", e.target.value)}
								required
							/>
							<Input
								placeholder="Last name"
								className="h-12"
								value={formData.lastName}
								onChange={(e) => handleInputChange("lastName", e.target.value)}
								required
							/>
						</div>
						<div className="mt-4 space-y-4">
							<Input
								type="email"
								placeholder="Email"
								className="h-12"
								value={formData.email}
								onChange={(e) => handleInputChange("email", e.target.value)}
								required
							/>
							<Input
								type="password"
								placeholder="Enter your password"
								className="h-12"
								value={formData.password}
								onChange={(e) => handleInputChange("password", e.target.value)}
								required
							/>

							<div className="flex items-center space-x-2">
								<Checkbox
									id="terms"
									checked={formData.termsAccepted}
									onCheckedChange={(checked) =>
										handleInputChange("termsAccepted", checked === true)
									}
								/>
								<Label htmlFor="terms" className="text-sm text-gray-400">
									I agree to the{" "}
									<a href="#" className="text-blue-400 hover:underline">
										Terms & Conditions
									</a>
								</Label>
							</div>

							<Button
								type="submit"
								disabled={loading}
								className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full h-12 disabled:opacity-50"
							>
								{loading ? (
									<span className="flex items-center gap-2">
										<Loader2 className="h-4 w-4 animate-spin" />
										Creating account...
									</span>
								) : (
									"Create account"
								)}
							</Button>
						</div>
					</form>

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
							<FontAwesomeIcon icon={faApple} size="2x" className="mr-2" /> Apple
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
