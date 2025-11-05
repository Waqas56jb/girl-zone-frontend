import type { Metadata } from "next";
import { Nunito_Sans, Open_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "sonner";
import ErrorBoundary from "@/components/ErrorBoundary";

// Load fonts and assign them to CSS variables
const nunitoSans = Nunito_Sans({
	variable: "--font-nunito-sans",
	subsets: ["latin"],
	display: "swap",
});

const openSans = Open_Sans({
	variable: "--font-open-sans",
	subsets: ["latin"],
	display: "swap",
});

// Metadata for SEO & social previews
export const metadata: Metadata = {
	title: "GirlZone AI",
	description:
		"Create your own Girlfriend AI and chat in a personalized experience.",
	icons: {
		icon: "/icon/logo.svg",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={`${nunitoSans.variable} ${openSans.variable}`}>
			<body suppressHydrationWarning>
				<ErrorBoundary>
					<AuthProvider>
						<div>{children}</div>
						<Toaster theme="dark" position="top-right" />
					</AuthProvider>
				</ErrorBoundary>
			</body>
		</html>
	);
}
