import SettingsSection from "@/components/custom/settings-section";
import Topbar from "@/components/custom/top-bar";
import React from "react";

const page = () => {
	return (
		<div>
			<div className="hidden md:flex">
				<Topbar title="settings" />
			</div>
			<SettingsSection />
		</div>
	);
};

export default page;
