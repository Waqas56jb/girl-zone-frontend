import AffiliateSection from "@/components/custom/affiliate-section";
import { FaqSection } from "@/components/custom/faq-section";
import AffiliateCard from "@/components/custom/hero-card";
import TopBar from "@/components/custom/top-bar";
import React from "react";

const page = () => {
	return (
		<div>
			<div className="hidden md:flex">
				<TopBar title="Affiliate programme" />
			</div>

			<AffiliateCard />
			<div className="grid grid-cols-1 ">
				<AffiliateSection />
			</div>

			<FaqSection />
		</div>
	);
};

export default page;
