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
