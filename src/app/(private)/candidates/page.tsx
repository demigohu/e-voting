"use client";

import { useEffect, useState } from "react";
import { getContractWithSigner } from "@/utils/ethers";
import CountdownTimer from "@/components/timer";
import { CatSleep } from "@/components/CatSleep";
import { dataCandidates } from "../data/candidate";
import Image from "next/image";

export default function ViewCandidates() {
  const [endTime, setEndTime] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(
    Math.floor(Date.now() / 1000)
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
      } catch (err) {
        // console?.error("Error loading candidates:", err);
        setErrorMsg(`No Candidates Available ${err}`);
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

      {dataCandidates.length > 0 ? (
        dataCandidates.map((candidate) => (
          <div key={candidate.id} className="p-4 border rounded mt-4">
            <h2 className="text-xl font-bold mb-2">{candidate.name}</h2>
            {candidate.photoUrl ? (
              <Image
                src={candidate.photoUrl}
                alt={candidate.name}
                width={0}
                height={0}
                sizes="100vw"
                className="w-32 h-32 object-cover mb-4"
              />
            ) : (
              <p className="text-gray-500 mb-4">No photo available</p>
            )}
            <p className="font-semibold">Vision:</p>
            {/* <p className="mb-4">{candidate.vision}</p> */}
            <p className="font-semibold">Mission:</p>
            {/* <p className="mb-4">{candidate.mission}</p> */}
            {/* Hanya tampilkan vote count jika waktu voting berakhir */}
            {currentTime > (endTime ?? 0) ? (
              <p className="font-semibold">Votes: {candidate.voteCount}</p>
            ) : (
              <p className="text-gray-500">
                Votes will be visible after voting ends.
              </p>
            )}
          </div>
        ))
      ) : (
        <div className="flex flex-col justify-center items-center min-h-[50vh]">
          <CatSleep className="w-10/12 md:w-1/2 mx-auto lg:-mt-32" />
          <p className="-mt-20 lg:-mt-40 text-center text-red-600 font-bold text-xl">
            {errorMsg}
          </p>
        </div>
      )}
    </div>
  );
}
