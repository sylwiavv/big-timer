'use client';

import { ETIMERUNITS } from '../../../types/types';

interface ITimerUnitProps {
  time: number;
  unit: ETIMERUNITS;
}

export default function TimerUnit({ time, unit }: ITimerUnitProps) {
  return (
    <div className="flex font-extrabold text-[16rem] justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        <p className="leading-[.76]">{time}</p>
        <span className="text-lg font-light">{unit}</span>
      </div>

      {unit !== ETIMERUNITS.SECONDS && <span>:</span>}
    </div>
  );
}
