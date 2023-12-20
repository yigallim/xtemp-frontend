import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Food, getFoods } from "../services/foodData";
import { Col, Flex, InputNumber, Row, Typography } from "antd";

import "./css/CustomizeFood.css";

const { Title, Text } = Typography;

export default function CustomizeFood() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const foods: Food[] = getFoods();

  const foodQueryParam = searchParams.get("food");
  const food = foods.find((food) => food.id === foodQueryParam);

  const onQuantityChange = ( value : any ) => {
    console.log(value);
  }

  useEffect(() => {
    if (!food) {
      navigate("/not-found", { replace: true });
    }
  }, [food, navigate]);

  return (
    <div className="container flex-container">
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
            <Flex align="center" justify="space-between">
              <Title level={4} className="customize-base-price" style={{ marginTop: 8 }}>
                {food?.price.toFixed(2)}
              </Title>
              <InputNumber min={1} max={10} defaultValue={1} onChange={onQuantityChange} style={{ maxWidth: 70}}/>
            </Flex>
          </div>
        </Col>
      </Row>
    </div>
  );
}
