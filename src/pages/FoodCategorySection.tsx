import { Row, Col, Typography } from "antd";
import { Food } from "../services/foodData";
const { Title, Text } = Typography;

type FoodCategorySectionProps = {
  categoryName: string;
  categoryId: number;
  foodItems: Food[];
  onFoodItemClick: (itemId: string) => void;
};

export default function FoodCategorySection({
  categoryName,
  categoryId,
  foodItems,
  onFoodItemClick,
}: FoodCategorySectionProps) {
  return (
    <>
      <Title level={4} id={`category-${categoryId}`}>
        {categoryName}
      </Title>
      <Row gutter={[24, 18]} style={{ marginBottom: 48 }}>
        {foodItems.map((item) => {
          return (
            <Col xs={24} md={12} key={item.id}>
              <div className="food-item" onClick={() => onFoodItemClick(item.id)}>
                <img alt={item.name} src={item.src} />
                <div className="food-main">
                  <Title level={5} style={{ marginBottom: "0.25em" }} className="food-title">
                    {item.id}. {item.name}
                  </Title>
                  <Text className="food-description">{item.description}</Text>
                </div>
                <div className="food-price">{item.price.toFixed(2)}</div>
              </div>
            </Col>
          );
        })}
      </Row>
    </>
  );
}
