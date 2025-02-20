'use client';

import { convertSeconds } from '@/helpers/convert-seconds';
import { ETimerUnits } from '@/types/types';
import { Minus, Plus } from 'lucide-react';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import useCountdown from '../../../hooks/useCountDown';
import { ERunning, useTimerStore } from '../../../store/TimerStore';
import { setTimerSearchParams } from '../../../utils/setTimerSearchParams';
import CircleButtonWithIcon from '../../atoms/CircleButton/CircleButton';
import TimerUnit from '../../atoms/TimerUnit/TimerUnit';
import { ButtonsLayout } from '../../molecules/ButtonsLayout/ButtonsLayout';
import { Button } from '../../ui/button';

interface ITimerProps {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const handleSetTarget = (
  searchParams: ReadonlyURLSearchParams,
  seconds: number
) => {
  const params = new URLSearchParams(searchParams.toString());

  const targetTime = Math.floor(Date.now() / 1000) + seconds;

  params.set('target', targetTime.toString());

  window.history.pushState(null, '', `?${params.toString()}`);
};

const Timer = ({ onClick }: ITimerProps) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const { toggleRunning, running, seconds, setSeconds } = useTimerStore();

  const { convertedSeconds, convertedMinutes, convertedHours } =
    convertSeconds(seconds);

  const { start, pause, restart } = useCountdown();

  const handleSetStart = () => {
    handleSetTarget(searchParams, seconds);

    start();
  };

  useEffect(() => {
    const targetParam = searchParams.get('target');
    if (targetParam) {
      const targetTime = Number(targetParam);
      const currentTime = Math.floor(Date.now() / 1000);
      const remainingTime = Math.max(targetTime - currentTime, 0);
      setSeconds(remainingTime);
      if (remainingTime > 0) {
        toggleRunning(ERunning.RUNNING);
      }
    }
  }, []);

  const handleRestartMode = () => {
    restart();
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

  console.log(seconds, 'seconds');

  return (
    <div className="flex items-center gap-4 w-full">
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

              params.delete('target');
              window.history.pushState(null, '', `?${params.toString()}`);
            }}
          >
            Pause
          </Button>
        )}
      </ButtonsLayout>

      <div className="flex w-full justify-center" onClick={onClick}>
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
