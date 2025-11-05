"use client";

import { useState } from "react";

export default function Checkout() {
	return (
		<div className="min-h-screen  text-white p-4 md:p-12 flex items-center justify-center">
			<div className="w-full max-w-5xl bg-[#131324] p-6 md:p-10 rounded-2xl shadow-xl grid md:grid-cols-2 gap-6">
				{/* Left - Form */}
				<div>
					<h1 className="text-2xl md:text-3xl font-bold mb-2">Checkout</h1>
					<p className="text-sm text-gray-400 mb-6 leading-relaxed">
						Duis aute irure dolor in reprehenderit in voluptate velit esse
						cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
						cupidatat non proident.
					</p>

					<form className="space-y-4">
						<input
							type="text"
							placeholder="Cardholder's Name"
							className="w-full bg-[#0B0B18] border border-gray-700 rounded-lg px-4 py-3 outline-none placeholder-gray-400"
						/>
						<input
							type="text"
							placeholder="Card Number"
							className="w-full bg-[#0B0B18] border border-gray-700 rounded-lg px-4 py-3 outline-none placeholder-gray-400"
						/>
						<div className="flex gap-4">
							<input
								type="text"
								placeholder="Expire date"
								className="w-full bg-[#0B0B18] border border-gray-700 rounded-lg px-4 py-3 outline-none placeholder-gray-400"
							/>
							<input
								type="text"
								placeholder="CVC"
								className="w-full bg-[#0B0B18] border border-gray-700 rounded-lg px-4 py-3 outline-none placeholder-gray-400"
							/>
						</div>
						<div className="flex gap-2">
							<input
								type="text"
								placeholder="Discount Code"
								className="flex-grow bg-[#0B0B18] border border-gray-700 rounded-lg px-4 py-3 outline-none placeholder-gray-400"
							/>
							<button
								type="button"
								className="text-sm bg-transparent text-purple-400 hover:text-purple-300 transition px-4 py-2 rounded-lg border border-purple-500"
							>
								Apply
							</button>
						</div>

						<button
							type="submit"
							className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-full transition"
						>
							Pay
						</button>
					</form>
				</div>

				{/* Right - Summary */}
				<div className="border border-purple-500/30 rounded-xl p-6 bg-[#0B0B18] space-y-4">
					<p className="text-sm text-purple-300">You're paying.</p>
					<h2 className="text-4xl font-bold">$450.00</h2>

					<div className="text-sm space-y-4 text-gray-300">
						<div className="flex justify-between">
							<div>
								<p className="font-medium text-white">Duis aute irure dolor</p>
								<p className="text-xs text-gray-500">Size: m · Color: Red</p>
							</div>
							<p>$400.00</p>
						</div>
						<div className="flex justify-between">
							<div>
								<p className="font-medium text-white">Duis aute irure dolor</p>
								<p className="text-xs text-gray-500">Size: m · Color: Red</p>
							</div>
							<p>$400.00</p>
						</div>
						<div className="flex justify-between">
							<p>Discounts & Offers</p>
							<p>$0.00</p>
						</div>
						<div className="flex justify-between">
							<p>Tax</p>
							<p>$0.00</p>
						</div>
						<div className="flex justify-between font-bold text-white border-t border-gray-700 pt-4">
							<p>Total</p>
							<p>$450.00</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
