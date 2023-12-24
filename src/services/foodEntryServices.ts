import { FoodEntry } from "../pages/CustomizeFood";
import { getCustomizations } from "./foodData";
import { getCategory, getCustomizationPrice, getFood, getTakeawayCharge } from "./foodDataServices";

export function foodEntryIsValid(foodEntry: FoodEntry) {
  console.log(foodEntry);
  const food = getFood(foodEntry.foodId);
  if (!food) return false;

  const category = getCategory(food.categoryId);
  if (!category) return false;

  const requiredCustomizationIds = new Set(category.customizeId);
  const allCustomizations = getCustomizations();
  const providedCustomizationIds = new Set(foodEntry.customization.map((c) => c.id));

  // Check if the provided customizations match exactly with required customizations
  if (requiredCustomizationIds.size !== providedCustomizationIds.size) {
    return false;
  }

  for (let customization of foodEntry.customization) {
    // Check if customization ID is required
    if (!requiredCustomizationIds.has(customization.id)) {
      return false; // Invalid customization ID
    }

    // Validate the value for each required customization
    const customizationOptions = allCustomizations.find((c) => c.id === customization.id);
    if (!customizationOptions) {
      return false; // Customization type not found in available customizations
    }

    const validValues = new Set(customizationOptions.value.map((v) => v.name));
    if (!validValues.has(customization.value)) {
      return false; // Invalid value for this customization
    }
  }

  return true;
}
export function calculateFoodEntryPrice(foodEntry: FoodEntry) {
  const food = getFood(foodEntry.foodId)!;
  if (food === undefined) return 0;

  const basePrice = food.price;
  let customizationCost = foodEntry.customization.reduce((total, customization) => {
    return total + getCustomizationPrice(customization.id, customization.value);
  }, 0);

  let takeawayCharge = foodEntry.isTakeaway ? getTakeawayCharge(food) : 0;
  let totalPrice = (basePrice + customizationCost + takeawayCharge) * foodEntry.quantity;
  return totalPrice;
}
