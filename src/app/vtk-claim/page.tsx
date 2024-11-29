import { ethers } from "ethers";
import { useState } from "react";
import VotingTokenABI from "../../utils/VotingToken.json"; // Pastikan path sesuai

const VotingTokenAddress = "0xCD4d331E372B0712D0dC27363937855FDFcBF8E7"; // Alamat kontrak VotingToken

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
      const votingTokenContract = new ethers.Contract(VotingTokenAddress, VotingTokenABI, signer);

      // Panggil fungsi claimVotingTokens
      const tx = await votingTokenContract.claimVotingTokens();
      
      // Tunggu hingga transaksi selesai
      await tx.wait();

      // Set status sukses setelah transaksi selesai
      setSuccess(true);
      setError(null);  // Reset error jika klaim berhasil
    } catch (err) {
      setSuccess(false);
      setError("Failed to claim token: " + err.message);
    }
  }

  return (
    <div>
      <button onClick={claimTokens} className="bg-blue-500 text-white px-4 py-2 rounded">
        Claim 1 VTK Token
      </button>
      {success && <p className="text-green-500 mt-4">Token claimed successfully!</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default ClaimToken;
