import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//screens
import Home from "../screens/Home";
import Search from "../screens/Search";
import Notification from "../screens/Notification";
import Profile from "../screens/Profile";
import { ICONS } from "../contants";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

const HomeTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#3949AB",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          elevation: 0,
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          marginTop: -8,
          fontWeight: "600",
        },
        tabBarIcon: ({ focused }) => {
          return (
            <Image
              className="w-5 h-5"
              source={ICONS[route.name]}
              style={{ tintColor: focused ? "#3949AB" : "#6b7280" }}
              resizeMode="contain"
            />
          );
        },
      })}
    >
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="search" component={Search} />
      <Tab.Screen name="notification" component={Notification} />
      <Tab.Screen name="profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default HomeTabNavigation;
