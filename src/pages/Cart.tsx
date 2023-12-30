import "../components/css/Cart.css";
import TopBar from "../components/Cart/TopBar";
import CartEntry from "../components/Cart/CartEntry";
import useLocalStorage from "../hooks/useLocalStorage";
import { FoodEntry } from "./CustomizeFood";
import Finalize from "../components/Cart/Finalize";
import { getExtraCharges } from "../services/foodEntryServices";
import { Empty, Flex } from "antd";

export default function Cart() {
  const extraCharge = getExtraCharges();
  const [cart, setCart] = useLocalStorage<FoodEntry[]>("cart", []);

  const handleDeleteFoodEntry = (id: string) => {
    const updatedCart = cart.filter((foodEntry) => foodEntry.id !== id);
    setCart(updatedCart);
  };

  if (cart.length === 0) {
    return (
      <div className="container flex-container customize-container" style={{ minHeight: "100%" }}>
        <Flex vertical style={{ height: "100%", flex: 1 }}>
          <TopBar />
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No Food Record."
            style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}
          />
        </Flex>
        <Finalize cart={cart} extraCharge={extraCharge} />
      </div>
    );
  }

  return (
    <div className="container flex-container customize-container" style={{ minHeight: "100%" }}>
      <Flex vertical style={{ height: "100%", flex: 1 }}>
        <TopBar />
        {cart.map((foodEntry) => {
          return (
            <CartEntry key={foodEntry.id} foodEntry={foodEntry} onDelete={handleDeleteFoodEntry} />
          );
        })}
      </Flex>
      <Finalize cart={cart} extraCharge={extraCharge} />
    </div>
  );
}
