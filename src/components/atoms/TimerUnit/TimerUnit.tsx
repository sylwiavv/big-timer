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
    <div className="flex font-extrabold text-[16rem] justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        <p className="leading-[.76]">
          {unit === ETimerUnits.SECONDS ? formatTime(time) : time}
        </p>{' '}
        <span className="text-lg font-light">{unit}</span>
      </div>

      {unit !== ETimerUnits.SECONDS && <span>:</span>}
    </div>
  );
}
