import { createSelector } from "@reduxjs/toolkit";

export const selectSteps = createSelector(
	(state) => state.activitySlice,
	(activity) => activity.steps
);
