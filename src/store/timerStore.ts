import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { ETimerUnits } from '../types/types';

export enum ERunning {
  IDLE = 'idle',
  RUNNING = 'running',
  PAUSED = 'paused',
}

interface ITimerState {
  hours: number;
  minutes: number;
  seconds: number;
  running: ERunning;
  setTime: (unit: ETimerUnits) => void;
  toggleRunning: (running: ERunning) => void;
  reset: () => void;
}

export const useTimerStore = create<ITimerState>()(
  persist(
    immer((set) => ({
      hours: 0,
      minutes: 0,
      seconds: 0,
      running: ERunning.IDLE,
      setTime: (unit: ETimerUnits) =>
        set((state) => {
          let { hours, minutes, seconds } = state;

          if (unit === ETimerUnits.SECONDS) {
            seconds += 5;
          }

          if (unit === ETimerUnits.MINUTES) {
          }

          if (unit === ETimerUnits.HOURS) {
          }

          return { hours, minutes, seconds };
        }),

      toggleRunning: (running) =>
        set((state) => {
          state.running = running;
        }),

      reset: () =>
        set((state) => {
          state.hours = 0;
          state.minutes = 59;
          state.seconds = 0;
          state.running = ERunning.IDLE;
        }),
    })),
    {
      name: 'timer-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
