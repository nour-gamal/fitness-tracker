import { View } from "react-native";
import Timer from "../components/timer";
import StepsCounter from "../components/stepsCounter";
import { useState } from "react";

const Activity = () => {
	const [steps, setSteps] = useState(0);
	const incrementSteps = () => setSteps((prev) => prev + 1);
	const [isTimerRunning, setIsTimerRunning] = useState(false);

	return (
		<View>
			<Timer
				getIsReset={() => {
					setSteps(0);
				}}
				getIsTimerRunning={(isTimerRunning) => {
					setIsTimerRunning(isTimerRunning);
				}}
			/>
			<StepsCounter
				incrementStepsAction={() => {
					if (isTimerRunning) {
						incrementSteps();
					}
				}}
				steps={steps}
			/>
		</View>
	);
};
export default Activity;
