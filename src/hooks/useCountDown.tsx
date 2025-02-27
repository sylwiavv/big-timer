import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { convertToMilliseconds } from '../helpers/convert-seconds';
import { ERunning, useTimerStore } from '../store/TimerStore';
import { ESearchParams } from '../types/types';
import useUpdateSearchParams from './useUpdateSearchParams';

const useCountdown = () => {
  const searchParams = useSearchParams();

  const { setRunning, running, setMilliseconds } = useTimerStore();
  const { updateSearchParams, getValuesFromSearchParams } =
    useUpdateSearchParams();

  const [remainingTime, setRemainingTime] = useState(0);
  const [animationFrameId, setAnimationFrameId] = useState<number | null>(null);

  useEffect(() => {
    const targetParam = searchParams.get(ESearchParams.TARGET);

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
      setMilliseconds(timeLeft > 0 ? timeLeft : 0);

      if (timeLeft > 0 && running === ERunning.RUNNING) {
        const id = requestAnimationFrame(updateTimer);
        setAnimationFrameId(id);
      } else if (timeLeft <= 0) {
        setRunning(ERunning.IDLE);
      }
    };

    updateTimer();

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [running, searchParams]);

  const start = () => setRunning(ERunning.RUNNING);

  const pause = () => {
    setRunning(ERunning.PAUSED);

    const searchParamsValues = getValuesFromSearchParams();

    if (searchParamsValues) {
      const { hours, minutes, seconds } = searchParamsValues;
      updateSearchParams({ hours, minutes, seconds, target: 0 });
    }

    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      setAnimationFrameId(null);
    }
  };

  const restart = () => {
    setRunning(ERunning.IDLE);

    const searchParamsValues = getValuesFromSearchParams();

    if (searchParamsValues) {
      const { hours, minutes, seconds } = searchParamsValues;
      updateSearchParams({ hours, minutes, seconds });

      const milliseconds = convertToMilliseconds(hours, minutes, seconds);
      setMilliseconds(milliseconds);
    }
  };

  return { milliseconds: remainingTime, running, start, pause, restart };
};

export default useCountdown;
