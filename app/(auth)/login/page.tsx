"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
	const { login } = useAuth();
	const router = useRouter();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		remember: false,
	});
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		
		if (!formData.email || !formData.password) {
			toast.error('Please fill in all fields');
			return;
		}

		setLoading(true);
		try {
			const success = await login(
				formData.email,
				formData.password,
				formData.remember,
			);
			if (success) {
				toast.success('Login successful!');
				router.push('/generate');
			} else {
				toast.error('Invalid email or password');
			}
		} catch (error) {
			toast.error('Login failed. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	const handleInputChange = (field: string, value: any) => {
		setFormData(prev => ({
			...prev,
			[field]: value
		}));
	};

	return (
		<div className="min-h-screen text-white flex items-center justify-center px-4 py-8 w-full">
			<div className="flex w-full flex-col md:flex-row rounded-3xl overflow-hidden">
				{/* Image Section */}
				<div className="md:w-1/2 w-full  hidden md:flex rounded-3xl relative h-120 md:h-auto">
					<Image
						src="/custom/auth.png"
						alt="Login Hero Image"
						fill
						className="object-cover rounded-3xl"
					/>
				</div>

				{/* Form Section */}
				<div className="md:w-1/2 w-full p-8 sm:p-10 md:p-14">
					<h2 className="text-2xl md:text-3xl font-semibold mb-2">
						Log in to your account
					</h2>
					<p className="text-sm text-gray-400 mb-6">
						Don't have an account?{" "}
						<a className="text-blue-400 hover:underline" href="/register">
							Sign up
						</a>
					</p>

					<form onSubmit={handleSubmit} className="space-y-4">
						<Input 
							type="email" 
							placeholder="Email" 
							className="h-12 bg-slate-800/50 border-slate-600 text-white"
							value={formData.email}
							onChange={(e) => handleInputChange('email', e.target.value)}
							required
						/>
						<Input
							type="password"
							placeholder="Enter your password"
							className="h-12 bg-slate-800/50 border-slate-600 text-white"
							value={formData.password}
							onChange={(e) => handleInputChange('password', e.target.value)}
							required
						/>

						<div className="flex items-center justify-between text-sm text-gray-400">
							<div className="flex items-center space-x-2">
								<Checkbox 
									id="remember" 
									checked={formData.remember}
									onCheckedChange={(checked) =>
										handleInputChange("remember", checked === true)
									}
								/>
								<Label htmlFor="remember">Remember me</Label>
							</div>
							<a href="#" className="text-blue-400 hover:underline">
								Forgot password?
							</a>
						</div>

						<Button 
							type="submit"
							disabled={loading}
							className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full h-12 disabled:opacity-50"
						>
							{loading ? (
								<div className="flex items-center gap-2">
									<Loader2 className="w-4 h-4 animate-spin" />
									Logging in...
								</div>
							) : (
								'Log in'
							)}
						</Button>
					</form>

					<div className="flex items-center my-4">
						<div className="flex-grow h-px bg-gray-700"></div>
						<span className="mx-2 text-sm text-gray-400">or log in with</span>
						<div className="flex-grow h-px bg-gray-700"></div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Button
							variant="outline"
							className="w-full border border-slate-700 h-12 text-white"
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
							className="w-full border border-slate-700 h-12 text-white"
						>
							<FontAwesomeIcon icon={faApple} size="2x" className="mr-2" />
							Apple
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}