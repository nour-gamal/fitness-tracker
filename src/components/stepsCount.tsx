import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Accelerometer } from "expo-sensors";
import { incrementSteps, setSteps } from "../slice";
import { useDispatch, useSelector } from "react-redux";
import { ACTIVITY_THRESHOLD } from "../constants";
import { selectSteps } from "../selectors";
import { getData, getTodayDate, saveData } from "../asyncStorage";
import {
	detectActivity,
	distanceToCalories,
	getDistance,
	getMinutes,
} from "../helpers/stepsConversionsHelper";
const StepsCount = ({ stepsCountKey }: { stepsCountKey: string }) => {
	const dispatch = useDispatch();
	const steps = useSelector(selectSteps);
	const [previousMagnitude, setPreviousMagnitude] = useState(0);
	useEffect(() => {
		getData(stepsCountKey).then((data) => {
			if (data) {
				const todayStepsData = data[getTodayDate()];
				if (todayStepsData) {
					dispatch(setSteps(todayStepsData));
				}
			}
		});
	}, []);
	useEffect(() => {
		let subscription;
		const subscribe = async () => {
			subscription = Accelerometer.addListener(({ x, y, z }) => {
				const magnitude = Math.sqrt(x * x + y * y + z * z);
				if (Math.abs(magnitude - previousMagnitude) > ACTIVITY_THRESHOLD) {
					dispatch(incrementSteps());
				}
				setPreviousMagnitude(magnitude);
			});

			Accelerometer.setUpdateInterval(100); // Updates every 100ms
		};

		subscribe();
		return () => subscription && subscription.remove();
	}, [previousMagnitude]);

	useEffect(() => {
		saveData(stepsCountKey, { [getTodayDate()]: steps });
	}, [steps]);

	const distance = getDistance(steps);
	const minutes = getMinutes(steps);
	const isRunning = detectActivity(steps, +minutes) === "running";
	const calories = distanceToCalories(+distance, isRunning);
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
export default StepsCount;
