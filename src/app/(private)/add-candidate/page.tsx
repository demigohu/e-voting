"use client";

import { useState } from "react";
import { getContractWithSigner } from "../../../utils/ethers";

export default function AddCandidate() {
  const [candidate, setCandidate] = useState({ name: "", photoUrl: "" });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleAddCandidate() {
    try {
      const contract = await getContractWithSigner();
      const tx = await contract.addCandidate(
        candidate.name,
        candidate.photoUrl
      );
      await tx.wait();
      setSuccess(true);
      setCandidate({ name: "", photoUrl: "" });
    } catch (err) {
      setError(`Failed to add candidate. ${err}`);
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
        onChange={(e) =>
          setCandidate({ ...candidate, photoUrl: e.target.value })
        }
        className="block mt-2 p-2 border rounded"
      />
      <button
        onClick={handleAddCandidate}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Add Candidate
      </button>
      {success && (
        <p className="mt-4 text-green-500">Candidate added successfully!</p>
      )}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}
