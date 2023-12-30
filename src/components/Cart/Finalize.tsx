import { Flex, Typography } from "antd";
import { FoodEntry } from "../../pages/CustomizeFood";
import { ExtraCharge, calculateCartPrice } from "../../services/foodEntryServices";

type FinalizeProps = {
  cart: FoodEntry[];
  extraCharge: ExtraCharge;
};

export default function Finalize({ cart, extraCharge }: FinalizeProps) {
  const grossTotal = calculateCartPrice(cart);
  const sst = grossTotal * extraCharge.sst;
  const service = grossTotal * extraCharge.service;
  const nettTotal = grossTotal + sst + service;

  return (
    <div
      className="cart-finalize"
      style={{
        background: "rgb(255, 255, 255)",
        borderBlock: "0.8px solid rgb(215, 220, 225)",
        padding: "12px 18px",
      }}
    >
      <LabelAndPrice label="Gross Total" price={calculateCartPrice(cart)} />
      <LabelAndPrice label="Sst (6%)" price={sst} />
      <LabelAndPrice label="Service Charge (10%)" price={service} />
      <Flex justify="space-between">
        <Typography.Title level={4} style={{ margin: 0 }}>
          Nett Total
        </Typography.Title>
        <Typography.Title level={4} style={{ margin: 0 }}>
          RM{nettTotal.toFixed(2)}
        </Typography.Title>
      </Flex>
    </div>
  );
}

type LabelAndPriceProps = {
  label: string;
  price: number;
};

function LabelAndPrice({ label, price }: LabelAndPriceProps) {
  return (
    <Flex justify="space-between">
      <Typography.Text>{label}</Typography.Text>
      <Typography.Text>RM{price.toFixed(2)}</Typography.Text>
    </Flex>
  );
}
