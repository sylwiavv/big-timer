import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { ERunning, useTimerStore } from '../store/TimerStore';
import { getSearchParamas } from '../utils/getSearchParams';

const useCountdown = () => {
  const searchParams = useSearchParams();
  const { toggleRunning, setTime, running, seconds, setSeconds } =
    useTimerStore();

  useEffect(() => {
    if (running !== ERunning.RUNNING || seconds <= 0) return;

    const interval = setInterval(() => {
      setTime(-1);
    }, 1000);

    return () => clearInterval(interval);
    // }, [seconds, running, setTime]);
  }, [running, setTime]);

  const start = () => toggleRunning(ERunning.RUNNING);
  const pause = () => {
    toggleRunning(ERunning.PAUSED);
  };
  const restart = () => {
    toggleRunning(ERunning.IDLE);
    getSearchParamas({ searchParams, setSeconds });
  };

  return { seconds, running, start, pause, restart };
};

export default useCountdown;
