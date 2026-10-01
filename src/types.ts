export type Category = {
  id: IngredientCategoryId;
  name: string;
  color: string;
};

export const IngredientCategories = [
  "dairy",
  "protein",
  "produce_fresh",
  "produce_frozen",
  "canned",
  "grains",
  "baking",
  "oils",
  "condiments",
  "broths",
  "beans",
  "nuts",
  "bread",
  "spices",
  "breakfast",
  "snacks",
];

export type IngredientCategoryId = (typeof IngredientCategories)[number];

export const Units = [
  // Mass
  "oz",
  "lb",
  // Volume
  "tsp",
  "tbsp",
  "cup",
  "pt",
  "qt",
  "gal",
  // Count / individual items
  "count",
  // Special/package units
  "can",
  "jar",
  "bottle",
  "bag",
  "box",
  "package",
  "packet",
  "bunch",
  "head",
  "loaf",
  "ear",
  "bulb",
  "stalk",
  "clove",
  "leaf",
  "fillet",
  "container",
  // Recipe-specific units
  "slice",
  // Fallback for unusual ingredients
  "other",
];

export type Unit = (typeof Units)[number];

export type Ingredient = {
  id: string;
  name: string;
  category: IngredientCategoryId;
  purchaseUnit: Unit;
  baseQuantity: number;
  defaultRecipeUnit: Unit;
};

export type Recipe = {
  name: string;
  servings: number;
  prepMinutes: number;
  cookMinutes: number;
  ingredients: IngredientEntry[];
  instructions: string[];
  notes: string;
  tags: string[];
};

export type IngredientEntry = Ingredient & {
  unit: Unit;
  amount: number;
};
