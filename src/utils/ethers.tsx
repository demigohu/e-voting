import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

export function getProvider() {
  if (!window.ethereum) throw new Error("MetaMask is not installed");
  return new ethers.BrowserProvider(window.ethereum);
}

export async function getContractWithSigner() {
  const provider = getProvider();
  const signer = await provider.getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer);
}
