import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTabNavigation from "./HomeTabNavigation";
import Authentication from "../screens/Authentication";
import { useUser } from "../context/UserContext";

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  const { user } = useUser();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={user ? "Main" : "Login"}
    >
      {user ? (
        <Stack.Screen name="Main" component={HomeTabNavigation} />
      ) : (
        <>
          <Stack.Screen name="Login">
            {(props) => <Authentication {...props} isRegister={false} />}
          </Stack.Screen>
          <Stack.Screen name="Register">
            {(props) => <Authentication {...props} isRegister={true} />}
          </Stack.Screen>
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainNavigation;
