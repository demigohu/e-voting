// 'use client';

// import { useEffect, useState } from "react";
// import { getContractWithSigner } from "@/utils/ethers";

// export default function ViewCandidates() {
//   const [candidates, setCandidates] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function loadCandidates() {
//       try {
//         const contract = await getContractWithSigner();
//         const count = await contract.candidatesCount();
//         const candidateArray = [];
//         for (let i = 1; i <= count; i++) {
//           const candidate = await contract.candidates(i);
//           candidateArray.push({
//             id: candidate.id,
//             name: candidate.name,
//             photoUrl: candidate.photoUrl,
//             voteCount: candidate.voteCount.toString(),
//           });
//         }
//         setCandidates(candidateArray);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load candidates.");
//       }
//     }
//     loadCandidates();
//   }, []);

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold">Candidates</h1>
//       {candidates.length > 0 ? (
//         candidates.map((candidate) => (
//           <div key={candidate.id} className="p-2 border rounded mt-2">
//             <p className="font-semibold">Name: {candidate.name}</p>
//             <p>Votes: {candidate.voteCount}</p>
//             {candidate.photoUrl ? (
//               <img
//                 src={candidate.photoUrl} // Menggunakan URL penuh
//                 alt={candidate.name}
//                 className="w-32 h-32 object-cover mt-2"
//               />
//             ) : (
//               <p className="text-gray-500">No photo available</p>
//             )}
//           </div>
//         ))
//       ) : (
//         <p>No candidates available.</p>
//       )}
//       {error && <p className="text-red-500">{error}</p>}
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { getContractWithSigner } from "@/utils/ethers";
import CountdownTimer from "@/components/timer";

export default function ViewCandidates() {
  const [candidates, setCandidates] = useState([]);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(Math.floor(Date.now() / 1000));
  const [error, setError] = useState<string | null>(null);

  // Update current time setiap detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Math.floor(Date.now() / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function loadVotingData() {
      try {
        const contract = await getContractWithSigner();
        const count = await contract.candidatesCount();
        const votingEndTime = await contract.votingEndTime();
        setEndTime(Number(votingEndTime.toString()));

        const candidateArray = [];
        for (let i = 1; i <= count; i++) {
          const candidate = await contract.getCandidate(i);
          candidateArray.push({
            id: candidate[0],
            name: candidate[1],
            photoUrl: candidate[2],
            vision: candidate[3], // Assumes vision is at index 3
            mission: candidate[4], // Assumes mission is at index 4
            voteCount: candidate[5].toString(),
          });
        }

        setCandidates(candidateArray);
      } catch (err) {
        console.error(err);
        setError("Failed to load candidates.");
      }
    }

    loadVotingData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Candidates</h1>

      {/* Tampilkan timer */}
      {endTime && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Voting Ends In:</h2>
          <CountdownTimer endTime={endTime} />
        </div>
      )}

      {candidates.length > 0 ? (
        candidates.map((candidate) => (
          <div key={candidate.id} className="p-4 border rounded mt-4">
            <h2 className="text-xl font-bold mb-2">{candidate.name}</h2>
            {candidate.photoUrl ? (
              <img
                src={candidate.photoUrl}
                alt={candidate.name}
                className="w-32 h-32 object-cover mb-4"
              />
            ) : (
              <p className="text-gray-500 mb-4">No photo available</p>
            )}
            <p className="font-semibold">Vision:</p>
            <p className="mb-4">{candidate.vision}</p>
            <p className="font-semibold">Mission:</p>
            <p className="mb-4">{candidate.mission}</p>
            {/* Hanya tampilkan vote count jika waktu voting berakhir */}
            {currentTime > (endTime ?? 0) ? (
              <p className="font-semibold">Votes: {candidate.voteCount}</p>
            ) : (
              <p className="text-gray-500">Votes will be visible after voting ends.</p>
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
