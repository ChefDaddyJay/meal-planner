import { Themes } from "@/colors";
import { Pressable, StyleSheet, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {
  onPress: () => void;
  color?: string;
};

export default function AddItemButton({ onPress, color }: Props) {
  const { button, label } = styles;

  return (
    <Pressable
      style={[button, { backgroundColor: color ? color : Themes.primary }]}
      onPress={onPress}
    >
      <MaterialCommunityIcons name="plus-circle-outline" size={36} />
      <Text style={label}>Add Item</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "60%",
    position: "absolute",
    left: "20%",
    bottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 4,
    borderColor: Themes.border,
    borderWidth: 1,
    borderRadius: 18,
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
