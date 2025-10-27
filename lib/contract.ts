'use client'
import { ethers } from "ethers";
import { contractAddress, contractABI } from "./constants";

export const getContract = async () => {
  if (!window.ethereum) throw new Error("MetaMask not installed");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  // 🔹 네트워크 확인
  const network = await provider.getNetwork();
  if (Number(network.chainId) !== 11155111) { // Sepolia
    try {
      // Sepolia로 전환 요청
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xAA36A7" }], // 11155111 in hex
      });
      console.log("✅ Switched to Sepolia network");
    } catch (switchError) {
      // 네트워크가 추가 안 되어 있으면 추가 요청
      if ((switchError as any).code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0xAA36A7",
              chainName: "Sepolia Test Network",
              nativeCurrency: {
                name: "SepoliaETH",
                symbol: "ETH",
                decimals: 18,
              },
              rpcUrls: ["https://sepolia.infura.io/v3/"],
              blockExplorerUrls: ["https://sepolia.etherscan.io"],
            },
          ],
        });
      } else {
        throw new Error("Please switch to Sepolia network in MetaMask");
      }
    }
  }

  return new ethers.Contract(contractAddress, contractABI, signer);
};
