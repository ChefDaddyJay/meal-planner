import CategoryCard from "@/components/categoryCard";
import { Category } from "@/types";
import { Requests } from "@/utils/api";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Inventory() {
  const [categories, setCategories] = useState<Category[] | undefined>(
    undefined,
  );
  const { container } = styles;

  Requests.getCategories().then((categories) => setCategories(categories));

  return (
    <View style={[container, StyleSheet.absoluteFill]}>
      {categories ? (
        categories.map((category) => (
          <CategoryCard category={category} key={category.id} />
        ))
      ) : (
        <View />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
});
