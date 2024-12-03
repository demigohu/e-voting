"use client";

import { useEffect, useState } from "react";
import { getContractWithSigner } from "@/utils/ethers";
import Image from "next/image";
import { TypeCandidate } from "@/modules/candidate";
import { CatSleep } from "@/components/CatSleep";
import { dataCandidates } from "../data/candidate";

export default function Candidates() {
  const [candidates, setCandidates] = useState<TypeCandidate[]>(dataCandidates);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function loadCandidates() {
      try {
        const contract = await getContractWithSigner();
        const count = await contract.candidatesCount();
        const candidateArray = [];
        for (let i = 1; i <= count; i++) {
          const candidate = await contract.candidates(i);
          console.log(`Candidate ${i}: `, candidate);
          candidateArray.push({
            id: candidate.id,
            name: candidate.name,
            photoUrl: candidate.photoUrl,
            voteCount: candidate.voteCount.toString(),
          });
        }
        setCandidates(candidateArray);
      } catch (err) {
        // console?.error("Error loading candidates:", err);
        setErrorMsg(`No Candidates Available ${err}`);
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
            <Image
              src={candidate.photoUrl}
              alt={candidate.name}
              className="w-32 h-32 object-cover mt-2"
              width={0}
              height={0}
              sizes="100vw"
            />
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
