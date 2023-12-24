import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Food } from "../services/foodData";
import { Flex, Radio, Space, Typography } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import FoodInfo from "../components/CustomizeFood/FoodInfo";
import CustomizeSection from "../components/CustomizeFood/CustomizeSection";
import TakeawaySection from "../components/CustomizeFood/TakeawaySection";
import RemarksSection from "../components/CustomizeFood/RemarksSection";
import FooterSection from "../components/CustomizeFood/FooterSection";
import "./css/CustomizeFood.css";
import { calculateFoodEntryPrice, foodEntryIsValid, isEqual } from "../services/foodEntryServices";
import { getCategory, getCustomizationsForFood, getFood } from "../services/foodDataServices";
import NotificationContext from "../context/NotificationContext";
import useLocalStorage from "../hooks/useLocalStorage";

const { Text } = Typography;

type CustomizeEntry = {
  id: number;
  value: string;
};

export type FoodEntry = {
  foodId: string;
  quantity: number;
  customization: CustomizeEntry[];
  isTakeaway: boolean;
  remarks: string[];
};

export default function CustomizeFood() {
  const { seatId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const api = useContext(NotificationContext);
  const foodId = searchParams.get("food");
  const food: Food | undefined = getFood(foodId!);
  const [cart, setCart] = useLocalStorage<FoodEntry[]>("cart", []);

  useEffect(() => {
    if (food === undefined) {
      navigate("/not-found", { replace: true });
    }
  }, [food, foodId]);

  const foodCategory = useMemo(() => (food ? getCategory(food.categoryId) : undefined), []);
  const customizations = useMemo(() => (food ? getCustomizationsForFood(food) : []), []);

  const defaultCustomizationValues = useMemo(() => {
    return customizations.reduce<CustomizeEntry[]>((acc, current) => {
      if (current.value.length > 0) {
        acc.push({ id: current.id, value: current.value[0].name });
      }
      return acc;
    }, []);
  }, [customizations]);

  const handleAddCart = async () => {
    if (foodEntryIsValid(foodEntry)) {
      const existingEntryIndex = cart.findIndex(
        (cartEntry) => isEqual(cartEntry, foodEntry) && cartEntry.foodId === foodEntry.foodId
      );

      if (existingEntryIndex !== -1) {
        const updatedCart = [...cart];
        const existingRemarks = updatedCart[existingEntryIndex].remarks;
        const newRemarks = Array.isArray(foodEntry.remarks)
          ? foodEntry.remarks
          : [foodEntry.remarks];

        updatedCart[existingEntryIndex].quantity += foodEntry.quantity;
        updatedCart[existingEntryIndex].remarks = [...existingRemarks, ...newRemarks].filter(
          (remark) => remark
        );

        await setCart(updatedCart);
      } else {
        const remarksArray = Array.isArray(foodEntry.remarks)
          ? foodEntry.remarks
          : [foodEntry.remarks];

        await setCart([...cart, { ...foodEntry, remarks: remarksArray }]);
      }

      navigate("/" + seatId);

      api?.success({
        message: "Food Added To Cart",
        description: `You have added ${food?.name} to the cart successfully!`,
        duration: 2.5,
        placement: "top",
      });
    } else {
      api?.error({
        message: "Food Not Added To Cart",
        description: `There is some error due to false data modifications!`,
        duration: 2.5,
        placement: "top",
      });
    }
  };

  const handleCustomizationChange = useCallback(
    (customizationId: number, selectedValue: string) => {
      console.log(customizationId, selectedValue);
      setFoodEntry((prev) => {
        const updatedCustomization = [...prev.customization];
        const customizationIndex = updatedCustomization.findIndex((c) => c.id === customizationId);
        if (customizationIndex >= 0) {
          updatedCustomization[customizationIndex] = {
            ...updatedCustomization[customizationIndex],
            value: selectedValue,
          };
        } else {
          updatedCustomization.push({ id: customizationId, value: selectedValue });
        }
        return { ...prev, customization: updatedCustomization };
      });
    },
    []
  );

  const [foodEntry, setFoodEntry] = useState<FoodEntry>({
    foodId: food ? food.id : "",
    quantity: 1,
    customization: defaultCustomizationValues,
    isTakeaway: false,
    remarks: [],
  });

  const handleQuantityChange = useCallback((quantity: number) => {
    setFoodEntry((prev) => ({ ...prev, quantity }));
  }, []);

  const handleTakeawayChange = useCallback((e: CheckboxChangeEvent) => {
    setFoodEntry((prev) => ({ ...prev, isTakeaway: e.target.checked }));
  }, []);

  const handleRemarksChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFoodEntry((prev) => ({ ...prev, remarks: [e.target.value] }));
  }, []);
  console.log(foodEntry);

  return (
    <div className="container flex-container customize-container">
      <FoodInfo food={food!} seatId={seatId!} handleQuantityChange={handleQuantityChange} />

      {customizations.map((customization) => (
        <CustomizeSection title={customization.name} key={customization.id}>
          <Radio.Group
            defaultValue={foodEntry.customization.find((c) => c.id === customization.id)?.value}
            style={{ width: "100% " }}
            onChange={(e) => handleCustomizationChange(customization.id, e.target.value)}
          >
            <Space direction="vertical" size={14} style={{ width: "100% " }}>
              {customization.value.map((value, index) => (
                <Flex key={index}>
                  <Radio value={value.name} style={{ flex: "1" }}>
                    {value.name}
                  </Radio>
                  <Text>+ {value.priceDiffer.toFixed(2)}</Text>
                </Flex>
              ))}
            </Space>
          </Radio.Group>
        </CustomizeSection>
      ))}

      <TakeawaySection foodCategory={foodCategory!} handleTakeawayChange={handleTakeawayChange} />
      <RemarksSection handleRemarksChange={handleRemarksChange} />

      <FooterSection price={calculateFoodEntryPrice(foodEntry)} onAddCart={handleAddCart} />
    </div>
  );
}
