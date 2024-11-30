"use client";

import { useEffect, useState } from "react";
import { getContractWithSigner } from "@/utils/ethers";

export default function ViewCandidates() {
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCandidates() {
      try {
        const contract = await getContractWithSigner();
        const count = await contract.candidatesCount();
        const candidateArray = [];
        for (let i = 1; i <= count; i++) {
          const candidate = await contract.candidates(i);
          candidateArray.push({
            id: candidate.id,
            name: candidate.name,
            photoUrl: candidate.photoUrl,
            voteCount: candidate.voteCount.toString(),
          });
        }
        setCandidates(candidateArray);
      } catch (err) {
        console?.error(err);
        setError("Failed to load candidates.");
      }
    }
    loadCandidates();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Candidates</h1>
      {candidates.length > 0 ? (
        candidates.map((candidate) => (
          <div key={candidate.id} className="p-2 border rounded mt-2">
            <p className="font-semibold">Name: {candidate.name}</p>
            <p>Votes: {candidate.voteCount}</p>
            {candidate.photoUrl ? (
              <img
                src={candidate.photoUrl} // Menggunakan URL penuh
                alt={candidate.name}
                className="w-32 h-32 object-cover mt-2"
              />
            ) : (
              <p className="text-gray-500">No photo available</p>
            )}
          </div>
        ))
      ) : (
        <p>No candidates available.</p>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
