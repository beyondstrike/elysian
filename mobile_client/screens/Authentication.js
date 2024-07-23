import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { ICONS } from "../contants";
import TextField from "../components/TextField";
import Button from "../components/Button";
import Toast from "react-native-toast-message";
import { useUser } from "../context/UserContext";

const validateEmail = (email) => {
  const re =
    // eslint-disable-next-line no-useless-escape
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return re.test(email);
};

const Authentication = ({ isRegister, navigation }) => {
  const { register, login } = useUser();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateData = () => {
    if (!email || !password) {
      throw "Email and password are required";
    }
    if (!validateEmail(email)) {
      throw "Invalid email address";
    }
    if (isRegister && !displayName) {
      throw "Display name is required";
    }
    if (isRegister && displayName.length < 1) {
      throw "Display name must be at least 1 characters long";
    }
    if (password.length < 4) {
      throw "Password must be at least 4 characters long";
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      validateData();
      const message = isRegister
        ? await register(displayName, email, password)
        : await login(email, password);
      Toast.show({
        type: "success",
        text1: message,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="bg-white">
      <View className="pt-16 px-10 flex items-center justify-center">
        <Image
          source={ICONS.logo}
          className="w-12 h-12 mb-8"
          resizeMode="contain"
        />
        <Text className="text-xl font-semibold text-primary mb-8">
          {isRegister ? "Register" : "Login"}
        </Text>
        {isRegister && (
          <TextField
            placeholder="Display Name"
            icon={ICONS.user}
            value={displayName}
            onChangeText={setDisplayName}
          />
        )}
        <TextField
          placeholder="Email"
          icon={ICONS.mail}
          value={email}
          onChangeText={setEmail}
        />
        <TextField
          placeholder="Password"
          icon={ICONS.lock}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <Button
          disabled={loading}
          variant="text"
          className="ml-auto"
          textClassName="text-xs"
        >
          <Text className="text-xs text-primary font-semibold">
            Forgot Password?
          </Text>
        </Button>
        <Button
          disabled={loading}
          onPress={onSubmit}
          variant="contained"
          className="mt-8 py-3"
        >
          <Text className="text-white text-semibold text-center">
            {loading ? "Loading..." : isRegister ? "Register" : "Login"}
          </Text>
        </Button>
        <View className="py-4 w-2/3 flex-row items-center space-x-4">
          <View className="flex-1 bg-[#E6E9FA] h-[1px]" />
          <Text className="text-sm text-gray-500">Or</Text>
          <View className="flex-1 bg-[#E6E9FA] h-[1px]" />
        </View>
        <View className="flex-row space-x-3 w-full">
          <Button
            disabled={loading}
            variant="outlined"
            className="flex-1 flex-row justify-center items-center space-x-2 py-2"
          >
            <Image
              source={ICONS.google}
              className="w-5 h-5"
              resizeMode="contain"
            />
            <Text className="text-primary text-semibold text-center">
              Google
            </Text>
          </Button>
          <Button
            disabled={loading}
            variant="outlined"
            className="flex-1 flex-row justify-center items-center space-x-2 py-2"
          >
            <Image
              source={ICONS.facebook}
              className="w-5 h-5"
              resizeMode="contain"
            />
            <Text className="text-primary text-semibold text-center">
              Facebook
            </Text>
          </Button>
        </View>
        <Text className="text-xs mt-8">
          {isRegister ? "Already have an account?" : "Don't have an account?"}
        </Text>
        <Button
          disabled={loading}
          onPress={() => {
            navigation.navigate(isRegister ? "Login" : "Register");
          }}
          variant="outlined"
          className="mt-3 py-3"
        >
          <Text className="text-primary text-semibold text-center">
            {isRegister ? "Login" : "Register"}
          </Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default Authentication;
