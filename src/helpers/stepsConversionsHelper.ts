import { STEP_LENGTH_KM, STEPS_PER_MINUTE } from "../constants";

export const getDistance = (steps: number) =>
	(steps * STEP_LENGTH_KM).toFixed(1);

export const getMinutes = (steps: number) =>
	(steps / STEPS_PER_MINUTE).toFixed(1);

export const distanceToCalories = (
	distanceKm: number,
	isRunning: boolean = false,
    weightKg: number = 70,
): number => {
	const WALKING_CALORIES_PER_KM = 0.75 * weightKg; // ~0.75 calories per kg per km
	const RUNNING_CALORIES_PER_KM = 1.1 * weightKg; // ~1.1 calories per kg per km

	const caloriesBurned = isRunning
		? distanceKm * RUNNING_CALORIES_PER_KM
		: distanceKm * WALKING_CALORIES_PER_KM;

	return Math.round(caloriesBurned);
};

export const detectActivity = (
	steps: number,
	timeMinutes: number
): "walking" | "running" => {
	const cadence = steps / timeMinutes; // Steps per minute

	if (cadence >= 140) {
		return "running";
	} else if (cadence >= 60) {
		return "walking";
	} else {
		return "walking"; // Default to walking for very low values
	}
};
