'use client';

import { convertSeconds } from '../../../helpers/convert-seconds';
import { useTimerStore } from '../../../store/TimerStore';
import { ETimerUnits } from '../../../types/types';
import TimerUnit from '../../atoms/TimerUnit/TimerUnit';

const Timer = () => {
  const { toggleRunning, setTime, running, seconds } = useTimerStore();

  const { convertedSeconds, convertedMinutes, convertedHours } =
    convertSeconds(seconds);

  console.log(seconds, 'seconds TIMER');

  return (
    <div className="flex bg-[#5080aa]">
      {/* {hours > 0 && <TimerUnit time={hours} unit={ETimerUnits.HOURS} />} */}
      {<TimerUnit time={convertedHours} unit={ETimerUnits.HOURS} />}
      <TimerUnit time={convertedMinutes} unit={ETimerUnits.MINUTES} />
      <TimerUnit time={convertedSeconds} unit={ETimerUnits.SECONDS} />
    </div>
  );
};
export default Timer;
