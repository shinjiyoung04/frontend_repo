"use client";

import { useState, useEffect } from "react";
import { getContract } from "@/lib/contract";

export default function CounterApp() {
  const [counter, setCounter] = useState<number>(0);
  const [account, setAccount] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ MetaMask 연결
  const connectWallet = async () => {
    try {
      if (!window.ethereum) throw new Error("MetaMask not installed");
      const accounts = (await window.ethereum.request({
        method: "eth_requestAccounts",
      })) as string[];
      setAccount(accounts[0]);
      await loadCounter();
    } catch (err: any) {
      setError(err.message);
    }
  };

  // ✅ Counter 값 불러오기
  const loadCounter = async () => {
    try {
      const contract = await getContract();
      const value = await contract.getCounter();
      setCounter(Number(value));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const increment = async () => {
    setLoading(true);
    try {
      const contract = await getContract();
      const tx = await contract.incrementCounter();
      await tx.wait();
      await loadCounter();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const decrement = async () => {
    setLoading(true);
    try {
      const contract = await getContract();
      const tx = await contract.decrementCounter();
      await tx.wait();
      await loadCounter();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const reset = async () => {
    setLoading(true);
    try {
      const contract = await getContract();
      const tx = await contract.resetCounter();
      await tx.wait();
      await loadCounter();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (account) loadCounter();
  }, [account]);

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
        블록체인 카운터 (Sepolia)
      </h1>

      {!account ? (
        <div className="text-center">
          <button
            onClick={connectWallet}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            MetaMask 연결
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-center text-3xl font-bold text-blue-600">
            {counter}
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={increment}
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded"
            >
              +
            </button>
            <button
              onClick={decrement}
              disabled={loading}
              className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded"
            >
              -
            </button>
            <button
              onClick={reset}
              disabled={loading}
              className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded"
            >
              리셋
            </button>
          </div>
          <p className="text-center text-gray-500 text-sm">
            연결된 계정: {account}
          </p>
          {error && (
            <p className="text-red-500 text-sm text-center">⚠️ {error}</p>
          )}
        </div>
      )}
    </div>
  );
}
