import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { ERunning, useTimerStore } from '../store/TimerStore';
import { getSearchParamas } from '../utils/getSearchParams';

const useCountdown = () => {
  const searchParams = useSearchParams();
  const { toggleRunning, running, milliseconds, setMili } = useTimerStore();

  useEffect(() => {
    if (running !== ERunning.RUNNING || milliseconds <= 0) return;

    const interval = setInterval(() => {
      setMili((prevMilliseconds: number) =>
        Math.max(0, prevMilliseconds - 1000)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  const start = () => toggleRunning(ERunning.RUNNING);
  const pause = () => {
    toggleRunning(ERunning.PAUSED);
  };
  const restart = () => {
    toggleRunning(ERunning.IDLE);
    getSearchParamas({ searchParams, setMili });
  };

  return { milliseconds, running, start, pause, restart };
};

export default useCountdown;
