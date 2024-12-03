"use client";

import { useState } from "react";
import { getContractWithSigner } from "@/utils/ethers";

export default function AddCandidate() {
  const [candidate, setCandidate] = useState({ name: "", photoUrl: "" });
  const [duration, setDuration] = useState(""); // Menyimpan durasi voting dalam detik
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleAddCandidate() {
    try {
      const contract = await getContractWithSigner();
      const tx = await contract.addCandidate(
        candidate.name,
        candidate.photoUrl
      );
      await tx.wait();
      setSuccess("Candidate added successfully!");
      setCandidate({ name: "", photoUrl: "" });
    } catch (err) {
      console.error(err);
      setError("Failed to add candidate.");
    }
  }

  async function handleSetVotingTime() {
    try {
      const contract = await getContractWithSigner();
      const tx = await contract.setVotingTime(Number(duration)); // Set waktu voting
      await tx.wait();
      setSuccess("Voting time has been set!");
      setDuration("");
    } catch (err) {
      console.error(err);
      setError("Failed to set voting time.");
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
      <h2 className="text-xl font-bold mt-8">Set Voting Time</h2>
      <input
        type="number"
        placeholder="Duration in seconds"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="block mt-2 p-2 border rounded"
      />
      <button
        onClick={handleSetVotingTime}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Set Voting Time
      </button>
      {success && <p className="mt-4 text-green-500">{success}</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}
