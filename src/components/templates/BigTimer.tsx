'use client';

import useCountdown from '@/hooks/useCountDown';
import { useRef, useState } from 'react';
import { ERunning, useTimerStore } from '../../store/TimerStore';
import { ETimerUnits } from '../../types/types';
import { EditTimer } from '../organisms/EditTimer/EditTimer';
import Timer from '../organisms/Timer/Timer';

export const BigTimer = () => {
  const { running, milliseconds } = useTimerStore();

  const { pause } = useCountdown();

  const [isEditingMode, setIsEditingMode] = useState(false);
  const [currentEditingUnit, setCurrentEditingUnit] = useState<ETimerUnits>();

  const editTimerRef = useRef<HTMLDivElement>(null);

  const emptyTimer = milliseconds === 0;

  // I think it should stay here because when timer is running after click on time the timer should stop,
  //  after second click edit timer componet should open
  const hadnleEditMode = (event: React.MouseEvent<HTMLDivElement>) => {
    if (running === ERunning.RUNNING) {
      pause();
    } else {
      setIsEditingMode(true);
      const target = event.target as HTMLElement;
      const unit = target.dataset.unit;
      if (!unit) return;

      setCurrentEditingUnit(unit as ETimerUnits);
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-6" ref={editTimerRef}>
      {isEditingMode ? (
        <EditTimer
          setIsEditingMode={setIsEditingMode}
          ref={editTimerRef}
          isEditingMode={isEditingMode}
          currentEditingUnit={currentEditingUnit}
          setCurrentEditingUnit={setCurrentEditingUnit}
        />
      ) : (
        <Timer onClick={hadnleEditMode} />
      )}
    </div>
  );
};

export default BigTimer;
