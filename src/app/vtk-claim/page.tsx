import { ethers } from "ethers";
import { useState } from "react";
import VotingTokenABI from "../../utils/VotingToken.json"; // Pastikan path sesuai
import { Button } from "@/components/ui/button";

const VotingTokenAddress = "0x0b7053f68A51bA4E95AB7E33b9686e1898917201"; // Alamat kontrak VotingToken

function ClaimToken() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  async function claimTokens() {
    try {
      // Memeriksa apakah window.ethereum (MetaMask) ada
      if (!window.ethereum) {
        setError("MetaMask is not installed!");
        return;
      }

      // Inisialisasi provider menggunakan Ethers.js versi 6
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Inisialisasi kontrak dengan ABI dan alamat kontrak VotingToken
      const votingTokenContract = new ethers.Contract(
        VotingTokenAddress,
        VotingTokenABI,
        signer
      );

      // Panggil fungsi claimVotingTokens
      const tx = await votingTokenContract.claimVotingTokens();

      // Tunggu hingga transaksi selesai
      await tx.wait();

      // Set status sukses setelah transaksi selesai
      setSuccess(true);
      setError(null); // Reset error jika klaim berhasil
    } catch (err) {
      setSuccess(false);
      setError("Failed to claim token: " + err.message);
    }
  }

  return (
    <div>
      <Button onClick={claimTokens} className="bg-blue-600 text-white py-5">
        Claim 1 VTK Token
      </Button>
      {success && (
        <p className="text-green-500 mt-4">Token claimed successfully!</p>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default ClaimToken;
