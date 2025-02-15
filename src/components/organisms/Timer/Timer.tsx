'use client';

import { Minus, Plus } from 'lucide-react';
import { ERunning, useTimerStore } from '../../../store/timerStore';
import { ETimerUnits } from '../../../types/types';
import CircleButtonWithIcon from '../../atoms/CircleButton/CircleButton';
import TimerUnit from '../../atoms/TimerUnit/TimerUnit';
import { ButtonsLayout } from '../../molecules/ButtonsLayout/ButtonsLayout';
import { Button } from '../../ui/button';

const Timer = () => {
  const { reset, toggleRunning, setTime, running, seconds, hours, minutes } =
    useTimerStore();

  const emptyTimer = seconds === 0 && minutes === 0 && hours === 0;

  return (
    <div className="flex gap-4 items-center justify-center">
      {!emptyTimer && (
        <ButtonsLayout>
          <Button
            className="font-semibold"
            onClick={() =>
              toggleRunning(
                running === ERunning.RUNNING
                  ? ERunning.PAUSED
                  : ERunning.RUNNING
              )
            }
          >
            {running === ERunning.RUNNING ? 'Pause' : 'Start'}
          </Button>

          {running === ERunning.RUNNING && (
            <Button className="font-semibold" onClick={reset}>
              Reset
            </Button>
          )}
        </ButtonsLayout>
      )}

      <div className="flex items-center justify-center">
        <TimerUnit time={hours} unit={ETimerUnits.HOURS} />
        <TimerUnit time={minutes} unit={ETimerUnits.MINUTES} />
        <TimerUnit time={seconds} unit={ETimerUnits.SECONDS} />
      </div>

      <ButtonsLayout>
        <CircleButtonWithIcon
          icon={<Plus />}
          onClick={() => setTime(ETimerUnits.SECONDS, 5)}
        />
        <CircleButtonWithIcon
          icon={<Minus />}
          onClick={() => setTime(ETimerUnits.SECONDS, -5)}
        />
      </ButtonsLayout>
    </div>
  );
};

export default Timer;
