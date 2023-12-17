import { Row, Col, Typography } from "antd";
import { CompanyData, getCompanyData } from "../services/companyData";
import { Food, getFoods } from "../services/foodData";
import "./css/Ordering.css";

const { Title, Paragraph } = Typography;

export default function Ordering() {
  const restaurantInfo: CompanyData = getCompanyData();
  const foods: Food[] = getFoods();

  return (
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

      <Row gutter={[24, 18]} style={{ marginTop: 16 }}>
        {foods.map((item) => {
          return (
            <Col xs={24} md={12} key={item.id}>
              <div className="food-item">
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
    </div>
  );
}
