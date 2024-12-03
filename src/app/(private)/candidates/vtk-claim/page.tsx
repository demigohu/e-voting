"use client";

import { ethers } from "ethers";
import { useState } from "react";
import VotingTokenABI from "@/utils/VotingToken.json";

const VotingTokenAddress = "0xCD4d331E372B0712D0dC27363937855FDFcBF8E7";

function ClaimToken() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function claimTokens() {
    try {
      if (!window.ethereum) {
        setError("MetaMask is not installed!");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const votingTokenContract = new ethers.Contract(
        VotingTokenAddress,
        VotingTokenABI,
        signer
      );

      const tx = await votingTokenContract.claimVotingTokens();

      await tx.wait();

      setSuccess(true);
      setError("");
    } catch (err) {
      setSuccess(false);
      setError("Failed to claim token: " + err);
    }
  }

  return (
    <div>
      <button
        onClick={claimTokens}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Claim 1 VTK Token
      </button>
      {success && (
        <p className="text-green-500 mt-4">Token claimed successfully!</p>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default ClaimToken;
