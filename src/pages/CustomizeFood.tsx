import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  Customize,
  Food,
  getCategoryForFood,
  getCustomizationsForFood,
  getFoods,
} from "../services/foodData";
import { Flex, Radio, Space, Typography } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import FoodInfo from "../components/CustomizeFood/FoodInfo";
import CustomizeSection from "../components/CustomizeFood/CustomizeSection";
import TakeawaySection from "../components/CustomizeFood/TakeawaySection";
import RemarksSection from "../components/CustomizeFood/RemarksSection";
import FooterSection from "../components/CustomizeFood/FooterSection";
import "./css/CustomizeFood.css";

const { Text } = Typography;

type CustomizeEntry = {
  id: number;
  value: string;
};

type FoodEntry = {
  foodId: string;
  quantity: number;
  customization: CustomizeEntry[];
  isTakeaway: boolean;
  remarks: string;
};

export default function CustomizeFood() {
  const { seatId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const foods: Food[] = getFoods();

  const foodQueryParam = searchParams.get("food");
  const food = useMemo(() => foods.find((food) => food.id === foodQueryParam), []);
  const foodCategory = useMemo(() => getCategoryForFood(food!), []);
  const customizations: Customize[] = getCustomizationsForFood(food!);

  const defaultCustomizationValues = useMemo(() => {
    return customizations.reduce<CustomizeEntry[]>((acc, current) => {
      if (current.value.length > 0) {
        acc.push({ id: current.id, value: current.value[0].name });
      }
      return acc;
    }, []);
  }, [customizations]);

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
    foodId: food!.id,
    quantity: 1,
    customization: defaultCustomizationValues,
    isTakeaway: false,
    remarks: "",
  });

  const handleQuantityChange = useCallback((quantity: number) => {
    setFoodEntry((prev) => ({ ...prev, quantity }));
  }, []);

  const handleTakeawayChange = useCallback((e: CheckboxChangeEvent) => {
    setFoodEntry((prev) => ({ ...prev, isTakeaway: e.target.checked }));
  }, []);

  const handleRemarksChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFoodEntry((prev) => ({ ...prev, remarks: e.target.value }));
  }, []);

  console.log(foodEntry);

  useEffect(() => {
    if (!food) {
      navigate("/not-found", { replace: true });
    }
  }, [food, navigate]);

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

      <FooterSection />
    </div>
  );
}
