import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  Customize,
  Food,
  getCategoryForFood,
  getCustomizationsForFood,
  getFoods,
} from "../services/foodData";
import { Button, Col, Flex, Radio, Row, Space, Typography, Checkbox } from "antd";

import "./css/CustomizeFood.css";
import QuantityInput from "../components/QuantityInput";
import { LeftOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import Footer from "../components/Footer";

const { Title, Text } = Typography;

export default function CustomizeFood() {
  const { seatId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const foods: Food[] = getFoods();

  const foodQueryParam = searchParams.get("food");
  const food = foods.find((food) => food.id === foodQueryParam);
  const foodCategory = getCategoryForFood(food!);
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
                navigate("/" + seatId);
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
          <Radio.Group style={{ width: "100% " }}>
            <Space direction="vertical" size={14} style={{ width: "100% " }}>
              {customization.value.map((value, index) => (
                <Flex key={index}>
                  <Radio value={index} style={{ flex: "1" }}>
                    {value.name}
                  </Radio>
                  <Text>+ {value.priceDiffer.toFixed(2)}</Text>
                </Flex>
              ))}
            </Space>
          </Radio.Group>
        </CustomizeSection>
      ))}
      <CustomizeSection title="Takeaway">
        <Flex>
          <Checkbox style={{ userSelect: "none", flex: "1" }}>Takeaway Charge</Checkbox>
          <Text>+ {foodCategory?.takeawayCharge.toFixed(2)}</Text>
        </Flex>
      </CustomizeSection>
      <CustomizeSection title="Remarks">
        <TextArea
          showCount
          allowClear
          placeholder="Write something here..."
          bordered={false}
          autoSize={{ minRows: 3, maxRows: 5 }}
          maxLength={100}
          style={{ marginBottom: "18px" }}
        />
      </CustomizeSection>
      <Footer>
        a
      </Footer>
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
        <Text strong style={{ lineHeight: "1em" }}>
          {title}
        </Text>
      </div>
      <div className="customize-section-body">{children}</div>
    </div>
  );
}
