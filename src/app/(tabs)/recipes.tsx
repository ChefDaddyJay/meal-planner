import { Themes } from "@/colors";
import AddItemButton from "@/components/addItemButton";
import AddItemModal from "@/components/addItemModal";
import RecipeCard from "@/components/recipeCard";
import RecipeFilterBar from "@/components/recipeFilterBar";
import RecipreSearchBar from "@/components/recipeSearchBar";
import { Recipe } from "@/types";
import { Requests } from "@/utils/api";
import { RECIPE_TAGS } from "@/utils/definitions";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Recipes() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);

  const { container, recipesContainer } = styles;

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      const fetchData = async () => {
        try {
          const recipes = await Requests.getAllRecipes();

          if (isMounted) {
            setRecipes(recipes);
          }
        } catch (error) {
          alert(error);
        }
      };

      fetchData();

      return () => {
        isMounted = false;
        setRecipes([]);
      };
    }, []),
  );

  return (
    <View style={[container, StyleSheet.absoluteFill]}>
      <RecipreSearchBar label="Search Bar" />
      <RecipeFilterBar
        filters={RECIPE_TAGS}
        active={activeFilter}
        onChange={handleFilterChange}
      />
      <FlatList
        data={recipes}
        contentContainerStyle={recipesContainer}
        renderItem={({ item, index }) => (
          <RecipeCard label={item.name} key={index} />
        )}
      />
      <AddItemModal
        title="Add Recipe"
        isVisible={addModalVisible}
        onClose={() => {
          setAddModalVisible(false);
        }}
      >
        <Text>Add REcipe</Text>
      </AddItemModal>
      <AddItemButton
        onPress={() => {
          setAddModalVisible(true);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Themes.accent,
  },
  recipesContainer: {
    width: 380,
    alignItems: "stretch",
    gap: 8,
    paddingVertical: 10,
  },
});
