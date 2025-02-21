import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { convertToMilliseconds } from '../helpers/convert-seconds';
import { ERunning, useTimerStore } from '../store/TimerStore';
import useUpdateSearchParams from './useUpdateSearchParams';

const useCountdown = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const { toggleRunning, running, setMilliseconds } = useTimerStore();
  const { updateSearchParams, getValuesFromSearchParams } =
    useUpdateSearchParams();

  const [remainingTime, setRemainingTime] = useState(0);
  const [animationFrameId, setAnimationFrameId] = useState<number | null>(null);

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
      setMilliseconds(timeLeft > 0 ? timeLeft : 0);

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
    params.delete('target');

    if (animationFrameId) {
      window.cancelAnimationFrame(animationFrameId);
    }
  };
  const restart = () => {
    toggleRunning(ERunning.IDLE);

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
