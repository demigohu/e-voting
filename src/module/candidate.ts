import { StaticImageData } from "next/image";

interface TypeCandidate {
  id: number;
  name: string;
  photoUrl: StaticImageData;
  vision: string;
  mission: string;
  voteCount: number;
}

export type { TypeCandidate };
