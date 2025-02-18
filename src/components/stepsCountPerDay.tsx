import { useEffect } from "react";
import { incrementSteps, setSteps } from "../slice";
import { useDispatch, useSelector } from "react-redux";
import { selectSteps } from "../selectors";
import { getData, getTodayDate, saveData } from "../asyncStorage";
import StepsCounter from "./stepsCounter";
import { STEPS_STORAGE_KEY } from "../constants";
const StepsCountPerday = () => {
	const dispatch = useDispatch();
	const steps = useSelector(selectSteps);
	useEffect(() => {
		getData(STEPS_STORAGE_KEY).then((data) => {
			if (data) {
				const todayStepsData = data[getTodayDate()];
				if (todayStepsData) {
					dispatch(setSteps(todayStepsData));
				}
			}
		});
	}, []);

	useEffect(() => {
		saveData(STEPS_STORAGE_KEY, { [getTodayDate()]: steps });
	}, [steps]);

	return (
		<StepsCounter
			steps={steps}
			incrementStepsAction={() => dispatch(incrementSteps())}
		/>
	);
};

export default StepsCountPerday;
