'use client';

import { convertSeconds } from '@/helpers/convert-seconds';
import { ETimerUnits } from '@/types/types';
import { Minus, Plus } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import useCountdown from '../../../hooks/useCountDown';
import { ERunning, useTimerStore } from '../../../store/TimerStore';
import { setTimerSearchParams } from '../../../utils/setTimerSearchParams';
import CircleButtonWithIcon from '../../atoms/CircleButton/CircleButton';
import TimerUnit from '../../atoms/TimerUnit/TimerUnit';
import { ButtonsLayout } from '../../molecules/ButtonsLayout/ButtonsLayout';
import { Button } from '../../ui/button';

const Timer = ({ onClick }: { onClick: () => void }) => {
  const searchParams = useSearchParams();
  const { toggleRunning, setTime, running, seconds, setSeconds } =
    useTimerStore();

  const { convertedSeconds, convertedMinutes, convertedHours } =
    convertSeconds(seconds);

  const { start, pause, restart } = useCountdown();

  const handleSetStart = () => {
    toggleRunning(ERunning.RUNNING);

    start();
  };

  const handleRestartMode = () => {
    restart();
    toggleRunning(ERunning.IDLE);
  };

  const handleTimeChange = (type: 'plus' | 'minus') => {
    let value = seconds < 59 ? 5 : 15;
    let valueToHandle = type === 'plus' ? value : -value;
    let updatedSeconds = seconds + valueToHandle;
    if (updatedSeconds < 0) return;

    setSeconds(updatedSeconds);
    setTimerSearchParams({
      searchParams,
      seconds: seconds + valueToHandle,
      setSeconds,
    });
  };

  return (
    <div className="bg-orange-500 flex items-center gap-4 w-full">
      <ButtonsLayout>
        {running === ERunning.PAUSED || running === ERunning.IDLE ? (
          <>
            <Button className="font-semibold" onClick={handleSetStart}>
              Start
            </Button>

            <Button className="font-semibold" onClick={handleRestartMode}>
              Restart
            </Button>
          </>
        ) : (
          <Button
            className="font-semibold"
            onClick={() => {
              pause();
              toggleRunning(ERunning.PAUSED);
            }}
          >
            Pause
          </Button>
        )}
      </ButtonsLayout>

      <div
        className="flex w-full justify-center  bg-[#5080aa]"
        onClick={onClick}
      >
        {/* {hours > 0 && <TimerUnit time={hours} unit={ETimerUnits.HOURS} />} */}
        <TimerUnit time={convertedHours} unit={ETimerUnits.HOURS} />
        <TimerUnit time={convertedMinutes} unit={ETimerUnits.MINUTES} />
        <TimerUnit time={convertedSeconds} unit={ETimerUnits.SECONDS} />
      </div>

      <ButtonsLayout>
        <CircleButtonWithIcon
          icon={<Plus />}
          onClick={() => handleTimeChange('plus')}
        />
        <CircleButtonWithIcon
          icon={<Minus />}
          onClick={() => handleTimeChange('minus')}
        />
      </ButtonsLayout>
    </div>
  );
};
export default Timer;
