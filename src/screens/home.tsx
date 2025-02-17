import { View } from "react-native";
import StepsCount from "../components/stepsCountPerDay";
import ActivitiesList from "../components/activitiesList";

const Home = () => {
	return (
		<View style={{ flex: 1 }}>
			<StepsCount />
			<ActivitiesList activityMaxLength={4} />
		</View>
	);
};
export default Home;
