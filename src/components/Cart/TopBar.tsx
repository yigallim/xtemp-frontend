import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Flex, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

export default function TopBar() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("..");
  };

  return (
    <>
      <Flex
        align="center"
        style={{ paddingLeft: "8px", borderBottom: "0.8px solid rgb(215, 220, 225)" }}
      >
        <Button
          type="text"
          onClick={handleBackClick}
          icon={<LeftOutlined />}
          style={{ height: 40, width: 40 }}
        />
        <Title level={4} style={{ margin: 0, textAlign: "center", flex: 1 }}>
          <span style={{ transform: "translateX(-28px)", display: "inline-block" }}>CART</span>
        </Title>
      </Flex>
      <Flex
        style={{
          height: 40,
          paddingLeft: 18,
          backgroundColor: "rgb(255, 242, 205)",
          borderBottom: "0.8px solid rgb(215, 220, 225)",
        }}
      >
        <Text strong style={{ lineHeight: "40px" }}>
          HALO RAMEN
        </Text>
      </Flex>
      <Flex
        justify="space-between"
        style={{
          padding: "4px 18px",
          borderBottom: "0.8px solid rgb(215, 220, 225)",
        }}
        align="center"
      >
        <Flex vertical>
          <Text>Table 17</Text>
          <Text type="secondary" style={{ fontSize: 12.5 }}>
            Ordered 0 Item
          </Text>
        </Flex>
        <div style={{ lineHeight: 1, height: "100%" }}>
          <span style={{ marginRight: 4 }}>View Order</span>
          <RightOutlined />
        </div>
      </Flex>
    </>
  );
}
