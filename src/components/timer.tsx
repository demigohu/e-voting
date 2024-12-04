import { useEffect, useState } from "react";

interface CountdownTimerProps {
  endTime: number; // Define the type for the 'endTime' prop
}

export default function CountdownTimer({ endTime }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!endTime) return;

    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const remaining = Math.max(endTime - now, 0);
      setTimeLeft(remaining);

      if (remaining <= 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  function formatTime(seconds: number) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  }

  return (
    <p>
      {timeLeft > 0
        ? `Time left: ${formatTime(timeLeft)}`
        : "Voting has ended."}
    </p>
  );
}
