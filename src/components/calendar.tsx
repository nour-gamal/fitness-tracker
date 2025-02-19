import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";

const DaysCalendar = ({ getSelected }: { getSelected: Function }) => {
	const [selected, setSelected] = useState(new Date());
	useEffect(() => {
		getSelected(selected.toISOString().split("T")[0]);
	}, [selected]);

	return (
		<View>
			<Calendar
				onDayPress={(day) => {
					setSelected(new Date(day.dateString));
				}}
				markedDates={{
					[selected.toISOString().split("T")[0]]: {
						selected: true,
						disableTouchEvent: true,
					},
				}}
			/>
		</View>
	);
};
export default DaysCalendar;
