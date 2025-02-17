import { StyleSheet, Text, View } from "react-native";
import {
	detectActivity,
	distanceToCalories,
	getDistance,
	getMinutes,
} from "../helpers/stepsConversionsHelper";
import { useEffect, useState } from "react";
import { Accelerometer } from "expo-sensors";
import { ACTIVITY_THRESHOLD } from "../constants";

const StepsCounter = ({
	steps,
	incrementStepsAction,
}: {
	steps: number;
	incrementStepsAction: Function;
}) => {
	const distance = getDistance(steps);
	const minutes = getMinutes(steps);
	const isRunning = detectActivity(steps, +minutes) === "running";
	const calories = distanceToCalories(+distance, isRunning);
	const [previousMagnitude, setPreviousMagnitude] = useState(0);

	useEffect(() => {
		let subscription: any;
		const subscribe = async () => {
			subscription = Accelerometer.addListener(({ x, y, z }) => {
				const magnitude = Math.sqrt(x * x + y * y + z * z);
				if (Math.abs(magnitude - previousMagnitude) > ACTIVITY_THRESHOLD) {
					incrementStepsAction();
				}
				setPreviousMagnitude(magnitude);
			});

			Accelerometer.setUpdateInterval(100); // Updates every 100ms
		};

		subscribe();
		return () => subscription && subscription.remove();
	}, [previousMagnitude]);

	return (
		<View>
			<View style={styles.stepsContainer}>
				<Text style={styles.stepsText}>{steps}</Text>
				<Text style={styles.title}>Steps</Text>
			</View>
			<View style={styles.container}>
				<View style={styles.infoContainer}>
					<Text>{calories}</Text>
					<Text style={styles.title}>Calories</Text>
				</View>
				<View style={styles.infoContainer}>
					<Text>{distance} KM</Text>
					<Text style={styles.title}>Distance</Text>
				</View>
				<View style={styles.infoContainer}>
					<Text>{minutes} min</Text>
					<Text style={styles.title}>Active minutes</Text>
				</View>
			</View>
		</View>
	);
};
export default StepsCounter;

const styles = StyleSheet.create({
	stepsContainer: {
		display: "flex",
		alignItems: "center",
		marginVertical: 30,
	},
	stepsText: {
		fontSize: 50,
		fontWeight: "bold",
	},
	container: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		color: "#000",
		marginVertical: 20,
		marginHorizontal: 10,
	},
	infoContainer: {
		display: "flex",
		alignItems: "center",
	},
	title: {
		fontWeight: "bold",
		fontSize: 13,
	},
});
