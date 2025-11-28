"use client";

import Chatbot from "@/components/custom/chatbot";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ChatPage = () => {
	const { isAuthenticated, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!loading && !isAuthenticated) {
			router.replace("/login");
		}
	}, [loading, isAuthenticated, router]);

	if (loading || !isAuthenticated) {
		return (
			<div className="w-full min-h-[60vh] flex items-center justify-center">
				<p className="text-gray-400">Redirecting to login...</p>
			</div>
		);
	}

	return (
		<div className="w-full">
			<Chatbot />
		</div>
	);
};

export default ChatPage;
