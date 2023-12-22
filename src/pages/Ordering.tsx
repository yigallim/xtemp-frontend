import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, Typography, Anchor, Empty, Input, Button, Flex } from "antd";
import { RetailData, getRetailData, getRetailSeats } from "../services/companyData";
import { Food, getFoods, FoodCategory, getFoodCategories } from "../services/foodData";
import Footer from "../components/Footer";
import FoodCategorySection from "./FoodCategorySection";
import "./css/Ordering.css";
import ChangeSeat from "../components/ChangeSeat";
import { SettingOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

export default function Ordering() {
  const navigate = useNavigate();
  const { seatId } = useParams();
  const seats = getRetailSeats();

  useEffect(() => {
    if (!seats.includes(seatId?.split("order-")[1]!)) navigate("/not-found", { replace: true });
  }, [seatId, seats]);

  const restaurantInfo: RetailData = getRetailData();
  const foods: Food[] = getFoods();
  const categories: FoodCategory[] = getFoodCategories();
  const topRef = useRef<HTMLDivElement>(null);
  const [targetOffset, setTargetOffset] = useState<number>();
  const [filteredFoods, setFilteredFoods] = useState<Food[]>(foods);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setTargetOffset(topRef.current?.clientHeight);
  }, []);

  const groupedFoods = useMemo(() => {
    const categoryMap: { [key: number]: string } = {};
    categories.forEach((category) => {
      categoryMap[category.id] = category.name;
    });

    const grouped: { [key: string]: Food[] } = {};
    filteredFoods.forEach((food) => {
      const categoryName = categoryMap[food.categoryId];
      if (!grouped[categoryName]) {
        grouped[categoryName] = [];
      }
      grouped[categoryName].push(food);
    });

    return grouped;
  }, [filteredFoods, categories]);

  const anchorItems = useMemo(() => {
    return categories.map((category) => ({
      key: `category-${category.id}`,
      href: `#category-${category.id}`,
      title: category.name,
    }));
  }, [categories]);

  const onFoodItemClick = (key: string) => {
    navigate(`customize?food=${key}`);
  };

  const onSearch = (value: string) => {
    if (value) {
      const searchValue = value.toLowerCase();
      const filtered = foods.filter((food) => food.name.toLowerCase().includes(searchValue));
      setFilteredFoods(filtered);
    } else {
      setFilteredFoods(foods);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (targetSeat: string) => {
    navigate(`/order-${targetSeat}`, { replace: true });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container flex-container">
      <Row gutter={24} id="company-hero">
        <Col xs={24} md={12} id="banner-container">
          <img id="banner" src={restaurantInfo.image} alt={restaurantInfo.name} />
        </Col>
        <Col xs={24} md={12} id="company-info">
          <div>
            <Title level={2}>{restaurantInfo.name}</Title>
            <Paragraph>
              <strong>Contact :</strong> {restaurantInfo.contact}
            </Paragraph>
            <Paragraph>
              <strong>Location :</strong> {restaurantInfo.location}
            </Paragraph>
            <Paragraph>{restaurantInfo.description}</Paragraph>
          </div>
        </Col>
      </Row>
      <div id="navigation" ref={topRef}>
        <div>
          <Search
            placeholder="Search food name..."
            allowClear
            onSearch={onSearch}
            style={{ marginBottom: 8 }}
          />
          <Anchor targetOffset={targetOffset} direction="horizontal" items={anchorItems} replace />
        </div>
      </div>

      <section id="menu">
        {filteredFoods.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No Food Record."
            style={{ minHeight: 200, paddingTop: 30 }}
          />
        ) : (
          Object.keys(groupedFoods).map((key) => {
            const categoryId = categories.find((category) => category.name === key)?.id;
            return (
              <FoodCategorySection
                key={key}
                categoryName={key}
                categoryId={categoryId!}
                foodItems={groupedFoods[key]}
                onFoodItemClick={onFoodItemClick}
              />
            );
          })
        )}
      </section>

      <Footer>
        <Button
          className="seat-button"
          type="text"
          icon={<SettingOutlined style={{ fontSize: 20 }} />}
          onClick={showModal}
        ></Button>
        <Flex vertical justify="center" className="table-no">
          <Text>Table No.</Text>
          <Text strong>{seatId?.split("order-")[1]!}</Text>
        </Flex>
        <Flex className="cart-line" flex={1} align="center" justify="space-between">
          <Text strong className="cart-price">
            RM20.00
          </Text>
          <span>
            <ShoppingCartOutlined style={{ fontSize: 20 }} />
          </span>
        </Flex>
      </Footer>

      <ChangeSeat isOpen={isModalOpen} onOk={handleOk} onCancel={handleCancel} />
    </div>
  );
}
