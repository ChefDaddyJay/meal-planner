import { Themes } from "@/colors";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {
  label: string;
};

export default function RecipreSearchBar({ label }: Props) {
  const [query, setQuery] = useState<string>("");
  const { container, text, icon } = styles;

  const onChange = (input: string) => {
    setQuery(input);
  };

  return (
    <View style={container}>
      <TextInput
        style={text}
        onChangeText={onChange}
        value={query}
        placeholder="Search Recipes"
      />
      <MaterialCommunityIcons name="magnify" style={icon} size={24} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: Themes.primary,
    width: "100%",
    height: 46,
  },
  text: {
    width: "50%",
    height: 36,
    backgroundColor: Themes.background,
    borderWidth: 1,
    borderRadius: 18,
    textAlign: "center",
  },
  icon: {
    position: "absolute",
    right: 10,
    borderWidth: 1,
    borderRadius: 42,
    padding: 4,
  },
});
