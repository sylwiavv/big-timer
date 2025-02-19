'use client';

import useCountdown from '@/hooks/useCountDown';
import { useRef, useState } from 'react';
import { ERunning, useTimerStore } from '../../store/TimerStore';
import { EditTimer } from '../organisms/EditTimer/EditTimer';
import Timer from '../organisms/Timer/Timer';

export const BigTimer = () => {
  const { running, seconds } = useTimerStore();

  const { pause } = useCountdown();

  const [isEditingMode, setIsEditingMode] = useState(false);

  const editTimerRef = useRef<HTMLDivElement>(null);

  const emptyTimer = seconds === 0;

  // I think it should stay here because when timer is running after click on time the timer should stop, after second click edit timer componet should open
  const hadnleEditMode = () => {
    if (running === ERunning.RUNNING) {
      pause();
    } else {
      setIsEditingMode(true);
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-6" ref={editTimerRef}>
      {isEditingMode ? (
        <EditTimer
          setIsEditingMode={setIsEditingMode}
          ref={editTimerRef}
          isEditingMode={isEditingMode}
        />
      ) : (
        <Timer onClick={hadnleEditMode} />
      )}
    </div>
  );
};

export default BigTimer;
