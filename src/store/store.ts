import { configureStore } from "@reduxjs/toolkit";
import { activitiesSlice } from "../slice";

const store = configureStore({
	reducer: {
		activitySlice: activitiesSlice.reducer,
	},
});
store.subscribe(() => console.log(store.getState()));
export default store;
