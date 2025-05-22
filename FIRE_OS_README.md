# Testing expo-store-review on Fire OS

This app is designed to test the functionality of the expo-store-review package on Fire OS devices.

## About expo-store-review

[expo-store-review](https://github.com/expo/expo/tree/main/packages/expo-store-review) is a library that provides access to the native store review functionality, allowing users to rate your app without leaving it. The library provides methods to:

- Check if the Store Review API is available
- Request a review from the user
- Get the store URL for the app
- Open the store page for the app

## Setup Instructions

### Prerequisites
- Node.js and npm installed
- Expo CLI installed (`npm install -g expo-cli`)
- A Fire OS device (Fire tablet or Fire TV)
- Developer options enabled on your Fire OS device

### Running the App in Development Mode

1. Install dependencies:
   ```
   cd store-review-test
   npm install
   ```

2. Start the Expo development server:
   ```
   npx expo start
   ```

3. Use the Expo Go app on your Fire OS device to scan the QR code and open the app.

### Building a Standalone APK

To build a standalone APK for testing on Fire OS:

1. Install EAS CLI:
   ```
   npm install -g eas-cli
   ```

2. Configure EAS Build:
   ```
   eas build:configure
   ```

3. Create a development build:
   ```
   eas build -p android --profile development
   ```

4. Install the resulting APK on your Fire OS device.

## Testing Features

The app provides a simple interface to test the following features:

1. **Check Availability**: Verify if the Store Review API is available on the device
2. **Get Store URL**: Retrieve the Amazon Appstore URL for the app
3. **Request Review**: Attempt to trigger the in-app review dialog
4. **Open Store Page**: Open the app's page in the Amazon Appstore
5. **Get Device Info**: Display information about the device to confirm it's running Fire OS

## Fire OS Compatibility Notes

- Fire OS is based on Android but uses the Amazon Appstore instead of Google Play
- The `StoreReview.requestReview()` method may behave differently on Fire OS compared to standard Android
- The store URL format for Amazon Appstore is different from Google Play
- The app detects if it's running on Fire OS by checking the device manufacturer

## Expected Behavior on Fire OS

1. **Check Availability**: 
   - Should return `true` if the Amazon Appstore is installed and supports in-app reviews
   - May return `false` on older Fire OS versions

2. **Get Store URL**:
   - Should return an Amazon Appstore URL (typically starting with `amzn://`)
   - Format may be `amzn://apps/android?p=[package_name]`

3. **Request Review**:
   - May show the Amazon Appstore review dialog if supported
   - May not work on all Fire OS devices or versions

4. **Open Store Page**:
   - Should open the Amazon Appstore to the app's page
   - Will use the URL returned by `StoreReview.storeUrl()`

## Troubleshooting

If you encounter issues with the Store Review functionality on Fire OS:

1. Make sure your app is published on the Amazon Appstore
2. Verify that the Amazon Appstore app is installed and up to date
3. Check if the device is running a recent version of Fire OS
4. Try using the direct Amazon Appstore URL instead of the in-app review dialog

## Additional Resources

- [expo-store-review Documentation](https://docs.expo.dev/versions/latest/sdk/store-review/)
- [Amazon Appstore Developer Portal](https://developer.amazon.com/apps-and-games/appstore)
- [Fire OS Developer Documentation](https://developer.amazon.com/docs/fire-tablets/fire-os-overview.html)
