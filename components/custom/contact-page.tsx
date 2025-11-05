import React from "react";
import { FaTelegramPlane, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function ContactPage() {
	return (
		<div className="min-h-screen flex items-center justify-center px-4">
			<div className="w-full max-w-md p-6 border-4 rounded-xl neon-border text-white text-center">
				<h2 className="text-3xl font-bold mb-6">Contact Me</h2>

				<div className="flex items-center gap-4 mb-4">
					<MdEmail className="text-pink-500 text-2xl" />
					<span className="text-lg">badmuselle@gmail.com</span>
				</div>

				<div className="flex items-center gap-4 mb-4">
					<FaTelegramPlane className="text-pink-500 text-2xl" />
					<span className="text-lg">@proffmanny</span>
				</div>

				<div className="flex items-center gap-4 mb-4">
					<FaPhoneAlt className="text-pink-500 text-2xl" />
					<span className="text-lg">+234 806 495 4521</span>
				</div>
			</div>

			{/* Neon Border Style */}
			<style jsx>{`
				.neon-border {
					border-color: #d946ef;
					box-shadow: 0 0 10px #c084fc, 0 0 20px #f472b6, 0 0 30px #e879f9;
				}
			`}</style>
		</div>
	);
}
