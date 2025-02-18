'use client';

import { convertSeconds, convertToSeconds } from '@/helpers/convert-seconds';
import { ERunning, useTimerStore } from '@/store/TimerStore';
import { ETimerUnits } from '@/types/types';
import { Minus, Plus } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import useCountdown from '../../../hooks/useCountDown';
import CircleButtonWithIcon from '../../atoms/CircleButton/CircleButton';
import TimerUnit from '../../atoms/TimerUnit/TimerUnit';
import { ButtonsLayout } from '../../molecules/ButtonsLayout/ButtonsLayout';
import { Button } from '../../ui/button';

const Timer = ({ onClick }: { onClick: () => void }) => {
  const searchParams = useSearchParams();

  const handleSetStart = () => {
    // if (isEditingMode) {
    const {
      hours,
      minutes,
      seconds,
    }: { hours: number; minutes: number; seconds: number } = editTime;
    const convertedEditTime = convertToSeconds(hours, minutes, seconds);
    const params = new URLSearchParams(searchParams.toString());

    if (!hours && !minutes && !seconds) {
      return;
    }

    if (!hours) {
      params.delete('hour');
    } else {
      params.set('hour', hours.toString());
      window.history.pushState(null, '', `?${params.toString()}`);
    }

    if (!minutes) {
      params.delete('minutes');
    } else {
      params.set('minutes', hours.toString());
      window.history.pushState(null, '', `?${params.toString()}`);
    }

    if (!seconds) {
      params.delete('seconds');
    } else {
      params.set('seconds', hours.toString());
      window.history.pushState(null, '', `?${params.toString()}`);
    }

    setSeconds(convertedEditTime);
    toggleRunning(ERunning.RUNNING);

    start();
  };

  const {
    toggleRunning,
    setTime,
    running,
    seconds,
    editTime,
    restartTime,
    setSeconds,
    setRestartTime,
  } = useTimerStore();

  const { convertedSeconds, convertedMinutes, convertedHours } =
    convertSeconds(seconds);

  const { start, pause, restart } = useCountdown();

  const handleRestartMode = () => {
    setSeconds(restartTime);
    restart();
    toggleRunning(ERunning.IDLE);
  };

  return (
    <div className="bg-orange-500 flex items-center gap-4 w-full">
      <ButtonsLayout>
        <Button className="font-semibold" onClick={handleSetStart}>
          Start
        </Button>
        <Button
          className="font-semibold"
          onClick={() => {
            pause();
            toggleRunning(ERunning.PAUSED);
          }}
        >
          Pause
        </Button>

        {(running === ERunning.RUNNING || running === ERunning.PAUSED) && (
          <Button className="font-semibold" onClick={handleRestartMode}>
            Restart
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
          onClick={() => {
            setRestartTime(seconds);
            // addParamsToUrl();
            setTime(5);
          }}
        />
        <CircleButtonWithIcon
          icon={<Minus />}
          onClick={() => {
            setRestartTime(seconds);
            // addParamsToUrl();
            setTime(-5);
          }}
        />
      </ButtonsLayout>
    </div>
  );
};
export default Timer;
