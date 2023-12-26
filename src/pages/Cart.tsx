import "../components/css/Cart.css";
import TopBar from "../components/Cart/TopBar";
import CartEntry from "../components/Cart/CartEntry";
import useLocalStorage from "../hooks/useLocalStorage";
import { FoodEntry } from "./CustomizeFood";

export default function Cart() {
  const [cart, setCart] = useLocalStorage<FoodEntry[]>("cart", []);

  const handleDeleteFoodEntry = (id: string) => {
    const updatedCart = cart.filter((foodEntry) => foodEntry.id !== id);
    setCart(updatedCart);
  };

  return (
    <div className="container flex-container">
      <TopBar />
      {cart.map((foodEntry) => {
        return (
          <CartEntry key={foodEntry.id} foodEntry={foodEntry} onDelete={handleDeleteFoodEntry} />
        );
      })}
    </div>
  );
}
