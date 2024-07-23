import { View, Text } from "react-native";
import React from "react";
import Button from "../components/Button";
import { useUser } from "../context/UserContext";

const Home = () => {
  const { logout } = useUser();
  return (
    <View className="flex-1 bg-white flex items-center justify-center">
      <Button variant="contained" className="py-4 px-8 w-1/2" onPress={logout}>
        <Text className="text-white text-semibold text-center">Logout</Text>
      </Button>
    </View>
  );
};

export default Home;
