import React from "react";
import FailTransferForm from "./components/FailTransferForm";
export default function App() {
  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>BSC 模拟转账失败工具</h1>
      <FailTransferForm />
    </div>
  );
}