import { useEffect } from 'react';
import { ERunning, useTimerStore } from '../store/TimerStore';

const useCountdown = () => {
  const { toggleRunning, setTime, running, seconds } = useTimerStore();
  useEffect(() => {
    if (!running || seconds <= 0) return;

    const interval = setInterval(() => {
      setTime(-1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, running, setTime]);

  const start = () => toggleRunning(ERunning.RUNNING);
  const pause = () => toggleRunning(ERunning.PAUSED);
  const restart = () => {
    toggleRunning(ERunning.RUNNING);
  };

  return { seconds, running, start, pause, restart };
};

export default useCountdown;
