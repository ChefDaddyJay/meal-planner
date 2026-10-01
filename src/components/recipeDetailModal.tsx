import { StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
};

export default function RecipeDetailModal({ label }: Props) {
  const { container, text } = styles;

  return (
    <View style={container}>
      <Text style={text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {},
});
