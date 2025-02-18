'use client';

import { convertSeconds } from '../../../helpers/convert-seconds';
import { useTimerStore } from '../../../store/TimerStore';
import { ETimerUnits } from '../../../types/types';
import TimerUnit from '../../atoms/TimerUnit/TimerUnit';

const Timer = ({ onClick }: { onClick: () => void }) => {
  const { seconds } = useTimerStore();
  const { convertedSeconds, convertedMinutes, convertedHours } =
    convertSeconds(seconds);

  return (
    <div className="flex w-full justify-center  bg-[#5080aa]" onClick={onClick}>
      {/* {hours > 0 && <TimerUnit time={hours} unit={ETimerUnits.HOURS} />} */}
      <TimerUnit time={convertedHours} unit={ETimerUnits.HOURS} />
      <TimerUnit time={convertedMinutes} unit={ETimerUnits.MINUTES} />
      <TimerUnit time={convertedSeconds} unit={ETimerUnits.SECONDS} />
    </div>
  );
};
export default Timer;
