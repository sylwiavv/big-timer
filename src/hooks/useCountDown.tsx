import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ERunning, useTimerStore } from '../store/TimerStore';
import { getSearchParamas } from '../utils/getSearchParams';

const useCountdown = () => {
  const searchParams = useSearchParams();
  const { toggleRunning, milliseconds, running, setMili } = useTimerStore();
  const [remainingTime, setRemainingTime] = useState(0);
  const [animationFrameId, setAnimationFrameId] = useState<number | null>(null); // ID do anulowania animacji

  useEffect(() => {
    const targetParam = searchParams.get('target');

    if (!targetParam || running === ERunning.PAUSED) {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      return;
    }

    const targetTime = parseInt(targetParam, 10);

    const updateTimer = () => {
      const timeLeft = targetTime - Date.now();
      setRemainingTime(timeLeft > 0 ? timeLeft : 0);
      setMili(timeLeft > 0 ? timeLeft : 0);

      if (timeLeft > 0 && running === ERunning.RUNNING) {
        const id = requestAnimationFrame(updateTimer);
        setAnimationFrameId(id);
      } else if (timeLeft <= 0) {
        toggleRunning(ERunning.IDLE);
      }
    };

    updateTimer();

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [running, searchParams]);

  const start = () => toggleRunning(ERunning.RUNNING);
  const pause = () => {
    toggleRunning(ERunning.PAUSED);
    if (animationFrameId) {
      window.cancelAnimationFrame(animationFrameId);
    }
  };
  const restart = () => {
    toggleRunning(ERunning.IDLE);
    getSearchParamas({ searchParams, setMili });
  };

  return { milliseconds: remainingTime, running, start, pause, restart };
};

export default useCountdown;
