import { AppSidebar } from "@/components/app-sidebar";
import { MobileNavbar } from "@/components/mobile-navbar";
import { Sitefooter } from "@/components/site-footer";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				suppressHydrationWarning
				className="antialiased grid grid-cols-1 px-4 md:px-0"
			>
				<SidebarProvider>
					<AppSidebar />
					<div>
						<div className="sticky top-0 z-40">
							<MobileNavbar />
						</div>
						{children}
						<Sitefooter />
					</div>
				</SidebarProvider>
			</body>
		</html>
	);
}
