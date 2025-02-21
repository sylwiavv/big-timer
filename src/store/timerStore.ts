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
  milliseconds: number;
  running: ERunning;

  setMilliseconds: (value: number | ((prev: number) => number)) => void;
  toggleRunning: (running: ERunning) => void;
}

export const useTimerStore = create<ITimerState>()(
  persist(
    immer((set) => ({
      milliseconds: 0,
      running: ERunning.IDLE,

      setMilliseconds: (value: number | ((prev: number) => number)) =>
        set((state) => ({
          milliseconds:
            typeof value === 'function' ? value(state.milliseconds) : value,
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
