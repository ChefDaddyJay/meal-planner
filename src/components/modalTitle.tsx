import { Themes } from "@/colors";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {
  text: string;
  onClose: () => void;
};

export default function ModalTitle({ text, onClose }: Props) {
  const { container, title, button } = styles;

  return (
    <View style={container}>
      <Text style={title}>{text}</Text>
      <Pressable style={button} onPress={onClose}>
        <MaterialCommunityIcons
          name="close"
          color={Themes.background}
          size={28}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
  button: {
    position: "absolute",
    top: 0,
    right: 0,
    marginTop: 4,
    marginRight: 8,
  },
});
