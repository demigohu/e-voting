"use client";

import Lottie from "lottie-react";
import React from "react";
import CatSleepAnimation from "@/assets/cat-sleepy.json";

interface IProps {
  className?: string | undefined;
}

const CatSleep = ({ className }: IProps) => {
  return (
    <Lottie
      animationData={CatSleepAnimation}
      loop={true}
      autoPlay={true}
      className={className}
    />
  );
};

export { CatSleep };
