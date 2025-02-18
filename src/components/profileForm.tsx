import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { TextInput, Button, Avatar } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { ProfileData } from "../interfaces";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig"; // Ensure you're importing the correct storage instance

import * as ImagePicker from "expo-image-picker";
import { getData, saveData } from "../asyncStorage";
import { PROFILE_STORAGE_KEY } from "../constants";

const ProfileForm: React.FC = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<ProfileData>();

	const [profileData, updateProfileData] = useState<ProfileData>({
		name: "",
		email: "",
		phone: "",
		weight: "",
	});

	useEffect(() => {
		getData(PROFILE_STORAGE_KEY).then((data) => {
			if (data) {
				updateProfileData(data);
			}
		});
	}, []);
	const [profileImage, setProfileImage] = useState<string | null>(null);
	const [uploading, setUploading] = useState<boolean>(false);
	const openCamera = async () => {
		const { status } = await ImagePicker.requestCameraPermissionsAsync();
		if (status !== "granted") {
			Alert.alert(
				"Permission Required",
				"Camera access is needed to take a photo."
			);
			return;
		}

		const result = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [4, 4],
			quality: 1,
		});

		if (!result.canceled) {
			uploadImage(result.assets[0].uri);
		}
	};
	const uploadImage = async (uri: string) => {
		setUploading(true);
		try {
			const response = await fetch(uri);
			const blob = await response.blob();

			const filename = `profile-images/${Date.now()}.jpg`;
			const storageRef = ref(storage, filename);

			await uploadBytes(storageRef, blob);

			const downloadURL = await getDownloadURL(storageRef);
			setProfileImage(downloadURL);

			Alert.alert("Success", "Profile image uploaded successfully!");
		} catch (error) {
			console.error("Upload Error:", error);
			Alert.alert("Upload Failed", error.message || "Something went wrong!");
		}
		setUploading(false);
	};
	const onSubmit = async (data: ProfileData) => {
		try {
			await saveData(PROFILE_STORAGE_KEY, data);
			Alert.alert("Profile updated successfully");
		} catch (error) {
			Alert.alert("Something went wrong");
		}
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={openCamera}>
				{profileImage ? (
					<Image source={{ uri: profileImage }} style={styles.avatar} />
				) : (
					<Avatar.Icon size={100} icon="camera" />
				)}
			</TouchableOpacity>

			<Controller
				control={control}
				name="name"
				rules={{ required: "Name is required" }}
				render={({ field: { onChange, value } }) => (
					<TextInput
						label="Name"
						mode="outlined"
						value={profileData.name}
						onChangeText={(text) => {
							updateProfileData({ ...profileData, name: text });
							onChange(text);
						}}
						style={styles.input}
						error={!!errors.name}
					/>
				)}
			/>

			<Controller
				control={control}
				name="email"
				rules={{
					required: "Email is required",
					pattern: { value: /\S+@\S+\.\S+/, message: "Enter a valid email" },
				}}
				render={({ field: { onChange, value } }) => (
					<TextInput
						label="Email"
						mode="outlined"
						keyboardType="email-address"
						value={profileData.email}
						onChangeText={(text) => {
							updateProfileData({ ...profileData, email: text });
							onChange(text);
						}}
						style={styles.input}
						error={!!errors.email}
					/>
				)}
			/>

			<Controller
				control={control}
				name="phone"
				rules={{
					required: "Phone number is required",
					pattern: {
						value: /^[0-9]{10,12}$/,
						message: "Enter a valid phone number",
					},
				}}
				render={({ field: { onChange, value } }) => (
					<TextInput
						label="Phone"
						mode="outlined"
						keyboardType="phone-pad"
						value={profileData.phone}
						onChangeText={(text) => {
							updateProfileData({ ...profileData, phone: text });
							onChange(text);
						}}
						style={styles.input}
						error={!!errors.phone}
					/>
				)}
			/>

			<Controller
				control={control}
				name="weight"
				rules={{
					required: "Weight is required",
					pattern: { value: /^[0-9]+$/, message: "Enter a valid weight" },
				}}
				render={({ field: { onChange, value } }) => (
					<TextInput
						label="Weight (kg)"
						mode="outlined"
						keyboardType="numeric"
						value={profileData.weight}
						onChangeText={(text) => {
							updateProfileData({ ...profileData, weight: text });
							onChange(text);
						}}
						style={styles.input}
						error={!!errors.weight}
					/>
				)}
			/>

			<Button
				mode="contained"
				loading={uploading}
				onPress={handleSubmit(onSubmit)}
				style={styles.button}>
				{uploading ? "Uploading..." : "Save Profile"}
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		alignItems: "center",
		backgroundColor: "#f8f9fa",
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginBottom: 20,
	},
	input: {
		width: "100%",
		marginBottom: 10,
	},
	button: {
		marginTop: 20,
		width: "100%",
	},
});

export default ProfileForm;
