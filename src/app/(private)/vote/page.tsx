"use client";

import { useEffect, useState } from "react";
import { getContractWithSigner } from "@/utils/ethers";
import CountdownTimer from "@/components/timer";
import OverlayIMG from "@/../public/bg2.jpg";
import { TypeCandidate } from "@/module/candidate";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Vote() {
  const [candidates, setCandidates] = useState<TypeCandidate[]>([]);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(
    Math.floor(Date.now() / 1000)
  );
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
            vision: candidate[3],
            mission: candidate[4],
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

  async function handleVote(candidateId: number) {
    try {
      const contract = await getContractWithSigner();
      const tx = await contract.vote(candidateId);
      await tx.wait();
      setSuccess(`You voted for candidate ID: ${candidateId}`);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(
        "Failed to vote. Ensure you have not already voted or you have voting tokens."
      );
      setSuccess(null);
    }
  }

  return (
    <div
      className="layoutPage"
      style={{ backgroundImage: `url(${OverlayIMG.src})` }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="ContainerContent relative text-white">
        <h1 className="text-2xl font-bold text-center">Vote</h1>

        {/* Tampilkan timer */}
        {endTime && (
          <div className="mb-4 flex items-center justify-center gap-2">
            <h2 className="font-semibold">Voting Ends In :</h2>
            <CountdownTimer endTime={endTime} />
          </div>
        )}

        <div className="grid gap-5 md:gap-0 md:grid-cols-2 mt-10">
          {candidates.length > 0 ? (
            candidates.map((candidate) => (
              <div
                key={candidate.id}
                className="Card w-max mx-auto p-5 flex flex-col items-center justify-center"
              >
                <Image
                  src={candidate.photoUrl}
                  alt={candidate.name}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-52 h-52 object-cover rounded-xl"
                />
                <div className="flex flex-col justify-center items-center gap-2 mt-5">
                  <p className="font-semibold text-center text-xl">
                    {candidate.name}
                  </p>
                  {/* Hanya tampilkan vote count jika waktu voting berakhir */}
                  {currentTime > (endTime ?? 0) ? (
                    <p>Votes: {candidate.voteCount}</p>
                  ) : (
                    <p className="text-gray-500">
                      Votes will be visible after voting ends.
                    </p>
                  )}
                  <Button
                    onClick={() => handleVote(candidate.id)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Vote
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center">No candidates available.</p>
          )}
        </div>
        {success && (
          <p className="mt-4 text-green-500 text-center">{success}</p>
        )}
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
}
