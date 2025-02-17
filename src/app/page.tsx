'use client';

import { useEffect, useRef, useState } from 'react';
import { EditTimer } from '../components/organisms/EditTimer/EditTimer';
import Timer from '../components/organisms/Timer/Timer';

export default function Home() {
  const [isEditingMode, setIsEditingMode] = useState(false);
  const editTimerRef = useRef<HTMLDivElement>(null);

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

  console.log('isEditingMode', isEditingMode);

  return (
    <main className="flex flex-col gap-4 items-center justify-center h-screen">
      <div
        className="flex gap-4 items-center"
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
    </main>
  );
}
