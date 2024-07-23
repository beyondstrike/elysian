import React, { useEffect, useRef } from "react";
import { View, Image, Animated, Easing } from "react-native";
import { ICONS } from "../contants";

const Splash = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View className="flex-1 flex items-center justify-center bg-white">
      <Animated.Image
        source={ICONS.logo}
        style={{
          width: 48,
          height: 48,
          marginBottom: 48,
          transform: [{ rotate: spin }],
        }}
      />
    </View>
  );
};

export default Splash;
