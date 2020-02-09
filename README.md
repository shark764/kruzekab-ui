Once cloned the Repo, run the following to create keystore for android

~/ cd android/app/

~/ keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000

or download it from the the offitial template:
https://raw.githubusercontent.com/facebook/react-native/master/template/android/app/debug.keystore

// Install the dependencies

~/ yarn install

// Link manually these dependencies

~/ react-native link react-native-vector-icons

~/ react-native link react-native-svg

~/ react-native link react-native-image-picker