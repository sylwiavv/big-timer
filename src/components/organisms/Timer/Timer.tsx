'use client';

import { convertMilliseconds } from '@/helpers/convert-seconds';
import { ESearchParams, ETimerUnits } from '@/types/types';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import useCountdown from '../../../hooks/useCountDown';
import { useTimerStore } from '../../../store/TimerStore';
import TimerUnit from '../../atoms/TimerUnit/TimerUnit';
import ButtonsToHandleTimer from '../ButtonsToHandleTimer/ButtonsToHandleTimer';
import IncreaseDecreaseButtons from '../IncreaseDecreaseButtons/IncreaseDecreaseButtons';

interface ITimerProps {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Timer = ({ onClick }: ITimerProps) => {
  const searchParams = useSearchParams();
  const { start } = useCountdown();

  const { milliseconds, setMilliseconds } = useTimerStore();

  const { convertedHoursM, convertedMinutesM, convertedSecondsM } =
    convertMilliseconds(milliseconds);

  // useEffect ?
  useEffect(() => {
    const targetParam = searchParams.get(ESearchParams.TARGET);

    if (!targetParam) return;

    const targetTime = parseInt(targetParam, 10);
    const remainingTime = targetTime - Date.now();

    if (remainingTime > 0) {
      setMilliseconds(remainingTime);
      start();
    }
  }, []);

  return (
    <div className="flex items-center gap-4 w-full">
      <ButtonsToHandleTimer />

      <div className="flex w-full justify-center" onClick={onClick}>
        <TimerUnit time={convertedHoursM} unit={ETimerUnits.HOURS} />
        <TimerUnit time={convertedMinutesM} unit={ETimerUnits.MINUTES} />
        <TimerUnit time={convertedSecondsM} unit={ETimerUnits.SECONDS} />
      </div>

      <IncreaseDecreaseButtons />
    </div>
  );
};
export default Timer;
