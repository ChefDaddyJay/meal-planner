import { Themes } from "@/colors";
import {
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

type Props = {
  label: string;
  active: boolean;
  onPress: (filter: string) => void;
};

export default function FilterOption({ label, active, onPress }: Props) {
  const { container, text } = styles;
  const screenWidth = Dimensions.get("window").width;
  const optionWidth = Platform.OS === "web" ? screenWidth / 5 : screenWidth / 2;

  return (
    <Pressable
      style={
        active
          ? [
              container,
              {
                borderColor: Themes.accent,
              },
            ]
          : container
      }
      onPress={() => onPress(label)}
    >
      <Text
        style={
          active ? [text, { fontWeight: "bold", color: Themes.accent }] : text
        }
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 6,
    paddingHorizontal: 8,
    borderWidth: 1,
    backgroundColor: Themes.background,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
  },
  text: {
    fontSize: 18,
    color: Themes.text,
  },
});
