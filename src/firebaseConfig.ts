import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyAWki_lTiiRcEY36jiQK42cvTnDVKGTz-c",
	authDomain: "fitness-tracker-427ab.firebaseapp.com",
	projectId: "fitness-tracker-427ab",
	storageBucket: "fitness-tracker-427ab.firebasestorage.app",
	messagingSenderId: "804651047470",
	appId: "1:804651047470:web:b4ec52b96f26ff079f9dbf",
	measurementId: "G-CB79EVRMCC",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
