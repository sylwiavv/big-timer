'use client';

import { Minus, Plus } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { setTimerSearchParams } from '../../app/page';
import { convertToSeconds } from '../../helpers/convert-seconds';
import useCountdown from '../../hooks/useCountDown';
import { ERunning, useTimerStore } from '../../store/TimerStore';
import CircleButtonWithIcon from '../atoms/CircleButton/CircleButton';
import { ButtonsLayout } from '../molecules/ButtonsLayout/ButtonsLayout';
import { EditTimer } from '../organisms/EditTimer/EditTimer';
import Timer from '../organisms/Timer/Timer';
import { Button } from '../ui/button';

export const BigTimer = () => {
  const searchParams = useSearchParams();

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
        const {
          hours,
          minutes,
          seconds,
        }: { hours: number; minutes: number; seconds: number } = editTime;
        const convertedEditTime = convertToSeconds(hours, minutes, seconds);

        setTimerSearchParams({ searchParams, seconds: convertedEditTime });
        setRestartTime(convertedEditTime);

        console.log('KLIKAM START', convertedEditTime);
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

  const hadnleEditMode = () => {
    if (running === ERunning.RUNNING) {
      pause();
    } else {
      setIsEditingMode(true);
    }
  };

  const handleRestartMode = () => {
    console.log(restartTime, 'RESTART TIME');
    setSeconds(restartTime);
    restart();
    toggleRunning(ERunning.IDLE);
  };

  return (
    <div className="flex w-full">
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
      <div className="flex flex-col items-center w-full">
        {isEditingMode ? (
          <EditTimer ref={editTimerRef} />
        ) : (
          <Timer onClick={hadnleEditMode} />
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
