'use client';

import { Minus, Plus } from 'lucide-react';
import { convertSeconds } from '../../../helpers/convert-seconds';
import useCountdown from '../../../hooks/useCountDown';
import { ERunning, useTimerStore } from '../../../store/TimerStore';
import { ETimerUnits } from '../../../types/types';
import CircleButtonWithIcon from '../../atoms/CircleButton/CircleButton';
import TimerUnit from '../../atoms/TimerUnit/TimerUnit';
import { ButtonsLayout } from '../../molecules/ButtonsLayout/ButtonsLayout';
import { Button } from '../../ui/button';

const Timer = () => {
  const { reset, toggleRunning, setTime, running, seconds } = useTimerStore();

  const emptyTimer = seconds === 0;

  const { convertedSeconds, convertedMinutes, convertedHours } =
    convertSeconds(seconds);

  const { start, pause, restart } = useCountdown({
    seconds,
    running: running === 'running',
    setTime,
    toggleRunning: (state) =>
      toggleRunning(state ? ERunning.RUNNING : ERunning.PAUSED),
    reset,
  });

  return (
    <>
      {!emptyTimer && (
        <ButtonsLayout>
          <Button
            className="font-semibold"
            // onClick={() =>
            //   toggleRunning(
            //     running === ERunning.RUNNING
            //       ? ERunning.PAUSED
            //       : ERunning.RUNNING
            //   )
            // }
            onClick={start}
          >
            Start
          </Button>
          <Button
            className="font-semibold"
            // onClick={() =>
            //   toggleRunning(
            //     running === ERunning.RUNNING
            //       ? ERunning.PAUSED
            //       : ERunning.RUNNING
            //   )
            // }
            onClick={pause}
          >
            Pause
          </Button>

          {running === ERunning.RUNNING && (
            <Button className="font-semibold" onClick={restart}>
              Reset
            </Button>
          )}
        </ButtonsLayout>
      )}

      <div className="flex bg-[#5080aa]">
        {/* {hours > 0 && <TimerUnit time={hours} unit={ETimerUnits.HOURS} />} */}
        {<TimerUnit time={convertedHours} unit={ETimerUnits.HOURS} />}
        <TimerUnit time={convertedMinutes} unit={ETimerUnits.MINUTES} />
        <TimerUnit time={convertedSeconds} unit={ETimerUnits.SECONDS} />
      </div>

      <ButtonsLayout>
        <CircleButtonWithIcon icon={<Plus />} onClick={() => setTime(5)} />
        <CircleButtonWithIcon icon={<Minus />} onClick={() => setTime(-5)} />
      </ButtonsLayout>
    </>
  );
};
export default Timer;
