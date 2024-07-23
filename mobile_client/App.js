import { StatusBar } from "expo-status-bar";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import MainNavigation from "./navigation/MainNavigation";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import UserContext from "./context/UserContext";
import Toast from "react-native-toast-message";
import { Text, View, Platform } from "react-native";

const toastConfig = {
  success: ({ text1, props }) => (
    <View className="w-full py-2 px-4">
      <View
        className={`border-l-4 border-red-500 py-2 px-4 bg-white rounded ${
          Platform.OS === "ios"
            ? "shadow-sm shadow-black/20"
            : "shadow shadow-black"
        }`}
      >
        <Text className="text-gray-500 text-left text-xs font-semibold">
          {text1}
        </Text>
      </View>
    </View>
  ),
  success: ({ text1, props }) => (
    <View className="w-full py-2 px-4">
      <View
        className={`border-l-4 border-green-500 py-2 px-4 bg-white rounded ${
          Platform.OS === "ios"
            ? "shadow-sm shadow-black/20"
            : "shadow shadow-black"
        }`}
      >
        <Text className="text-gray-500 text-left text-xs font-semibold">
          {text1}
        </Text>
      </View>
    </View>
  ),
};

const App = () => {
  return (
    <NavigationContainer>
      <UserContext>
        <SafeAreaProvider>
          <SafeAreaView className="flex-1">
            <MainNavigation />
            <StatusBar style="dark" />
            <Toast config={toastConfig} />
          </SafeAreaView>
        </SafeAreaProvider>
      </UserContext>
    </NavigationContainer>
  );
};

export default App;
