"use client";

import { useEffect, useState } from "react";
import { getContractWithSigner } from "@/utils/ethers";
import CountdownTimer from "@/components/timer";
import { CatSleep } from "@/components/CatSleep";
// import { dataCandidates } from "../data/candidate";
import Image from "next/image";
import OverlayIMG from "@/assets/login_bg.jpg";
import { TypeCandidate } from "@/modules/candidate";

export default function ViewCandidates() {
  const [candidates, setCandidates] = useState<TypeCandidate[]>([]);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(
    Math.floor(Date.now() / 1000)
  );

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
      }
    }

    loadVotingData();
  }, []);

  return (
    <div
      className="layoutPage"
      style={{ backgroundImage: `url(${OverlayIMG.src})` }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="ContainerContent relative text-white">
        <h1 className="text-2xl font-bold">Candidates</h1>

        {/* Tampilkan timer */}
        {endTime && (
          <div className="mb-4 flex items-center gap-2">
            <h2 className="font-semibold">Voting Ends In :</h2>
            <CountdownTimer endTime={endTime} />
          </div>
        )}
        <div className="grid grid-cols-2 gap-10">
          {candidates.length > 0 ? (
            candidates.map((candidate) => (
              <div key={candidate.id} className="Card">
                <div className="flex items-start gap-5">
                  {candidate.photoUrl ? (
                    <Image
                      src={candidate.photoUrl}
                      alt={candidate.name}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-52 h-52 rounded-xl shadow object-cover mb-4"
                    />
                  ) : (
                    <p className="text-gray-500 mb-4">No photo available</p>
                  )}
                  <div className="flex flex-col gap-2 text-xl font-bold">
                    <div className="flex items-center gap-2">
                      <p>Name : </p>
                      <h2>{candidate.name}</h2>
                    </div>
                    {currentTime > (endTime ?? 0) ? (
                      <p className="font-semibold">
                        Votes : {candidate.voteCount}
                      </p>
                    ) : (
                      <p className="text-gray-500">
                        Votes will be visible after voting ends.
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div>
                    <p className="font-semibold text-lg">Vision:</p>
                    <p className="text-neutral-300">{candidate.vision}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Mission:</p>
                    <p className="text-neutral-300">{candidate.mission}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 flex flex-col justify-center items-center min-h-[50vh]">
              <CatSleep className="w-10/12 md:w-1/2 mx-auto lg:-mt-32" />
              <p className="-mt-32 text-red-600 font-bold text-xl">
                no candidates yet
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
