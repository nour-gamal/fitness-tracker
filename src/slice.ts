import { createSlice } from "@reduxjs/toolkit";
import { activitiesSliceInterface } from "./interfaces";

const initialState: activitiesSliceInterface = {
	steps: 0,
};
export const activitiesSlice = createSlice({
	name: "activitySlice",
	initialState,
	reducers: {
		incrementSteps: (state) => {
			state.steps += 1;
		},
		resetSteps: (state) => {
			state.steps = 0;
		},
		setSteps: (state, action) => {
			state.steps = action.payload;
		},
	},
});
export const { incrementSteps, resetSteps, setSteps } = activitiesSlice.actions;
