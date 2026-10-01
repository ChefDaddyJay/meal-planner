import { Themes } from "@/colors";
import { FlatList, Platform, StyleSheet, View } from "react-native";
import FilterOption from "./filterOption";

type Props = {
  filters: string[];
  active: string;
  onChange: (filter: string) => void;
};

export default function RecipeFilterBar({ filters, active, onChange }: Props) {
  const { container, filtersContainer } = styles;

  return (
    <View style={container}>
      <FlatList
        horizontal
        data={filters}
        contentContainerStyle={filtersContainer}
        renderItem={({ item, index }) => (
          <FilterOption
            label={item}
            active={item === active}
            onPress={onChange}
            key={index}
          />
        )}
        showsHorizontalScrollIndicator={Platform.OS === "web"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 58,
    width: "100%",
    backgroundColor: Themes.border,
    padding: 4,
    borderBottomWidth: 1,
  },
  filtersContainer: {
    gap: 4,
  },
});
