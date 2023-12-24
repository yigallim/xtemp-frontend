export type CustomizeValue = {
  name: string;
  priceDiffer: number;
};

export type Customize = {
  id: number;
  name: string;
  value: CustomizeValue[];
};

export type FoodCategory = {
  id: number;
  name: string;
  customizeId: number[];
  takeawayCharge: number;
};

export type Food = {
  id: string;
  name: string;
  categoryId: number;
  src: string;
  description: string;
  price: number;
};

const sizeCustomize1: Customize = {
  id: 1,
  name: "Size",
  value: [
    { name: "Small", priceDiffer: 0 },
    { name: "Medium", priceDiffer: 1.5 },
    { name: "Large", priceDiffer: 3 },
  ],
};

const sizeCustomize2: Customize = {
  id: 2,
  name: "Size",
  value: [
    { name: "Small", priceDiffer: 0 },
    { name: "Large", priceDiffer: 2 },
  ],
};

const drinkCustomize: Customize = {
  id: 3,
  name: "Temperature",
  value: [
    { name: "Hot", priceDiffer: 0 },
    { name: "Iced", priceDiffer: 0.5 },
  ],
};

export function getCustomizations(): Customize[] {
  return [sizeCustomize1, sizeCustomize2, drinkCustomize];
}

export function getFoodCategories(): FoodCategory[] {
  return [
    { id: 1, name: "APPETIZER", customizeId: [2], takeawayCharge: 0.3 },
    { id: 2, name: "RAMEN", customizeId: [1], takeawayCharge: 0.5 },
    { id: 3, name: "JAPANESE CHUKA CUISINE", customizeId: [1], takeawayCharge: 0.5 },
    { id: 4, name: "DRINKS", customizeId: [2, 3], takeawayCharge: 0.3 },
  ];
}

export function getFoods(): Food[] {
  return [
    {
      id: "A1",
      name: "Pork Dumpling",
      categoryId: 1,
      description: "Pork meat, Chives, Cabbage, Wine, Seasoning with Shikomi Soy Sauce",
      price: 6.99,
      src: "/img/A1.png",
    },
    {
      id: "A2",
      name: "Gyokai Fried Chicken",
      categoryId: 1,
      description: "Deep Fried Chicken, Marinated with Gyokai Shoyu Sauce",
      price: 9.99,
      src: "/img/A2.png",
    },
    {
      id: "A3",
      name: "Takoyaki",
      categoryId: 1,
      description: "Octopus, tempura scraps, and green onions",
      price: 6.99,
      src: "/img/A3.png",
    },
    {
      id: "A4",
      name: "Fried Squid Tentacles",
      categoryId: 1,
      description:
        "Deep Fried Tentacles marinated with Japanese Sauce and served with Lemon & Mayo",
      price: 6.99,
      src: "/img/A4.png",
    },
    {
      id: "A5",
      name: "Hot Light Pickled",
      categoryId: 1,
      description: "Long Cabbage Pickled with Japanese Hot Chili Paste",
      price: 5.99,
      src: "/img/A5.png",
    },
    {
      id: "A6",
      name: "Japanese Chicken Breast Salad",
      categoryId: 1,
      description: "Sous Vide Chicken Meat, Cucumber, Tomato dressed with Sesame Sauce",
      price: 12.99,
      src: "/img/A6.png",
    },
    {
      id: "R1",
      name: "Hakata Tonkotsu Ramen",
      categoryId: 2,
      description:
        "Pork Charsiu, Pickles, Boiled Egg, Black Fungus, Onion, Spicy Miso. *Pork Soup Base",
      price: 19.99,
      src: "/img/R1.png",
    },
    {
      id: "R2",
      name: "Goku No Mixed Dry Soba",
      categoryId: 2,
      description:
        "Premium Egg Yolk, Spicy Meat Paste, Pork Charsiu, Pickles, Fish Paste, Seaweed, Onion. *A Touch of Fish Soup Base",
      price: 15.99,
      src: "/img/R2.png",
    },
    {
      id: "R3",
      name: "Gyokai Shoyu Ramen",
      categoryId: 2,
      description:
        "Sous Vide Chicken & Pork Charsiu, Bamboo Shoot, Boiled Egg, Onion. Chicken & Fish Soup Base",
      price: 17.5,
      src: "/img/R3.png",
    },
    {
      id: "R4",
      name: "Black Magic Ramen",
      categoryId: 2,
      description: "Sous Vide Pork Charsiu, Mackerel Can Meat, Fish Powder, Black Fungus.",
      price: 21.5,
      src: "/img/R4.png",
    },
    {
      id: "R5",
      name: "Premium Tonkotsu Ramen",
      categoryId: 2,
      description:
        "2 type of charsius, smoked duck, mini oyster,boiled egg, veggie,onion and seaweed",
      price: 26.99,
      src: "/img/R5.png",
    },
    {
      id: "C1",
      name: "Stamina Happosai",
      categoryId: 3,
      description: "Pork Meat, Shrimp, Squid, Quail Egg, Fungus, Bamboo Shoot, Shitake & Veggie",
      price: 18.6,
      src: "/img/C1.png",
    },
    {
      id: "C2",
      name: "Kara Shibire Spicy Tofu",
      categoryId: 3,
      description: "Pork Mince Miso, Tofu, Spicy Hot Sace, Onion",
      price: 12.99,
      src: "/img/C2.png",
    },
    {
      id: "C3",
      name: "Japanese Sweet and Sour Fish",
      categoryId: 3,
      description: "Fried-Fish cooked with Sour Shoyu",
      price: 25.99,
      src: "/img/C3.png",
    },
    {
      id: "C4",
      name: "Namban Fried Chicken",
      categoryId: 3,
      description: "Deep Fried Chicken, Marinated with Namban Sauce served with Tartar Sauce",
      price: 15.5,
      src: "/img/C4.png",
    },
    {
      id: "D1",
      name: "Hojicha",
      categoryId: 4,
      description: "",
      price: 4.5,
      src: "/img/D1.png",
    },
    {
      id: "D2",
      name: "Milky Coco",
      categoryId: 4,
      description: "",
      price: 8.99,
      src: "/img/D2.png",
    },
    {
      id: "D3",
      name: "Yuzu Honey",
      categoryId: 4,
      description: "",
      price: 5.5,
      src: "/img/D3.png",
    },
    {
      id: "D4",
      name: "Honey Lemon",
      categoryId: 4,
      description: "",
      price: 5.5,
      src: "/img/D4.png",
    },
    {
      id: "D5",
      name: "Sky Juice Water",
      categoryId: 4,
      description: "",
      price: 1.5,
      src: "/img/D5.png",
    },
  ];
}


