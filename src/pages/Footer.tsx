import { SettingOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Flex, Typography } from "antd";

const { Text } = Typography;

export default function Footer() {
  return (
    <footer id="bottom-bar">
      <Flex
        style={{ paddingBlock: 10, paddingInline: "14px 12px", alignItems: "stretch" }}
        align="center"
        flex={1}
      >
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
          <Text strong className="cart-price">
            RM20.00
          </Text>
          <span>
            <ShoppingCartOutlined style={{ fontSize: 20 }} />
          </span>
        </Flex>
      </Flex>
    </footer>
  );
}
