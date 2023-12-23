import { memo } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Footer from "../Footer";
import { Flex, Typography } from "antd";

const { Text } = Typography;

export default memo(function FooterSection() {
  return (
    <Footer>
      <Flex vertical justify="center" className="table-no">
        <Text>Total Charges</Text>
        <Text strong style={{ fontSize: 16 }}>
          100.10
        </Text>
      </Flex>
      <Flex className="cart-line" flex={1} align="center" justify="space-between">
        <Text strong className="cart-price">
          Press To Add To Cart
        </Text>
        <span>
          <ShoppingCartOutlined style={{ fontSize: 20 }} />
        </span>
      </Flex>
    </Footer>
  );
});
