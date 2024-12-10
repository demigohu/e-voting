"use client";

import { useState } from "react";
import { getContractWithSigner } from "@/utils/ethers";
import bgIMG from "@/../public/bg2.jpg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <div
      className="layoutPage"
      style={{ backgroundImage: `url(${bgIMG.src})` }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative min-h-screen flex flex-col justify-center items-center">
        <div className="Card p-10 text-white w-80 md:w-96 mx-auto">
          <h1 className="text-2xl font-bold mb-3">Add Candidate</h1>
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              placeholder="Candidate Name"
              value={candidate.name}
              onChange={(e) =>
                setCandidate({ ...candidate, name: e.target.value })
              }
            />
            <Input
              type="text"
              placeholder="Photo URL"
              value={candidate.photoUrl}
              onChange={(e) =>
                setCandidate({ ...candidate, photoUrl: e.target.value })
              }
            />
            <Button
              onClick={handleAddCandidate}
              className="bg-blue-600 hover:bg-blue-700 w-full"
            >
              Add Candidate
            </Button>
          </div>
          <h2 className="text-2xl font-bold mt-8 mb-3">Set Voting Time</h2>
          <div className="flex flex-col gap-2">
            <Input
              type="number"
              placeholder="Duration in seconds"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
            <Button
              onClick={handleSetVotingTime}
              className="bg-green-600 hover:bg-green-700 w-full"
            >
              Set Voting Time
            </Button>
          </div>
          {success && (
            <p className="mt-4 text-green-500 text-center">{success}</p>
          )}
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
}
