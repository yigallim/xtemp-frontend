import { Flex } from "antd";
import "./css/Footer.css";

type FooterProps = {
  children: React.ReactNode;
};

export default function Footer({ children }: FooterProps) {
  return (
    <footer id="bottom-bar">
      <Flex align="center" flex={1} gap={8}>
        {children}
      </Flex>
    </footer>
  );
}
