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
  setTime: (unit: ETimerUnits, value: number) => void;
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
      setTime: (unit: ETimerUnits, value: number) =>
        set((state) => {
          let { hours, minutes, seconds } = state;

          if (unit === ETimerUnits.SECONDS) {
            seconds += value;
            if (seconds >= 60) {
              minutes += Math.floor(seconds / 60);
              seconds %= 60;
            } else if (seconds < 0) {
              if (minutes > 0) {
                minutes -= 1;
                seconds += 60;
              } else {
                seconds = 0;
              }
            }
          }

          if (unit === ETimerUnits.MINUTES) {
            minutes += value;
            if (minutes >= 60) {
              hours += Math.floor(minutes / 60);
              minutes %= 60;
            } else if (minutes < 0) {
              if (hours > 0) {
                hours -= 1;
                minutes += 60;
              } else {
                minutes = 0;
              }
            }
          }

          if (unit === ETimerUnits.HOURS) {
            hours = Math.max(0, hours + value);
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
          state.minutes = 0;
          state.seconds = 20;
          state.running = ERunning.IDLE;
        }),
    })),
    {
      name: 'timer-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
