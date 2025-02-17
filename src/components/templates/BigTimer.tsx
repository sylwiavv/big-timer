'use client';

import { Minus, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import useCountdown from '../../hooks/useCountDown';
import { ERunning, useTimerStore } from '../../store/TimerStore';
import CircleButtonWithIcon from '../atoms/CircleButton/CircleButton';
import { ButtonsLayout } from '../molecules/ButtonsLayout/ButtonsLayout';
import { EditTimer } from '../organisms/EditTimer/EditTimer';
import Timer from '../organisms/Timer/Timer';
import { Button } from '../ui/button';

export const BigTimer = () => {
  const {
    toggleRunning,
    setTime,
    running,
    seconds,
    restartTime,
    setSeconds,
    setRestartTime,
  } = useTimerStore();

  const { start, pause, restart } = useCountdown({
    seconds,
    running: running === 'running',
    setTime,
    toggleRunning: (state) =>
      toggleRunning(state ? ERunning.RUNNING : ERunning.PAUSED),
  });

  const [isEditingMode, setIsEditingMode] = useState(false);
  const editTimerRef = useRef<HTMLDivElement>(null);

  const emptyTimer = seconds === 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        editTimerRef.current &&
        !editTimerRef.current.contains(event.target as Node)
      ) {
        setIsEditingMode(false);
      }
    };

    if (isEditingMode) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditingMode]);

  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns:
          'minmax(50px, 200px) minmax(310px, 1200px) minmax(50px, 200px)',
      }}
    >
      <ButtonsLayout>
        <Button
          className="font-semibold"
          onClick={() => {
            start();
            toggleRunning(ERunning.RUNNING);
          }}
        >
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
          <Button
            className="font-semibold"
            onClick={() => {
              // setTime(+secondsFromSearchParams);
              restart();
              toggleRunning(ERunning.IDLE);
            }}
          >
            Reset
          </Button>
        )}
      </ButtonsLayout>
      <div
        className="flex flex-col items-center"
        onClick={() => setIsEditingMode(true)}
      >
        {isEditingMode ? (
          <div ref={editTimerRef}>
            <EditTimer />
          </div>
        ) : (
          <Timer />
        )}
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

export default BigTimer;
