'use client';

import { convertMilliseconds } from '@/helpers/convert-seconds';
import { ETimerUnits } from '@/types/types';
import { useTimerStore } from '../../../store/TimerStore';
import TimerUnit from '../../atoms/TimerUnit/TimerUnit';
import ButtonsToHandleTimer from '../ButtonsToHandleTimer/ButtonsToHandleTimer';
import IncreaseDecreaseButtons from '../IncreaseDecreaseButtons/IncreaseDecreaseButtons';

interface ITimerProps {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Timer = ({ onClick }: ITimerProps) => {
  const { milliseconds } = useTimerStore();

  const { convertedHoursM, convertedMinutesM, convertedSecondsM } =
    convertMilliseconds(milliseconds);

  return (
    <div className="flex items-center gap-4 w-full hover:cursor-pointer">
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
