import { Typography } from "antd";
const { Text } = Typography;

type CustomizeSectionProps = {
  title: string;
  children: React.ReactNode;
};

export default function CustomizeSection({ title, children }: CustomizeSectionProps) {
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
