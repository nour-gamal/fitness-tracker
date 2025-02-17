import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/screens/home";
import Profile from "./src/screens/profile";
import Activity from "./src/screens/activity";
import { Ionicons } from "@expo/vector-icons";
import History from "./src/screens/history";
import { TabIcons } from "./src/interfaces";
import {
	TAB_ACTIVE_TINT_COLOR,
	TAB_INACTIVE_TINT_COLOR,
	TAB_ACTIVE_BG_COLOR,
	TAB_INACTIVE_BG_COLOR,
} from "./src/constants";
import store from "./src/store/store";
import { Provider } from "react-redux";
export default function App() {
	const Tab = createBottomTabNavigator();
	const tabIcons: TabIcons = [
		{
			routeName: "Home",
			iconName: "home",
			size: 24,
			color: "black",
		},
		{
			routeName: "Profile",
			iconName: "person",
			size: 24,
			color: "black",
		},
		{
			routeName: "Activity",
			iconName: "analytics",
			size: 24,
			color: "black",
		},
		{
			routeName: "History",
			iconName: "time",
			size: 24,
			color: "blackred",
		},
	];
	return (
		<Provider store={store}>
			<View style={styles.container}>
				<NavigationContainer>
					<Tab.Navigator
						id={undefined}
						screenOptions={({ route }) => ({
							tabBarIcon: () => {
								const currentRoute = tabIcons.find(
									(icon) => icon.routeName === route.name
								);
								return (
									<Ionicons
										name={currentRoute.iconName}
										size={currentRoute.size}
										color={currentRoute.color}
									/>
								);
							},
							tabBarActiveTintColor: TAB_ACTIVE_TINT_COLOR,
							tabBarInactiveTintColor: TAB_INACTIVE_TINT_COLOR,
							tabBarActiveBackgroundColor: TAB_ACTIVE_BG_COLOR,
							tabBarInactiveBackgroundColor: TAB_INACTIVE_BG_COLOR,
						})}>
						<Tab.Screen name="Home" component={Home} />
						<Tab.Screen name="Profile" component={Profile} />
						<Tab.Screen name="Activity" component={Activity} />
						<Tab.Screen name="History" component={History} />
					</Tab.Navigator>
				</NavigationContainer>
				<StatusBar style="auto" />
			</View>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
});
