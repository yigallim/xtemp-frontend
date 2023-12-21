import { useEffect } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Customize, Food, getCustomizationsForFood, getFoods } from "../services/foodData";
import { Button, Col, Flex, Radio, Row, Space, Typography } from "antd";

import "./css/CustomizeFood.css";
import QuantityInput from "../components/QuantityInput";
import { LeftOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function CustomizeFood() {
  const { seatId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const foods: Food[] = getFoods();

  const foodQueryParam = searchParams.get("food");
  const food = foods.find((food) => food.id === foodQueryParam);
  const customizations: Customize[] = getCustomizationsForFood(food!);

  console.log(customizations);
  useEffect(() => {
    if (!food) {
      navigate("/not-found", { replace: true });
    }
  }, [food, navigate]);

  return (
    <div className="container flex-container customize-container">
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
                navigate(-1);
              }}
            >
              {<LeftOutlined />} Return Ordering
            </Button>
            <Flex align="center" justify="space-between">
              <Title level={4} className="customize-base-price" style={{ marginTop: 8 }}>
                {food?.price.toFixed(2)}
              </Title>
              <QuantityInput />
            </Flex>
          </div>
        </Col>
      </Row>
      {customizations.map((customization) => (
        <CustomizeSection title={customization.name} key={customization.id}>
          <Radio.Group>
            <Space direction="vertical" size={14}>
              {customization.value.map((_, i) => (
                <Radio value={i} key={i}>
                  Option A
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </CustomizeSection>
      ))}
    </div>
  );
}

type CustomizeSectionProps = {
  title: string;
  children: React.ReactNode;
};

function CustomizeSection({ title, children }: CustomizeSectionProps) {
  return (
    <div className="customize-section">
      <div className="customize-section-title">
        <Text strong style={{ fontSize: 16, lineHeight: "1em" }}>
          {title}
        </Text>
      </div>
      <div className="customize-section-body">{children}</div>
    </div>
  );
}
