import { StaticImageData } from "next/image";

interface TypeCandidate {
  id: string;
  name: string;
  photoUrl: StaticImageData;
  vision: string;
  mission: string;
  voteCount: number;
}

export type { TypeCandidate };
