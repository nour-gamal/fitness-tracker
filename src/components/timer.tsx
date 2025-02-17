import { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

const Timer = () => {
	const [seconds, setSeconds] = useState(0);
	const [isTimerRunning, setIsTimerRunning] = useState(false);

	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (isTimerRunning) {
			interval = setInterval(() => {
				setSeconds((prev) => prev + 1);
			}, 1000);
		} else {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [isTimerRunning]);

	const formatTime = (secs: number) => {
		const hrs = String(Math.floor(secs / 3600)).padStart(2, "0");
		const mins = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
		const secsRemaining = String(secs % 60).padStart(2, "0");
		return `${hrs}:${mins}:${secsRemaining}`;
	};

	return (
		<View style={styles.container}>
			<Text style={styles.timerText}>{formatTime(seconds)}</Text>
			<View style={styles.buttonsContainer}>
				<TouchableOpacity
					style={[
						styles.button,
						isTimerRunning ? styles.stopButton : styles.startButton,
					]}
					onPress={() => setIsTimerRunning(!isTimerRunning)}>
					<Text style={styles.buttonText}>
						{isTimerRunning ? "Stop" : "Start"}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.button, styles.resetButton]}
					onPress={() => {
						setIsTimerRunning(false);
						setSeconds(0);
					}}>
					<Text style={styles.buttonText}>Reset</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f5f5f5",
	},
	timerText: {
		fontSize: 50,
		fontWeight: "bold",
		marginBottom: 20,
		color: "#333",
	},
	buttonsContainer: {
		flexDirection: "row",
		gap: 15,
	},
	button: {
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 8,
		elevation: 2, // Adds a shadow effect on Android
	},
	startButton: {
		backgroundColor: "green",
	},
	stopButton: {
		backgroundColor: "red",
	},
	resetButton: {
		backgroundColor: "gray",
	},
	buttonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
	},
});

export default Timer;
