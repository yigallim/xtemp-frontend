import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Ordering from "./pages/Ordering";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Ordering />}></Route>
      <Route path="*" element={<Navigate to="/" />}></Route>
    </Routes>
  );
}
