import { Navigate, Route, Routes } from "react-router-dom";
import Ordering from "./pages/Ordering";
import SelectTable from "./pages/SelectTable";
import { ConfigProvider } from "antd";
import CustomizeFood from "./pages/CustomizeFood";

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "rgb(255, 190, 60)",
        },
      }}
    >
      <Routes>
        <Route path="/" element={<SelectTable />}></Route>
        <Route path="/:seatId">
          <Route index element={<Ordering />}></Route>
          <Route path="customize" element={<CustomizeFood />}></Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </ConfigProvider>
  );
}
