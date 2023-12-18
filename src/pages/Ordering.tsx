import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Row, Col, Typography, ConfigProvider, Anchor, Empty, Flex, Button } from "antd";
import { Input } from "antd";
const { Search } = Input;
import { CompanyData, getCompanyData } from "../services/companyData";
import { Food, getFoods, FoodCategory, getFoodCategories } from "../services/foodData";
import "./css/Ordering.css";
import { SettingOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

export default function Ordering() {
  const restaurantInfo: CompanyData = getCompanyData();
  const foods: Food[] = getFoods();
  const categories: FoodCategory[] = getFoodCategories();
  const topRef = useRef<HTMLDivElement>(null);
  const [targetOffset, setTargetOffset] = useState<number>();
  const [filteredFoods, setFilteredFoods] = useState<Food[]>(foods);

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
    console.log(key);
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

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "rgb(255, 190, 60)",
        },
      }}
    >
      <div className="container">
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
            <Anchor targetOffset={targetOffset} direction="horizontal" items={anchorItems} />
          </div>
        </div>

        <section id="menu">
          {filteredFoods.length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Food Record." />
          ) : (
            Object.keys(groupedFoods).map((key: string) => {
              const categoryId = categories.find((category) => category.name === key)?.id;
              return (
                <Fragment key={key}>
                  <Title level={4} id={`category-${categoryId}`}>
                    {key}
                  </Title>
                  <Row gutter={[24, 18]} style={{ marginBottom: 48 }}>
                    {groupedFoods[key].map((item) => {
                      return (
                        <Col xs={24} md={12} key={item.id}>
                          <div className="food-item" onClick={() => onFoodItemClick(item.id)}>
                            <img alt={item.name} src={item.src} />
                            <div className="food-main">
                              <p className="food-title">
                                {item.id}. {item.name}
                              </p>
                              <p className="food-description">{item.description}</p>
                            </div>
                            <div className="food-price">{item.price.toFixed(2)}</div>
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                </Fragment>
              );
            })
          )}
        </section>
        <footer id="bottom-bar">
          <Flex style={{ paddingBlock: 10, paddingInline: "14px 12px", alignItems: "stretch" }} align="center" flex={1}>
            <Button
              className="seat-button"
              type="text"
              icon={<SettingOutlined style={{ fontSize: 20 }} />}
            ></Button>
            <Flex vertical>
              <Text className="table-no" keyboard>
                Table No.
              </Text>
              <Text className="table-no" keyboard>
                101
              </Text>
            </Flex>
            <Flex className="cart-line" flex={1} align="center" justify="space-between">
              <Text strong className="cart-price">RM20.00</Text>
              <span>
                <ShoppingCartOutlined style={{ fontSize: 20 }} />
              </span>
            </Flex>
          </Flex>
        </footer>
      </div>
    </ConfigProvider>
  );
}
