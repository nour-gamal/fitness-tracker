import { View } from "react-native";
import StepsCount from "../components/stepsCount";
import ActivitiesList from "../components/activitiesList";

const Home = () => {
	return (
		<View style={{ flex: 1 }}>
			<StepsCount stepsCountKey="stepsData" />
			<ActivitiesList activityMaxLength={4} />
		</View>
	);
};
export default Home;
