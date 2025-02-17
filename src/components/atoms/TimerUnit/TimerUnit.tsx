'use client';

import useFormattedTime from '../../../hooks/useFormattedTime';
import { ETimerUnits } from '../../../types/types';

interface ITimerUnitProps {
  time: number;
  unit: ETimerUnits;
}

export default function TimerUnit({ time, unit }: ITimerUnitProps) {
  const { formatTime } = useFormattedTime();

  return (
    <div
      className={`flex font-extrabold text-timerXl justify-center items-center ${unit === ETimerUnits.HOURS ? 'text-center' : 'text-right'}`}
    >
      <div className="flex flex-col">
        <p className="leading-[.90]">
          {unit === ETimerUnits.SECONDS || unit === ETimerUnits.MINUTES
            ? formatTime(time)
            : time}
        </p>
        <span
          className={`text-lg font-light ${unit === ETimerUnits.HOURS ? 'pr-0' : 'pr-8'}`}
        >
          {unit}
        </span>
      </div>

      {unit !== ETimerUnits.SECONDS && <span>:</span>}
    </div>
  );
}
