import { StyleSheet, Text, View } from "react-native";
import {
	detectActivity,
	distanceToCalories,
	getDistance,
	getMinutes,
} from "../helpers/stepsConversionsHelper";
import { Ionicons } from "@expo/vector-icons";

const ActivityItem = ({ steps, date }: { steps: number; date: string }) => {
	const distance = getDistance(steps);
	const minutes = getMinutes(steps);
	const isRunning = detectActivity(steps, +minutes) === "running";
	const calories = distanceToCalories(+distance, isRunning);
	return (
		<View style={styles.activityContainer}>
			<View style={styles.activityHeader}>
				<View style={styles.activityTypeContainer}>
					<Ionicons name={"analytics"} size={30} color={"#fff"} />
					<Text style={styles.activityHeaderItem}>
						{isRunning ? "Running" : "Walking"}
					</Text>
				</View>
				<Text style={styles.activityHeaderItem}>{date}</Text>
			</View>
			<Text style={styles.activityItem}>Steps: {steps}</Text>
			<Text style={styles.activityItem}>Calories: {calories}</Text>
			<Text style={styles.activityItem}>Time: {minutes} mins</Text>
		</View>
	);
};
const styles = StyleSheet.create({
	activityContainer: {
		backgroundColor: "#0059b3",
		margin: 5,
		padding: 10,
		flex: 1,
	},
	activityHeaderItem: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 26,
		marginStart: 10,
	},
	activityHeader: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		flex: 1,
		paddingBottom: 20,
	},
	activityTypeContainer: {
		display: "flex",
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	activityItem: {
		fontSize: 16,
		color: "#fff",
	},
});
export default ActivityItem;
