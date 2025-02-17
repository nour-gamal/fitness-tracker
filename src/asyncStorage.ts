import AsyncStorage from "@react-native-async-storage/async-storage";
export const getData = async (key?: string) => {
	try {
		const value = await AsyncStorage.getItem(key);

		return value ? JSON.parse(value) : null; // Parse JSON string
	} catch (error) {
		console.error("Error retrieving data", error);
		return null;
	}
};
export const saveData = async (key: string, value: object) => {
	try {
		const getPreviousData = await getData(key);
		const newValue = { ...getPreviousData, ...value };
		const jsonValue = JSON.stringify(newValue); // Convert object to JSON string

		await AsyncStorage.setItem(key, jsonValue);
	} catch (error) {
		console.error("Error storing data", error);
	}
};

export const removeData = async (key: string) => {
	try {
		await AsyncStorage.removeItem(key);
	} catch (error) {
		console.error("Error removing data", error);
	}
};

export const getTodayDate = (): string => {
	return new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
};
