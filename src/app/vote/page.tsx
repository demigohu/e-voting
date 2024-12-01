// 'use client';

// import { useEffect, useState } from "react";
// import { getContractWithSigner } from "@/utils/ethers";

// export default function Vote() {
//   const [candidates, setCandidates] = useState([]);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function loadCandidates() {
//       try {
//         const contract = await getContractWithSigner();
//         const count = await contract.candidatesCount();
//         const candidateArray = [];
//         for (let i = 1; i <= count; i++) {
//           const candidate = await contract.candidates(i);
//           candidateArray.push(candidate);
//         }
//         setCandidates(candidateArray);
//       } catch (err) {
//         setError("Failed to load candidates.");
//       }
//     }
//     loadCandidates();
//   }, []);

//   async function handleVote(candidateId) {
//     try {
//       const contract = await getContractWithSigner();
//       const tx = await contract.vote(candidateId);
//       await tx.wait();
//       setSuccess(`You voted for candidate ID: ${candidateId}`);
//       setError(null);
//     } catch (err) {
//       setError("Failed to vote. Ensure you have not already voted or Ensure you Have VTK Token");
//       setSuccess(null);
//     }
//   }

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Vote</h1>
//       {candidates.length > 0 ? (
//         candidates.map((candidate) => (
//           <div
//             key={candidate.id}
//             className="border rounded p-4 mb-4 flex items-center"
//           >
//             <img
//               src={candidate.photoUrl}
//               alt={candidate.name}
//               className="w-16 h-16 object-cover mr-4"
//               // onError={(e) => {
//               //   e.currentTarget.src = "/default-placeholder.png"; // Optional: Placeholder if the image fails
//               // }}
//             />
//             <div>
//               <p className="font-semibold">Name: {candidate.name}</p>
//               <p>Votes: {candidate.voteCount.toString()}</p>
//               <button
//                 onClick={() => handleVote(candidate.id)}
//                 className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
//               >
//                 Vote
//               </button>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No candidates available.</p>
//       )}
//       {success && <p className="mt-4 text-green-500">{success}</p>}
//       {error && <p className="mt-4 text-red-500">{error}</p>}
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { getContractWithSigner } from "@/utils/ethers";
import CountdownTimer from "@/components/timer";

export default function Vote() {
  const [candidates, setCandidates] = useState([]);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(Math.floor(Date.now() / 1000));
  const [success, setSuccess] = useState<string | null>(null);
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
            voteCount: candidate[5].toString(),
          });
        }
        setCandidates(candidateArray);
      } catch (err) {
        setError("Failed to load candidates.");
      }
    }

    loadVotingData();
  }, []);

  async function handleVote(candidateId: number) {
    try {
      const contract = await getContractWithSigner();
      const tx = await contract.vote(candidateId);
      await tx.wait();
      setSuccess(`You voted for candidate ID: ${candidateId}`);
      setError(null);
    } catch (err) {
      setError("Failed to vote. Ensure you have not already voted or you have voting tokens.");
      setSuccess(null);
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Vote</h1>

      {/* Tampilkan timer */}
      {endTime && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Voting Ends In:</h2>
          <CountdownTimer endTime={endTime} />
        </div>
      )}

      {candidates.length > 0 ? (
        candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="border rounded p-4 mb-4 flex items-center"
          >
            <img
              src={candidate.photoUrl}
              alt={candidate.name}
              className="w-16 h-16 object-cover mr-4"
            />
            <div>
              <p className="font-semibold">Name: {candidate.name}</p>
              {/* Hanya tampilkan vote count jika waktu voting berakhir */}
              {currentTime > (endTime ?? 0) ? (
                <p>Votes: {candidate.voteCount}</p>
              ) : (
                <p className="text-gray-500">Votes will be visible after voting ends.</p>
              )}
              <button
                onClick={() => handleVote(candidate.id)}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
              >
                Vote
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No candidates available.</p>
      )}
      {success && <p className="mt-4 text-green-500">{success}</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}
