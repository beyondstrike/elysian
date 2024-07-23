import { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { ICONS } from "../contants";

const TextField = ({ icon, className, secureTextEntry, ...props }) => {
  const [showPassword, setShowPassword] = useState(secureTextEntry || false);

  return (
    <View className="w-full mb-4">
      <TextInput
        className={`w-full bg-gray-100 text-sm focus:outline-none border border-gray-200 focus:border-primary py-3 px-4 rounded-lg ${className} ${
          icon ? "pl-11" : ""
        } ${secureTextEntry ? "pr-10" : ""}`}
        secureTextEntry={showPassword}
        {...props}
      />
      {icon && (
        <View className="absolute left-3 h-full items-center justify-center">
          <Image
            source={icon}
            className="w-5 h-5"
            style={{
              tintColor: "#6b7280",
            }}
          />
        </View>
      )}
      {secureTextEntry && (
        <TouchableOpacity
          className="absolute right-0 h-full items-center justify-center px-3 cursor-pointer"
          onPress={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <Image
              style={{
                tintColor: "#6b7280",
              }}
              source={ICONS.show}
              className="w-5 h-5"
            />
          ) : (
            <Image
              style={{
                tintColor: "#6b7280",
              }}
              source={ICONS.hide}
              className="w-5 h-5"
            />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TextField;
