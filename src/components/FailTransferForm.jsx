import React, { useState } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";
const ABI = [{ "inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}], "name":"fakeTransfer", "outputs":[], "stateMutability":"nonpayable", "type":"function" }];

export default function FailTransferForm() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [gas, setGas] = useState("");
  const [status, setStatus] = useState("");

  const handleClick = async () => {
    try {
      if (!window.ethereum) throw new Error("请先连接钱包");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const tx = await contract.fakeTransfer(to, ethers.parseUnits(amount, 6), {
        gasLimit: gas
      });
      await tx.wait();
      setStatus("交易提交，等待确认...");
    } catch (err) {
      setStatus("失败：" + err.message);
    }
  };

  return (
    <div>
      <div>接收地址：<input value={to} onChange={e => setTo(e.target.value)} /></div>
      <div>USDT 数量：<input value={amount} onChange={e => setAmount(e.target.value)} /></div>
      <div>Gas 限制：<input value={gas} onChange={e => setGas(e.target.value)} /></div>
      <button onClick={handleClick}>模拟失败转账</button>
      <p>{status}</p>
    </div>
  );
}