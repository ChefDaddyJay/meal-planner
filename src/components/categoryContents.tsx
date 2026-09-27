import { Themes } from "@/colors";
import { Category, Ingredient, IngredientEntry } from "@/types";
import { Requests } from "@/utils/api";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import IngredientListEntry from "./ingredientListEntry";

type Props = {
  category: Category;
  contents: IngredientEntry[];
  add: (ingredient: IngredientEntry) => void;
  remove: (ingredient: IngredientEntry) => void;
};

export default function CategoryContents({
  category,
  contents,
  add,
  remove,
}: Props) {
  const [ingredientsList, setIngredientsList] = useState<IngredientEntry[]>([]);
  const { container, content, listContainer } = styles;

  Requests.getIngredientsByCategory(category.id).then(
    (ingredients: Ingredient[]) => {
      setIngredientsList(
        ingredients.map((ingredient) => {
          return {
            ...ingredient,
            unit: ingredient.purchaseUnit,
            amount: ingredient.baseQuantity,
          } as IngredientEntry;
        }),
      );
    },
  );

  return (
    <View style={container}>
      <View style={[content, StyleSheet.absoluteFill]}>
        {ingredientsList.length < 1 ? (
          <Text>No items in inventory</Text>
        ) : (
          <FlatList
            data={ingredientsList}
            contentContainerStyle={listContainer}
            renderItem={({ item, index }) => (
              <IngredientListEntry
                ingredient={item}
                onCheck={() => add(item)}
                onUncheck={() => remove(item)}
                checked={
                  contents.findIndex(({ name }) => name === item.name) !== -1
                }
                key={index}
              />
            )}
          />
        )}
        {/* <AddItemButton onPress={addItem} color={category.color} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Themes.background,
    height: "90%",
    width: "98%",
    marginHorizontal: "auto",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Themes.border,
    padding: 4,
  },
  content: {
    margin: 4,
    justifyContent: "center",
    gap: 2,
    width: "100%",
  },
  listContainer: {
    width: "100%",
    gap: 8,
  },
});
