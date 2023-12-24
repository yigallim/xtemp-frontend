import {
  Customize,
  Food,
  FoodCategory,
  getCustomizations,
  getFoodCategories,
  getFoods,
} from "./foodData";

export function getFood(id: string): Food | undefined {
  return getFoods().find((food) => food.id === id);
}

export function getCustomization(id: number): Customize | undefined {
  return getCustomizations().find((customize) => customize.id === id);
}

export function getPriceDifferByName(
  customization: Customize,
  valueName: string
): number | undefined {
  const value = customization.value.find((item) => item.name === valueName);
  return value ? value.priceDiffer : undefined;
}

export function getCategory(id: number): FoodCategory | undefined {
  return getFoodCategories().find((category) => category.id === id);
}

export function getCustomizationPrice(customizationId: number, selectedValue: string): number {
  const customization = getCustomization(customizationId);
  return getPriceDifferByName(customization!, selectedValue) || 0;
}

export function getTakeawayCharge(food: Food): number {
  if (!food) return 0;

  const foodCategories = getFoodCategories();
  const category = foodCategories.find((c) => c.id === food.categoryId);

  return category?.takeawayCharge || 0;
}

export function getCustomizationsForFood(food: Food): Customize[] {
  const category = getCategory(food.categoryId);

  if (!category || !category.customizeId) {
    return [];
  }

  const foodCustomizations = category.customizeId.map((customizeId) =>
    getCustomization(customizeId)
  );

  return foodCustomizations as Customize[];
}
