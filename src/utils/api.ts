import { Category, Ingredient, IngredientEntry, Recipe } from "@/types";
import Constants from "expo-constants";

const hostUri = Constants.expoConfig?.hostUri;
const hostIp = hostUri ? hostUri.split(":")[0] : "localhost";
const baseUrl = `http://${hostIp}:3000`;
const HEADERS = {
  "Content-Type": "application/json",
  "Cache-Control": "no-cache, no-store, must-revalidate",
  "Pragma": "no-cache",
  "Expires": "0",
};

type TRequestsType = {
  getAllIngredients: () => Promise<Ingredient[]>;
  getIngredientsByCategory: (categoryId: string) => Promise<Ingredient[]>;
  getCategories: () => Promise<Category[]>;
  getInventory: () => Promise<IngredientEntry[]>;
  addToInventory: (ingredient: IngredientEntry) => Promise<IngredientEntry>;
  removeFromInventory: (ingredientId: string[]) => Promise<IngredientEntry[]>;
  getAllRecipes: () => Promise<Recipe[]>;
  // getRecipesByTag: (tags: string[]) => Promise<Recipe[]>;
  // getRecipeByName: (name: string) => Promise<Recipe>;
  // addRecipe: (recipe: Recipe) => Promise<Recipe>;
};

export const Requests: TRequestsType = {
  getAllIngredients: async () => {
    const response = await fetch(`${baseUrl}/ingredients`);
    if (!response.ok) {
      throw new Error("Failed to fetch ingredients list");
    }

    return response.json();
  },
  getIngredientsByCategory: async (categoryId: string) => {
    const response = await fetch(
      `${baseUrl}/ingredients?category=${categoryId}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch ingredients");
    }

    return response.json();
  },
  getCategories: async () => {
    const response = await fetch(`${baseUrl}/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch category list");
    }

    return response.json();
  },
  getInventory: async () => {
    const response = await fetch(`${baseUrl}/inventory`, {
      method: "GET",
      headers: HEADERS,
    });
    if (!response.ok) {
      throw new Error("Failed to fetch inventory");
    }

    return response.json();
  },
  addToInventory: async (ingredient: IngredientEntry) => {
    const response = await fetch(`${baseUrl}/inventory`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(ingredient),
    });
    if (!response.ok) {
      throw new Error("Unable to add to Inventory");
    }

    return response.json();
  },
  removeFromInventory: async (ingredientIds: string[]) => {
    if (ingredientIds.length < 1) return [];

    const fetches = ingredientIds.map((id) =>
      fetch(`${baseUrl}/inventory/${id}`, {
        method: "DELETE",
        headers: HEADERS,
      }),
    );
    const resposnes = await Promise.all(fetches);
    const ok = resposnes.every(({ ok }) => ok);

    if (!ok) {
      throw new Error(
        "Failed to remove items: " + resposnes.find(({ ok }) => !ok),
      );
    }

    return Requests.getInventory();
  },
  getAllRecipes: async () => {
    const response = await fetch(`${baseUrl}/recipes`);

    if (!response.ok) {
      throw new Error("Failed to retrieve recipes");
    }
    return response.json();
  },
  // getRecipesByTag: async (tags: string[]) => {},
  // getRecipeByName: async (name: string) => {},
  // addRecipe: async (recipe: Recipe) => {},
};
