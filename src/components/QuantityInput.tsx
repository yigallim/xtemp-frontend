import React, { useState } from "react";
import { Button, InputNumber } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import "./css/QuantityInput.css";

type QuantityInputProps = {
  onChange: (quantity: number) => void;
};

export default function QuantityInput({ onChange }: QuantityInputProps) {
  const [quantity, setQuantity] = useState(1);

  const onQuantityChange = (value: number | string | null) => {
    const newValue = Number(value);
    if (!isNaN(newValue) && newValue >= 1 && newValue <= 99) {
      setQuantity(newValue);
      onChange(newValue);
    }
  };

  const decrement = () => {
    setQuantity((prevQuantity) => {
      const newValue = Math.max(prevQuantity - 1, 1);
      onChange(newValue);
      return newValue;
    });
  };

  const increment = () => {
    setQuantity((prevQuantity) => {
      const newValue = Math.min(prevQuantity + 1, 99);
      onChange(newValue);
      return newValue;
    });
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
