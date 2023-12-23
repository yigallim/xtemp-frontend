import { memo } from "react";
import { Flex, Checkbox, Typography } from "antd";
import { FoodCategory } from "../../services/foodData";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import CustomizeSection from "./CustomizeSection";

const { Text } = Typography;

type TakeawaySectionProps = {
  foodCategory: FoodCategory;
  handleTakeawayChange: (e: CheckboxChangeEvent) => void;
};

export default memo(function TakeawaySection({
  foodCategory,
  handleTakeawayChange,
}: TakeawaySectionProps) {
  return (
    <CustomizeSection title="Takeaway">
      <Flex>
        <Checkbox onChange={handleTakeawayChange} style={{ userSelect: "none", flex: "1" }}>
          Takeaway Charge
        </Checkbox>
        <Text>+ {foodCategory?.takeawayCharge.toFixed(2)}</Text>
      </Flex>
    </CustomizeSection>
  );
});
