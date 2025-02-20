import { ETimerUnits } from '@/types/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export enum ERunning {
  IDLE = 'idle',
  RUNNING = 'running',
  PAUSED = 'paused',
}

export type TTimeInitialValues = {
  [ETimerUnits.HOURS]: 0;
  [ETimerUnits.MINUTES]: 0;
  [ETimerUnits.SECONDS]: 0;
};

interface ITimerState {
  seconds: number;
  milliseconds: number;
  running: ERunning;

  setSeconds: (value: number | ((prev: number) => number)) => void;
  toggleRunning: (running: ERunning) => void;
}

export const useTimerStore = create<ITimerState>()(
  persist(
    immer((set) => ({
      seconds: 0,
      milliseconds: 0,
      running: ERunning.IDLE,

      setSeconds: (value: number | ((prev: number) => number)) =>
        set((state) => ({
          seconds: typeof value === 'function' ? value(state.seconds) : value,
        })),

      toggleRunning: (running) =>
        set((state) => {
          state.running = running;
        }),
    })),
    {
      name: 'timer-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
