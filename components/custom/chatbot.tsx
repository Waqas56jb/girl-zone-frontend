"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Info, Mic, Search, X } from "lucide-react";
import {
	chatPersons,
	initialMessages,
	initialSuggestions,
	getRandomAiResponse,
	type ChatPerson,
	type Message,
} from "@/data/chat-data";

interface Suggestion {
	id: string;
	text: string;
}

const TypingAnimation = () => (
	<div className="flex items-center gap-1 p-3">
		<div className="flex gap-1">
			<div className="w-2 h-2 bg-[#cccccc] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
			<div className="w-2 h-2 bg-[#cccccc] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
			<div className="w-2 h-2 bg-[#cccccc] rounded-full animate-bounce"></div>
		</div>
	</div>
);

const TypewriterText = ({
	text,
	onComplete,
}: {
	text: string;
	onComplete?: () => void;
}) => {
	const [displayedText, setDisplayedText] = useState("");
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		if (currentIndex < text.length) {
			const timeout = setTimeout(() => {
				setDisplayedText((prev) => prev + text[currentIndex]);
				setCurrentIndex((prev) => prev + 1);
			}, 30);
			return () => clearTimeout(timeout);
		} else if (onComplete) {
			onComplete();
		}
	}, [currentIndex, text, onComplete]);

	return <span>{displayedText}</span>;
};

export default function Chatbot() {
	const [selectedPerson, setSelectedPerson] = useState<ChatPerson>(
		chatPersons[0],
	);
	const [showPersonsList, setShowPersonsList] = useState(false);
	const [creditTokens, setCreditTokens] = useState(1250);
	const [messages, setMessages] = useState<Message[]>(initialMessages);
	const [suggestions, setSuggestions] =
		useState<Suggestion[]>(initialSuggestions);
	const [showSuggestions, setShowSuggestions] = useState(true);

	const [inputValue, setInputValue] = useState("");
	const [isAiTyping, setIsAiTyping] = useState(false);
	const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages, isAiTyping]);

	const handleSendMessage = async (messageText?: string) => {
		const textToSend = messageText || inputValue;
		if (!textToSend.trim()) return;

		const userMessage: Message = {
			id: Date.now().toString(),
			content: textToSend,
			sender: "user",
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInputValue("");
		setIsWaitingForResponse(true);
		setCreditTokens((prev) => Math.max(0, prev - 5)); // Deduct 5 tokens per message

		// If this was a suggestion, remove it from the list
		if (messageText) {
			setSuggestions((prev) =>
				prev.filter((suggestion) => suggestion.text !== messageText),
			);
		}

		setTimeout(() => {
			setIsWaitingForResponse(false);
			setIsAiTyping(true);

			const aiResponse: Message = {
				id: (Date.now() + 1).toString(),
				content: getRandomAiResponse(),
				sender: "ai",
				timestamp: new Date(),
				isTyping: true,
			};

			setMessages((prev) => [...prev, aiResponse]);
		}, 1000 + Math.random() * 1000);
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	const handleTypingComplete = (messageId: string) => {
		setMessages((prev) =>
			prev.map((msg) =>
				msg.id === messageId ? { ...msg, isTyping: false } : msg,
			),
		);
		setIsAiTyping(false);
	};

	const handleSuggestionClick = (suggestion: Suggestion) => {
		handleSendMessage(suggestion.text);
	};

	const closeSuggestions = () => {
		setShowSuggestions(false);
	};

	return (
		<div className="min-h-screen bg-[#070917] text-white ">
			{/* Desktop Layout */}
			<div className="hidden md:flex w-full h-screen">
				{/* Chat Persons List */}
				<div className="w-80 bg-[#0a0d1e] border-r border-[#131331] flex flex-col">
					<div className="p-4 border-b border-[#131331]">
						<div className="flex items-center justify-between mb-4">
							<div className="flex items-center gap-2">
								<span className="text-xl font-bold">Chat</span>
							</div>

							{/* Token Badge */}
							<div className="flex items-center bg-[#131331] rounded-full px-2 py-1 space-x-2 shadow-inner">
								{/* Token Icon */}
								<div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-full flex items-center justify-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4 text-white"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M12 3v1m0 16v1m8.485-8.485l-.707-.707m-13.556 0l-.707.707m16.97 0a9 9 0 11-12.728 0 9 9 0 0112.728 0z"
										/>
									</svg>
								</div>

								{/* Token Count */}
								<span className="text-white font-semibold text-sm tracking-wide">
									{creditTokens}
								</span>

								{/* Add Button */}
								<button className="w-6 h-6 rounded-full bg-[#1a1a3b] text-white hover:bg-purple-600 flex items-center justify-center text-sm font-bold">
									+
								</button>
							</div>
						</div>

						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#626060]" />
							<Input
								placeholder="Search conversations..."
								className="bg-[#0c0d1f] border-[#131331] text-white pl-10"
							/>
						</div>
					</div>

					<div className="flex-1 overflow-y-auto">
						{chatPersons.map((person) => (
							<div
								key={person.id}
								onClick={() => setSelectedPerson(person)}
								className={`p-4 m-3 rounded-2xl border border-purple-500 cursor-pointer hover:bg-[#131331] transition-colors ${
									selectedPerson.id === person.id ? "bg-[#131331]" : ""
								}`}
							>
								<div className="flex items-center gap-3">
									<div className="relative">
										<Avatar className="w-12 h-12">
											<AvatarImage src={person.avatar || "/placeholder.svg"} />
											<AvatarFallback>{person.name[0]}</AvatarFallback>
										</Avatar>
										<div
											className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#0a0d1e] ${
												person.isOnline ? "bg-green-500" : "bg-gray-500"
											}`}
										/>
									</div>
									<div className="flex-1 min-w-0">
										<div className="flex items-center justify-between">
											<h3 className="font-medium truncate">
												{person.name}, {person.age}
											</h3>
											<span className="text-xs text-[#626060]">
												{person.timestamp}
											</span>
										</div>
										<p className="text-sm text-[#626060] truncate">
											{person.lastMessage}
										</p>
									</div>
									{person.unreadCount && (
										<Badge className="bg-[#6c42f9] text-white text-xs">
											{person.unreadCount}
										</Badge>
									)}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Chat Area */}
				<div className="flex-1 flex flex-col w-full">
					{/* Header */}
					<div className="bg-[#0a0d1e] border-b border-[#131331] p-4 flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="relative">
								<Avatar className="w-10 h-10">
									<AvatarImage
										src={selectedPerson.avatar || "/placeholder.svg"}
									/>
									<AvatarFallback>{selectedPerson.name[0]}</AvatarFallback>
								</Avatar>
								<div
									className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#0a0d1e] ${
										selectedPerson.isOnline ? "bg-green-500" : "bg-gray-500"
									}`}
								/>
							</div>
							<div>
								<h2 className="font-medium">
									{selectedPerson.name}, {selectedPerson.age}
								</h2>
								<p className="text-sm text-[#626060]">
									{selectedPerson.isOnline ? "Online" : "Offline"}
								</p>
							</div>
						</div>
						<div className="flex items-center justify-between mb-4">
							{/* Token Badge */}
							<div className="flex items-center bg-[#131331] rounded-full px-2 py-1 space-x-2 shadow-inner">
								{/* Token Icon */}
								<div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-full flex items-center justify-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4 text-white"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M12 3v1m0 16v1m8.485-8.485l-.707-.707m-13.556 0l-.707.707m16.97 0a9 9 0 11-12.728 0 9 9 0 0112.728 0z"
										/>
									</svg>
								</div>

								{/* Token Count */}
								<span className="text-white font-semibold text-sm tracking-wide">
									{creditTokens}
								</span>

								{/* Add Button */}
								<button className="w-6 h-6 rounded-full bg-[#1a1a3b] text-white hover:bg-purple-600 flex items-center justify-center text-sm font-bold">
									+
								</button>
							</div>
						</div>
					</div>

					{/* Messages */}
					<div className="flex-1 overflow-y-auto p-6 space-y-4 w-full">
						{messages.map((message) => (
							<div
								key={message.id}
								className={`flex gap-3 ${
									message.sender === "user" ? "justify-end" : "justify-start"
								}`}
							>
								{message.sender === "ai" && (
									<Avatar className="w-8 h-8 flex-shrink-0">
										<AvatarImage
											src={selectedPerson.avatar || "/placeholder.svg"}
										/>
										<AvatarFallback>{selectedPerson.name[0]}</AvatarFallback>
									</Avatar>
								)}

								<div
									className={`max-w-[70%] p-4 ${
										message.sender === "user"
											? "bg-[#6c42f9] text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-none"
											: "bg-[#0c0d1f] border border-[#131331] text-white rounded-tr-2xl rounded-tl-2xl rounded-br-2xl rounded-bl-none"
									}`}
								>
									{message.isTyping ? (
										<TypewriterText
											text={message.content}
											onComplete={() => handleTypingComplete(message.id)}
										/>
									) : (
										message.content
									)}
								</div>
							</div>
						))}

						{isWaitingForResponse && (
							<div className="flex gap-3 justify-start">
								<Avatar className="w-8 h-8 flex-shrink-0">
									<AvatarImage
										src={selectedPerson.avatar || "/placeholder.svg"}
									/>
									<AvatarFallback>{selectedPerson.name[0]}</AvatarFallback>
								</Avatar>
								<div className="bg-[#0c0d1f] border border-[#131331] rounded-2xl">
									<TypingAnimation />
								</div>
							</div>
						)}

						<div ref={messagesEndRef} />
					</div>

					{/* Suggestions */}
					{showSuggestions && suggestions.length > 0 && (
						<div className="px-6 pb-4">
							<div className="flex items-center justify-between mb-3">
								<h3 className="text-sm font-medium text-[#cccccc]">
									Suggestions
								</h3>
								<Button
									variant="ghost"
									size="sm"
									onClick={closeSuggestions}
									className="p-1 h-auto"
								>
									<X className="w-4 h-4 text-[#626060] hover:text-white" />
								</Button>
							</div>
							<div className="space-y-2">
								{suggestions.map((suggestion) => (
									<button
										key={suggestion.id}
										onClick={() => handleSuggestionClick(suggestion)}
										className="block w-full text-left p-3 bg-[#0c0d1f] border border-[#131331] rounded-lg hover:bg-[#131331] transition-colors text-sm"
									>
										{suggestion.text}
									</button>
								))}
							</div>
						</div>
					)}

					{/* Input Area */}
					<div className=" border-t border-[#131331] p-4">
						<div className="flex items-center gap-3 bg-[#0c0d1f] border border-[#131331] rounded-2xl p-3">
							<Input
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								onKeyPress={handleKeyPress}
								placeholder="Type your message..."
								className="flex-1 bg-transparent border-none text-white placeholder:text-[#626060] focus-visible:ring-0"
								disabled={isWaitingForResponse || isAiTyping}
							/>
							<Button
								variant="ghost"
								size="sm"
								className="text-[#cccccc] hover:text-white p-2"
							>
								<Mic className="w-5 h-5" />
							</Button>
							<Button
								onClick={() => handleSendMessage()}
								disabled={
									!inputValue.trim() || isWaitingForResponse || isAiTyping
								}
								className="bg-[#6c42f9] hover:bg-[#5a35d1] px-4 py-2 rounded-xl"
							>
								Ask
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* Mobile Layout */}
			<div className="md:hidden flex flex-col h-screen">
				{!showPersonsList ? (
					<>
						{/* Mobile Chat Header */}
						<div className="bg-[#0a0d1e] border-b border-[#131331] p-4 flex items-center justify-between">
							<div className="flex items-center gap-3">
								<Button
									variant="ghost"
									size="sm"
									onClick={() => setShowPersonsList(true)}
									className="p-2"
								>
									<ArrowLeft className="w-5 h-5" />
								</Button>
								<div className="relative">
									<Avatar className="w-10 h-10">
										<AvatarImage
											src={selectedPerson.avatar || "/placeholder.svg"}
										/>
										<AvatarFallback>{selectedPerson.name[0]}</AvatarFallback>
									</Avatar>
									<div
										className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#0a0d1e] ${
											selectedPerson.isOnline ? "bg-green-500" : "bg-gray-500"
										}`}
									/>
								</div>
								<div>
									<h2 className="font-medium">{selectedPerson.name}</h2>
									<p className="text-sm text-[#626060]">
										{selectedPerson.age} years
									</p>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<Badge
									variant="secondary"
									className="bg-[#6c42f9] text-white text-xs"
								>
									{creditTokens}
								</Badge>
								<Button variant="ghost" size="sm" className="p-2">
									<Info className="w-5 h-5" />
								</Button>
							</div>
						</div>

						{/* Mobile Messages */}
						<div className="flex-1 overflow-y-auto p-4 space-y-4">
							{messages.map((message) => (
								<div
									key={message.id}
									className={`flex gap-3 ${
										message.sender === "user" ? "justify-end" : "justify-start"
									}`}
								>
									{message.sender === "ai" && (
										<Avatar className="w-8 h-8 flex-shrink-0">
											<AvatarImage
												src={selectedPerson.avatar || "/placeholder.svg"}
											/>
											<AvatarFallback>{selectedPerson.name[0]}</AvatarFallback>
										</Avatar>
									)}
									<div
										className={`max-w-[80%] rounded-2xl p-3 ${
											message.sender === "user"
												? "bg-[#6c42f9] text-white"
												: "bg-[#0c0d1f] border border-[#131331]"
										}`}
									>
										{message.isTyping ? (
											<TypewriterText
												text={message.content}
												onComplete={() => handleTypingComplete(message.id)}
											/>
										) : (
											message.content
										)}
									</div>
								</div>
							))}

							{isWaitingForResponse && (
								<div className="flex gap-3 justify-start">
									<Avatar className="w-8 h-8 flex-shrink-0">
										<AvatarImage
											src={selectedPerson.avatar || "/placeholder.svg"}
										/>
										<AvatarFallback>{selectedPerson.name[0]}</AvatarFallback>
									</Avatar>
									<div className="bg-[#0c0d1f] border border-[#131331] rounded-2xl">
										<TypingAnimation />
									</div>
								</div>
							)}

							<div ref={messagesEndRef} />
						</div>

						{/* Mobile Suggestions */}
						{showSuggestions && suggestions.length > 0 && (
							<div className="px-4 pb-4">
								<div className="flex items-center justify-between mb-3">
									<h3 className="text-sm font-medium text-[#cccccc]">
										Suggestions
									</h3>
									<Button
										variant="ghost"
										size="sm"
										onClick={closeSuggestions}
										className="p-1 h-auto"
									>
										<X className="w-4 h-4 text-[#626060] hover:text-white" />
									</Button>
								</div>
								<div className="space-y-2">
									{suggestions.map((suggestion) => (
										<button
											key={suggestion.id}
											onClick={() => handleSuggestionClick(suggestion)}
											className="block w-full text-left p-3 bg-[#0c0d1f] border border-[#131331] rounded-lg hover:bg-[#131331] transition-colors text-sm"
										>
											{suggestion.text}
										</button>
									))}
								</div>
							</div>
						)}

						{/* Mobile Input */}
						<div className="bg-[#0a0d1e] border-t border-[#131331] p-4">
							<div className="flex items-center gap-3 bg-[#0c0d1f] border border-[#131331] rounded-2xl p-3">
								<Input
									value={inputValue}
									onChange={(e) => setInputValue(e.target.value)}
									onKeyPress={handleKeyPress}
									placeholder="Type your message..."
									className="flex-1 bg-transparent border-none text-white placeholder:text-[#626060] focus-visible:ring-0"
									disabled={isWaitingForResponse || isAiTyping}
								/>
								<Button
									variant="ghost"
									size="sm"
									className="text-[#cccccc] hover:text-white p-2"
								>
									<Mic className="w-5 h-5" />
								</Button>
								<Button
									onClick={() => handleSendMessage()}
									disabled={
										!inputValue.trim() || isWaitingForResponse || isAiTyping
									}
									className="bg-[#6c42f9] hover:bg-[#5a35d1] px-4 py-2 rounded-xl"
								>
									Ask
								</Button>
							</div>
						</div>
					</>
				) : (
					/* Mobile Persons List */
					<div className="flex flex-col h-screen">
						<div className="bg-[#0a0d1e] border-b border-[#131331] p-4">
							<div className="flex items-center justify-between mb-4">
								<div className="flex items-center gap-2">
									<div className="w-8 h-8 bg-gradient-to-r from-[#6c42f9] to-[#146ef5] rounded-full flex items-center justify-center">
										<div className="w-4 h-4 bg-white rounded-full"></div>
									</div>
									<span className="text-xl font-bold">GIRLZONE</span>
								</div>
								<Badge variant="secondary" className="bg-[#6c42f9] text-white">
									{creditTokens} tokens
								</Badge>
							</div>
							<div className="relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#626060]" />
								<Input
									placeholder="Search conversations..."
									className="bg-[#0c0d1f] border-[#131331] text-white pl-10"
								/>
							</div>
						</div>

						<div className="flex-1 overflow-y-auto">
							{chatPersons.map((person) => (
								<div
									key={person.id}
									onClick={() => {
										setSelectedPerson(person);
										setShowPersonsList(false);
									}}
									className="p-4 border-b border-[#131331] cursor-pointer hover:bg-[#131331] transition-colors"
								>
									<div className="flex items-center gap-3">
										<div className="relative">
											<Avatar className="w-12 h-12">
												<AvatarImage
													src={person.avatar || "/placeholder.svg"}
												/>
												<AvatarFallback>{person.name[0]}</AvatarFallback>
											</Avatar>
											<div
												className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#0a0d1e] ${
													person.isOnline ? "bg-green-500" : "bg-gray-500"
												}`}
											/>
										</div>
										<div className="flex-1 min-w-0">
											<div className="flex items-center justify-between">
												<h3 className="font-medium truncate">
													{person.name}, {person.age}
												</h3>
												<span className="text-xs text-[#626060]">
													{person.timestamp}
												</span>
											</div>
											<p className="text-sm text-[#626060] truncate">
												{person.lastMessage}
											</p>
										</div>
										{person.unreadCount && (
											<Badge className="bg-[#6c42f9] text-white text-xs">
												{person.unreadCount}
											</Badge>
										)}
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
