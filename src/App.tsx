import { Navigate, Route, Routes } from "react-router-dom";
import { ConfigProvider, notification } from "antd";
import Ordering from "./pages/Ordering";
import SelectTable from "./pages/SelectTable";
import CustomizeFood from "./pages/CustomizeFood";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import NotificationContext from "./context/NotificationContext";

export default function App() {
  const [api, contextHolder] = notification.useNotification({
    stack: { threshold: 1 },
    maxCount: 3,
    top: 16,
  });
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "rgb(255, 185, 45)",
        },
      }}
    >
      <NotificationContext.Provider value={api}>
        {contextHolder}
        <Routes>
          <Route path="/" element={<SelectTable />}></Route>
          <Route path="/:seatId">
            <Route index element={<Ordering />}></Route>
            <Route path="customize" element={<CustomizeFood />}></Route>
            <Route path="cart" element={<Cart />}></Route>
          </Route>
          <Route path="/not-found" element={<NotFound />}></Route>
          <Route path="*" element={<Navigate to="/not-found" />}></Route>
        </Routes>
      </NotificationContext.Provider>
    </ConfigProvider>
  );
}
