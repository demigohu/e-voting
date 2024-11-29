// import React, { useState } from "react";
// import { useWriteContract } from "wagmi";
// import { writeContract } from '@wagmi/core'
// import { ethers } from "ethers";

// // ABI dari kontrak EVoting
// import EVotingABI from "../../utils/EVoting.json";

// // Alamat kontrak EVoting
// const CONTRACT_ADDRESS = "0xD5B00E701861EF87fc5461C0C4Ce361A562eE457";

// const AddCandidate: React.FC = () => {
//   const [name, setName] = useState("");
//   const [photoUrl, setPhotoUrl] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   // Setup Wagmi hook untuk fungsi addCandidate
//   const { writeContract } = useWriteContract({
//     abi: EVotingABI,
//     address: CONTRACT_ADDRESS,
//     functionName: "addCandidate",
//   });

//   const handleAddCandidate = async () => {
//     setIsLoading(true);
//     setSuccessMessage("");
//     setErrorMessage("");

//     try {
//       const tx = await writeContract({
//         args: [name, photoUrl],
//       });

//       // Tunggu hingga transaksi dikonfirmasi
//       await tx.wait();

//       setSuccessMessage("Candidate successfully added!");
//       setName("");
//       setPhotoUrl("");
//     } catch (error: any) {
//       setErrorMessage(error.message || "An error occurred while adding the candidate.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Add Candidate</h1>
//       <div className="mb-4">
//         <label className="block text-gray-700 mb-2" htmlFor="name">
//           Candidate Name:
//         </label>
//         <input
//           id="name"
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           placeholder="Enter candidate's name"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700 mb-2" htmlFor="photoUrl">
//           Candidate Photo URL:
//         </label>
//         <input
//           id="photoUrl"
//           type="text"
//           value={photoUrl}
//           onChange={(e) => setPhotoUrl(e.target.value)}
//           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           placeholder="Enter candidate's photo URL"
//         />
//       </div>
//       <button
//         onClick={handleAddCandidate}
//         disabled={isLoading}
//         className={`px-6 py-2 text-white rounded-md ${
//           isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
//         }`}
//       >
//         {isLoading ? "Adding Candidate..." : "Add Candidate"}
//       </button>

//       {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
//       {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
//     </div>
//   );
// };

// export default AddCandidate;

"use client"

import { useState } from "react";
import { getContractWithSigner } from "../../utils/ethers";

export default function AddCandidate() {
  const [candidate, setCandidate] = useState({ name: "", photoUrl: "" });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  async function handleAddCandidate() {
    try {
      const contract = await getContractWithSigner();
      const tx = await contract.addCandidate(candidate.name, candidate.photoUrl);
      await tx.wait();
      setSuccess(true);
      setCandidate({ name: "", photoUrl: "" });
    } catch (err) {
      setError("Failed to add candidate.");
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Add Candidate</h1>
      <input
        type="text"
        placeholder="Candidate Name"
        value={candidate.name}
        onChange={(e) => setCandidate({ ...candidate, name: e.target.value })}
        className="block mt-2 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Photo URL"
        value={candidate.photoUrl}
        onChange={(e) => setCandidate({ ...candidate, photoUrl: e.target.value })}
        className="block mt-2 p-2 border rounded"
      />
      <button
        onClick={handleAddCandidate}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Add Candidate
      </button>
      {success && <p className="mt-4 text-green-500">Candidate added successfully!</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}
