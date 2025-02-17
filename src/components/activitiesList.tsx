import { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, Pressable } from "react-native";
import { getData } from "../asyncStorage";
import { Ionicons } from "@expo/vector-icons";
import ActivityItem from "./activityItem";

const ActivitiesList = ({
	activityMaxLength,
}: {
	activityMaxLength: number;
}) => {
	const [stepsList, setStepsList] = useState([]);
	const getStepsDate = () => {
		getData(`stepsData`).then((data) => {
			if (data) {
				let stepsList = Object.entries(data).map(([date, steps]) => ({
					date,
					steps,
				}));
				if (activityMaxLength) {
					stepsList = stepsList.reverse().slice(0, activityMaxLength);
				}
				setStepsList(stepsList);
			}
		});
	};
	useEffect(() => {
		getStepsDate();
	}, []);

	return (
		<View style={{ flex: 1, height: "100%" }}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Recent Activities</Text>
				<Pressable onPress={getStepsDate}>
					<Ionicons name={"refresh"} size={40} color={"black"} />
				</Pressable>
			</View>
			<View style={{ flex: 1 }}>
				<FlatList
					data={[...stepsList]}
					keyExtractor={(item, index) => index.toString()}
					renderItem={(stepsList) => {
						const steps = stepsList.item.steps;
						const date = stepsList.item.date;
						return <ActivityItem steps={steps} date={date} />;
					}}
				/>
			</View>
		</View>
	);
};
export default ActivitiesList;

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginHorizontal: 10,
	},
	title: {
		fontSize: 30,
	},
});
