import React, { Fragment } from "react";
import { FoodEntry } from "../../pages/CustomizeFood";
import { Button, Flex, Typography } from "antd";
import { getCustomization, getFood } from "../../services/foodDataServices";
import { calculateFoodEntryPrice } from "../../services/foodEntryServices";
import { DeleteOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

type CartEntryProps = {
  foodEntry: FoodEntry;
  onDelete: (id : string) => void;
};

export default function CartEntry({ foodEntry, onDelete }: CartEntryProps) {
  const food = getFood(foodEntry.foodId);

  return (
    <Flex className="cart-entry">
      <Text strong className="cart-entry-quantity">
        x{foodEntry.quantity}
      </Text>
      <div className="cart-entry-desc">
        <Title level={5}>{food!.name}</Title>
        {foodEntry.customization.map((customization) => {
          const customize = getCustomization(customization.id);
          return (
            <Fragment key={customization.id}>
              <Text>{customize?.name}:</Text>
              <Text type="secondary"> {customization.value}</Text>
              <br />
            </Fragment>
          );
        })}
      </div>
      <Text strong className="cart-price">
        {calculateFoodEntryPrice(foodEntry)}
      </Text>
      <Button
        danger
        type="primary"
        onClick={() => {
          onDelete(foodEntry.id);
        }}
        icon={<DeleteOutlined />}
      ></Button>
    </Flex>
  );
}
