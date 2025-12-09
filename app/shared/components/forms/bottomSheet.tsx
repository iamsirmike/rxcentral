import React, { useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface BottomSheetProps {
  openBottomSheet: boolean;
  children?: React.ReactNode;
}

export default function BottomSheet({
  openBottomSheet,
  children,
}: BottomSheetProps) {
  const translateY = useRef(new Animated.Value(300)).current;
  const [opened, setOpened] = useState(false);

  const open = () => {
    setOpened(openBottomSheet);
    Animated.timing(translateY, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const close = () => {
    Animated.timing(translateY, {
      toValue: 300,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setOpened(openBottomSheet));
  };

  return (
    <View style={{ flex: 1 }}>
      {opened && (
        <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
          {children}
          <TouchableOpacity onPress={close}>
            <Text>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    padding: 18,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
