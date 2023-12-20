import { useNavigate } from "react-router-dom";
import { Button, Card, Divider, Flex, Form, notification } from "antd";
import { getRetailSeats, getRetailData } from "../services/companyData";
import Meta from "antd/es/card/Meta";
import SelectSeatInput from "../components/SelectSeatInput";
import { useState } from "react";

export default function SelectTable() {
  const [api, contextHolder] = notification.useNotification({
    stack: { threshold: 2 },
    maxCount: 3,
    top: 16,
  });
  const navigate = useNavigate();
  const retailData = getRetailData();
  const [selectedSeat, setSelectedSeat] = useState<string>("");

  const handleFormSubmit = () => {
    console.log(selectedSeat);
    if (getRetailSeats().includes(selectedSeat)) {
      navigate(`/order-${selectedSeat}`);
    } else {
      api["warning"]({
        message: "Warning",
        description: "Please select a proper table number.",
        duration: 2.5,
        placement: "top",
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Flex
        align="center"
        justify="center"
        style={{ width: "100%", height: "92%", paddingInline: 24 }}
      >
        <Card
          hoverable
          cover={<img alt="example" src="/banner.png" style={{ maxHeight: 380 }} />}
          style={{ maxWidth: "550px", width: "100%" }}
        >
          <Meta title={retailData.name} description="Welcome, please select your table number." />
          <Divider />
          <Form onFinish={handleFormSubmit}>
            <Form.Item name="selectedSeat">
              <SelectSeatInput value={selectedSeat} onChange={(value) => setSelectedSeat(value)} />
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <Button type="primary" htmlType="submit">
                Confirm
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Flex>
    </>
  );
}
