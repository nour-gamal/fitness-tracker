import { useEffect } from "react";
import { incrementSteps, setSteps } from "../slice";
import { useDispatch, useSelector } from "react-redux";
import { selectSteps } from "../selectors";
import { getData, getTodayDate, saveData } from "../asyncStorage";
import StepsCounter from "./stepsCounter";
const StepsCountPerday = () => {
	const dispatch = useDispatch();
	const steps = useSelector(selectSteps);
	const stepsCountKey: string = "stepsCount";
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
		saveData(stepsCountKey, { [getTodayDate()]: steps });
	}, [steps]);

	return (
		<StepsCounter
			steps={steps}
			incrementStepsAction={() => dispatch(incrementSteps())}
		/>
	);
};

export default StepsCountPerday;
