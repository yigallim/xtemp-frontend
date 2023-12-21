import React, { useState } from "react";
import { Button, InputNumber } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import "./css/QuantityInput.css";

export default function QuantityInput() {
  const [quantity, setQuantity] = useState(1);

  const onQuantityChange = (value: number | string | null) => {
    const newValue = Number(value);
    if (!isNaN(newValue) && newValue >= 1 && newValue <= 99) {
      setQuantity(newValue);
    }
  };

  const decrement = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const increment = () => {
    setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 99));
  };

  return (
    <div>
      <Button shape="circle" icon={<MinusOutlined />} onClick={decrement}></Button>
      <InputNumber
        min={1}
        max={99}
        value={quantity}
        onChange={onQuantityChange}
        controls={false}
        bordered={false}
        style={{ maxWidth: 40 }}
      ></InputNumber>
      <Button shape="circle" icon={<PlusOutlined />} type="primary" onClick={increment}></Button>
    </div>
  );
}
