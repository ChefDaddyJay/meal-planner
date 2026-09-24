import { StyleSheet, Text, View } from "react-native";

export default function Recipes() {
  return (
    <View style={styles.container}>
      <Text>Inventory Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
