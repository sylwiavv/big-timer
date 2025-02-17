import { useEffect } from 'react';

interface CountdownOptions {
  seconds: number;
  running: boolean;
  setTime: (value: number) => void;
  toggleRunning: (state: boolean) => void;
}

const useCountdown = ({
  seconds,
  running,
  setTime,
  toggleRunning,
}: CountdownOptions) => {
  useEffect(() => {
    if (!running || seconds <= 0) return;

    const interval = setInterval(() => {
      setTime(-1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, running, setTime]);

  const start = () => toggleRunning(true);
  const pause = () => toggleRunning(false);
  const restart = () => {
    toggleRunning(true);
  };

  return { seconds, running, start, pause, restart };
};

export default useCountdown;
