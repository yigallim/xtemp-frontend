import useLocalStorage from "../hooks/useLocalStorage";
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

export function isEqual(entry1: FoodEntry, entry2: FoodEntry): boolean {
  // Compare foodId
  if (entry1.foodId !== entry2.foodId) {
    return false;
  }

  // Compare isTakeaway
  if (entry1.isTakeaway !== entry2.isTakeaway) {
    return false;
  }

  // Compare customization arrays deeply
  if (entry1.customization.length !== entry2.customization.length) {
    return false;
  }

  const sortedCustomization1 = [...entry1.customization].sort((a, b) => a.id - b.id);
  const sortedCustomization2 = [...entry2.customization].sort((a, b) => a.id - b.id);

  for (let i = 0; i < sortedCustomization1.length; i++) {
    if (
      sortedCustomization1[i].id !== sortedCustomization2[i].id ||
      sortedCustomization1[i].value !== sortedCustomization2[i].value
    ) {
      return false;
    }
  }
  return true;
}

export function calculateCartPrice() {
  const [cart, setCart] = useLocalStorage<FoodEntry[]>("cart", []);

  // Filter out invalid entries and calculate the total price
  const validCart = cart.filter(foodEntryIsValid);
  const totalPrice = validCart.reduce((total, foodEntry) => {
    return total + calculateFoodEntryPrice(foodEntry);
  }, 0);

  // Update the cart in LocalStorage if any entries were removed
  if (validCart.length !== cart.length) {
    setCart(validCart);
  }

  return totalPrice;
}
