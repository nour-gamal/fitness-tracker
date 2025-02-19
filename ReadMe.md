# Fitness Tracker App

## Overview

The **Fitness Tracker App** is a React Native application that allows users to track their steps, store profile data, and manage fitness-related information using **Apple HealthKit** (iOS) and **Google Fit** (Android). The app supports step counting in the background and enables users to update their profile with details such as name, email, phone number, and weight.

## Features

- Step counting using Apple HealthKit (iOS) and Google Fit (Android)
- Background step tracking
- Profile management with persistent storage
- Profile image upload via camera

---

## Setup Instructions

### 1. Prerequisites

Ensure you have the following installed:

- **Node.js** (LTS version recommended)
- **React Native CLI** or **Expo CLI**
- **Xcode** (for iOS development)
- **Android Studio** (for Android development)

### 2. Clone the Repository

```sh
git clone https://github.com/yourusername/fitness-tracker.git
cd fitness-tracker
```

### 3. Install Dependencies

```sh
npm install
```

For iOS:

```sh
cd ios && pod install && cd ..
```

### 4. Set Up Permissions

#### **iOS (Apple HealthKit)**

- Open `ios/YourProject/Info.plist` and add:
  ```xml
  <key>NSHealthShareUsageDescription</key>
  <string>We need access to your step count</string>
  <key>NSHealthUpdateUsageDescription</key>
  <string>We need access to your step count</string>
  ```
- Enable **HealthKit** in `Xcode > Signing & Capabilities`.

#### **Android (Google Fit)**

- Open `android/app/src/main/AndroidManifest.xml` and add:
  ```xml
  <uses-permission android:name="android.permission.ACTIVITY_RECOGNITION" />
  ```
- Enable **Google Fit API** in your Google Developer Console.

### 5. Run the Application

#### **For iOS**

```sh
npx react-native run-ios
```

#### **For Android**

```sh
npx react-native run-android
```

---

## Usage

### **Profile Setup**

1. Open the app and fill in your profile details (name, email, phone, weight).
2. Capture or upload a profile picture.
3. Click "Save Profile" to persist the data.

### **Step Tracking**

- Steps will be counted automatically when the app is open.
- The app runs step tracking in the background using **React Native Background Fetch**.

---

## Background Step Tracking

This app uses `react-native-background-fetch` to fetch step count data even when the app is closed.
To enable this feature, run:

```sh
npm install react-native-background-fetch
```

Ensure the `BackgroundFetch` configuration is set correctly inside `App.tsx`.

---

## Contributing

If you’d like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m "Added new feature"`)
4. Push to the branch (`git push origin feature-name`)
5. Open a pull request

---

## License

This project is licensed under the **MIT License**.
