'use client';

import { convertMilliseconds } from '@/helpers/convert-seconds';
import { ETimerUnits } from '@/types/types';
import { Minus, Plus } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { setTargetIntoSearchParams } from '../../../helpers/set-target-search-params';
import useCountdown from '../../../hooks/useCountDown';
import { ERunning, useTimerStore } from '../../../store/TimerStore';
import { setTimerSearchParams } from '../../../utils/setTimerSearchParams';
import CircleButtonWithIcon from '../../atoms/CircleButton/CircleButton';
import TimerUnit from '../../atoms/TimerUnit/TimerUnit';
import { ButtonsLayout } from '../../molecules/ButtonsLayout/ButtonsLayout';
import { Button } from '../../ui/button';
import { updateSearchParams } from '../EditTimer/EditTimer';

interface ITimerProps {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Timer = ({ onClick }: ITimerProps) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const { toggleRunning, running, milliseconds, setMili } = useTimerStore();

  const { convertedHoursM, convertedMinutesM, convertedSecondsM } =
    convertMilliseconds(milliseconds);

  const { start, pause, restart } = useCountdown();

  const handleSetStart = () => {
    updateSearchParams(searchParams, [
      // (params) => setTimerSearchParams(params, milliseconds),
      (params) => setTargetIntoSearchParams(params, milliseconds),
    ]);
    start();
  };

  useEffect(() => {
    const targetParam = searchParams.get('target');
    if (targetParam) {
      const targetTime = Number(targetParam);
      const currentTime = Date.now();
      const remainingTime = targetTime - currentTime;

      if (remainingTime > 0) {
        // setMili(remainingTime);
        toggleRunning(ERunning.RUNNING);
      }
    }
  }, []);

  const handleRestartMode = () => {
    restart();
  };

  const handleTimeChange = (type: 'plus' | 'minus') => {
    let value = milliseconds < 59000 ? 5000 : 15000;
    let valueToHandle = type === 'plus' ? value : -value;
    let updatedMilliseconds = milliseconds + valueToHandle;

    if (updatedMilliseconds < 0) return;

    setMili(updatedMilliseconds);

    updateSearchParams(searchParams, [
      (params) => setTimerSearchParams(params, milliseconds),
      (params) => setTargetIntoSearchParams(params, milliseconds),
    ]);
  };

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
        <TimerUnit time={convertedHoursM} unit={ETimerUnits.HOURS} />
        <TimerUnit time={convertedMinutesM} unit={ETimerUnits.MINUTES} />
        <TimerUnit time={convertedSecondsM} unit={ETimerUnits.SECONDS} />
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
