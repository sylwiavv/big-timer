'use client';

import useCountdown from '@/hooks/useCountDown';
import { ERunning, useTimerStore } from '@/store/TimerStore';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { EditTimer } from '../organisms/EditTimer/EditTimer';
import Timer from '../organisms/Timer/Timer';

export const BigTimer = () => {
  const searchParams = useSearchParams();

  const {
    toggleRunning,
    setTime,
    running,
    seconds,
    restartTime,
    setSeconds,
    setRestartTime,
  } = useTimerStore();

  const { start, pause, restart } = useCountdown();

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
        // const {
        //   hours,
        //   minutes,
        //   seconds,
        // }: { hours: number; minutes: number; seconds: number } = editTime;
        // const convertedEditTime = convertToSeconds(hours, minutes, seconds);

        // setTimerSearchParams({ searchParams, seconds: convertedEditTime });
        // setRestartTime(convertedEditTime);
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

  const hadnleEditMode = () => {
    if (running === ERunning.RUNNING) {
      pause();
    } else {
      setIsEditingMode(true);
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-6" ref={editTimerRef}>
      {isEditingMode ? <EditTimer /> : <Timer onClick={hadnleEditMode} />}
    </div>
  );
};

export default BigTimer;
