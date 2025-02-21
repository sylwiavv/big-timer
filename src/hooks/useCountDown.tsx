import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ERunning, useTimerStore } from '../store/TimerStore';
import { getSearchParamas } from '../utils/getSearchParams';

const useCountdown = () => {
  const searchParams = useSearchParams();
  const { toggleRunning, running, setMili } = useTimerStore();
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    const targetParam = searchParams.get('target');
    if (!targetParam) return;

    const targetTime = parseInt(targetParam, 10);

    const updateTimer = () => {
      const timeLeft = targetTime - Date.now();
      setRemainingTime(timeLeft > 0 ? timeLeft : 0);
      setMili(timeLeft > 0 ? timeLeft : 0);

      if (timeLeft > 0) {
        requestAnimationFrame(updateTimer);
      } else {
        toggleRunning(ERunning.IDLE);
      }
    };

    updateTimer();
  }, [searchParams]);

  const start = () => toggleRunning(ERunning.RUNNING);
  const pause = () => toggleRunning(ERunning.PAUSED);
  const restart = () => {
    toggleRunning(ERunning.IDLE);
    getSearchParamas({ searchParams, setMili });
  };

  return { milliseconds: remainingTime, running, start, pause, restart };
};

export default useCountdown;
