import { memo } from "react";
import { Food } from "../../services/foodData";
import { Button, Col, Flex, Row, Typography } from "antd";
import QuantityInput from "../QuantityInput";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

type FoodInfoProps = {
  food: Food;
  handleQuantityChange: (quantity: number) => void;
};

export default memo(function FoodInfo({ food, handleQuantityChange }: FoodInfoProps) {
  const navigate = useNavigate();
  return (
    <Row gutter={24} id="food-hero">
      <Col xs={24} md={12} id="banner-container">
        <img id="banner" src={food?.src} alt={food?.name} />
      </Col>
      <Col xs={24} md={12} id="food-info" className="customize-section-md">
        <div className="food-main">
          <Title level={3} className="food-title">
            {food?.id}. {food?.name}
          </Title>
          <Text className="food-description">{food?.description}</Text>
          <Button
            type="text"
            id="return-order"
            onClick={() => {
              navigate("..");
            }}
          >
            {<LeftOutlined />} Return Ordering
          </Button>

          <Flex align="center" justify="space-between">
            <Title level={4} className="customize-base-price" style={{ marginTop: 8 }}>
              {food?.price.toFixed(2)}
            </Title>
            <QuantityInput onChange={handleQuantityChange} />
          </Flex>
        </div>
      </Col>
    </Row>
  );
});
