import CategoryCard from "@/components/categoryCard";
import CategoryModal from "@/components/categoryModal";
import { Category, IngredientEntry } from "@/types";
import { Requests } from "@/utils/api";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Inventory() {
  const [categories, setCategories] = useState<Category[] | undefined>(
    undefined,
  );
  const [openCategory, setOpenCategory] = useState<Category | undefined>(
    undefined,
  );
  const [inventory, setInventory] = useState<IngredientEntry[]>([]);
  const { container } = styles;

  const onModalClose = () => setOpenCategory(undefined);
  const openModal = (category: Category) => {
    return () => setOpenCategory(category);
  };
  const addToInventory = (ingredient: IngredientEntry) => {
    if (inventory.findIndex(({ id }) => id === ingredient.id) !== -1) return;

    Requests.addToInventory(ingredient).then((response) => {
      setInventory([...inventory, response]);
    });
  };
  const removeFromInventory = (ingredient: IngredientEntry) => {
    const removeIds = inventory.filter(({ name }) => name === ingredient.name);
    Requests.removeFromInventory(removeIds.map(({ id }) => id)).then(
      (response) => {
        setInventory(response);
      },
    );
  };
  const categoryCount = (categoryId: string) => {
    if (inventory) {
      return inventory.reduce(
        (count, { category }) => (category === categoryId ? count + 1 : count),
        0,
      );
    }
    return 0;
  };
  const categoryContents = (categoryId: string) =>
    inventory.filter(({ category }) => category === categoryId);

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      const fetchData = async () => {
        try {
          const categories = await Requests.getCategories();
          const inventory = await Requests.getInventory();

          if (isMounted) {
            setCategories(categories);
            setInventory(inventory);
          }
        } catch (error) {
          alert(error);
        }
      };

      fetchData();

      return () => {
        isMounted = false;
        setCategories([]);
        setInventory([]);
      };
    }, []),
  );

  return (
    <View style={[container, StyleSheet.absoluteFill]}>
      {categories ? (
        categories.map((category) => (
          <CategoryCard
            category={category}
            onPress={openModal(category)}
            key={category.id}
            itemCount={categoryCount(category.id)}
          />
        ))
      ) : (
        <View />
      )}
      {openCategory && (
        <CategoryModal
          isVisible={true}
          category={openCategory}
          ingredientList={categoryContents(openCategory.id)}
          onClose={onModalClose}
          onAdd={addToInventory}
          onRemove={removeFromInventory}
        />
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
