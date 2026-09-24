import { Category, Ingredient } from "@/types";
import Constants from "expo-constants";

const hostUri = Constants.expoConfig?.hostUri;
const hostIp = hostUri ? hostUri.split(":")[0] : "localhost";
const baseUrl = `http://${hostIp}:3000`;

type TRequestsType = {
  getAllIngredients: () => Promise<Ingredient[]>;
  getCategories: () => Promise<Category[]>;
};

export const Requests: TRequestsType = {
  getAllIngredients: async () => {
    const response = await fetch(`${baseUrl}/ingredients`);
    if (!response.ok) {
      throw new Error("Failed to fetch ingredients list");
    }

    return response.json();
  },
  getCategories: async () => {
    const response = await fetch(`${baseUrl}/categories`);
    if (!response.ok) {
      throw new Error("Failed to fetch category list");
    }

    return response.json();
  },
};
