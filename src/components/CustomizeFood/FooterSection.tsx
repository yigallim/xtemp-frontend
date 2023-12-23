import { memo } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Footer from "../Footer";
import { Flex, Typography } from "antd";

const { Text } = Typography;

type FooterSection = {
  price: number;
};

export default memo(function FooterSection({ price }: FooterSection) {
  return (
    <Footer>
      <Flex vertical justify="center" className="table-no">
        <Text>Total Charges</Text>
        <Text strong style={{ fontSize: 16 }}>
          {price.toFixed(2)}
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
