import { View, Text, StyleSheet } from "react-native";
import DaysCalendar from "../components/calendar";
import { useState } from "react";
import { getData } from "../asyncStorage";
import ActivityItem from "../components/activityItem";
import { STEPS_STORAGE_KEY } from "../constants";

const History = () => {
	const [stepsPerDate, updateStepsPerDate] = useState(null);
	interface StepsData {
		date: string;
		steps: number;
	}

	const getSelected = (selectedDate: string): void => {
		getData(STEPS_STORAGE_KEY).then((data: Record<string, number> | null) => {
			if (data) {
				let stepsList: StepsData[] = Object.entries(data).map(
					([date, steps]) => ({
						date,
						steps,
					})
				);
				const stepsPerDate = stepsList.find(
					(date) => date.date === selectedDate
				);
				updateStepsPerDate(stepsPerDate);
			}
		});
	};
	return (
		<View>
			<View style={{ marginBottom: 10 }}>
				<DaysCalendar getSelected={getSelected} />
			</View>
			{stepsPerDate?.date ? (
				<ActivityItem steps={stepsPerDate.steps} date={stepsPerDate.date} />
			) : (
				<View style={styles.noDataFoundContainer}>
					<Text style={styles.noDataFoundText}>No Data Found</Text>
				</View>
			)}
		</View>
	);
};
const styles = StyleSheet.create({
	noDataFoundContainer: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: 20,
	},
	noDataFoundText: {
		fontSize: 20,
		color: "#000",
	},
});
export default History;
