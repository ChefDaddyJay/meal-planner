import { StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
};

export default function RecipeCard({ label }: Props) {
  const { container, text } = styles;

  return (
    <View style={container}>
      <Text style={text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderWidth: 1,
    borderRadius: 18,
    width: "100%",
  },
  text: {},
});
