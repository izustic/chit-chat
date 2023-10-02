import {
	faBellSlash,
	faThumbtack,
	faUser,
	faUserSlash,
} from "@fortawesome/free-solid-svg-icons";

export const chatMenuItems = [
	{
		label: "About User",
		icon: faUser,
		action: () => {
			console.log("About User action");
		},
	},
	{
		label: "Pin User",
		icon: faThumbtack,
		action: () => {
			console.log("Pin User action");
		},
	},
	{
		label: "Mute User",
		icon: faBellSlash,
		action: () => {
			console.log("Mute User action");
		},
	},
	{
		label: "Block User",
		icon: faUserSlash,
		action: () => {
			console.log("Block User action");
		},
	},
];
