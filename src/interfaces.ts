import { Ionicons } from "@expo/vector-icons";
import { OpaqueColorValue } from "react-native";

interface TabIcon {
	routeName: string;
	iconName: keyof typeof Ionicons.glyphMap;
	size?: number;
	color?: string | OpaqueColorValue;
}
export type TabIcons = TabIcon[];

export type activitiesSliceInterface = {
	steps: number;
};
export interface ProfileData {
	name: string;
	email: string;
	phone: string;
	weight: string;
}
