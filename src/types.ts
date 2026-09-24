export type Category = {
  id: IngredientCategoryId;
  name: string;
  color: string;
};

export type IngredientCategoryId =
  | "dairy"
  | "protein"
  | "produce_fresh"
  | "produce_frozen"
  | "canned"
  | "grains"
  | "baking"
  | "oils"
  | "condiments"
  | "broths"
  | "beans"
  | "nuts"
  | "bread"
  | "spices"
  | "breakfast"
  | "snacks";

export type Unit =
  // Mass
  | "oz"
  | "lb"

  // Volume
  | "tsp"
  | "tbsp"
  | "cup"
  | "pt"
  | "qt"
  | "gal"

  // Count / individual items
  | "count"

  // Special/package units
  | "can"
  | "jar"
  | "bottle"
  | "bag"
  | "box"
  | "package"
  | "packet"
  | "bunch"
  | "head"
  | "loaf"
  | "ear"
  | "bulb"
  | "stalk"
  | "clove"
  | "leaf"
  | "fillet"
  | "container"

  // Recipe-specific units
  | "slice"

  // Fallback for unusual ingredients
  | "other";

export type Ingredient = {
  id: string;
  name: string;
  category: IngredientCategoryId;
  purchaseUnit: Unit;
  baseQuantity: number;
  defaultRecipeUnit: Unit;
};

export type Recipe = {
  id: string;
  name: string;
  servings: number;
  prepMinutes: number;
  cookMinutes: number;
  ingredients: IngredientEntry[];
};

export type IngredientEntry = Ingredient & {
  unit: Unit;
  amount: number;
};
