import { FoodEntry } from "../pages/CustomizeFood";
import { getCustomizationPrice, getFood, getTakeawayCharge } from "./foodDataServices";

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
