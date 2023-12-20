import { Navigate, Route, Routes } from "react-router-dom";
import Ordering from "./pages/Ordering";
import SelectTable from "./pages/SelectTable";
import { ConfigProvider } from "antd";
import CustomizeFood from "./pages/CustomizeFood";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "rgb(255, 185, 45)",
        },
      }}
    >
      <Routes>
        <Route path="/" element={<SelectTable />}></Route>
        <Route path="/:seatId">
          <Route index element={<Ordering />}></Route>
          <Route path="customize" element={<CustomizeFood />}></Route>
        </Route>
        <Route path="/not-found" element={<NotFound />}></Route>
        <Route path="*" element={<Navigate to="/not-found" />}></Route>
      </Routes>
    </ConfigProvider>
  );
}
