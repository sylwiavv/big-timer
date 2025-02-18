import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { ETimerUnits } from '../types/types';

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
  // hours: number;
  // minutes: number;
  restartTime: number;
  seconds: number;
  running: ERunning;
  editTime: TTimeInitialValues;
  setTime: (value: number) => void;
  setSeconds: (value: number) => void;
  toggleRunning: (running: ERunning) => void;

  setRestartTime: (time: number) => void;
  setEditTime: (
    updateFn: (prevValues: TTimeInitialValues) => TTimeInitialValues
  ) => void;
}

export const useTimerStore = create<ITimerState>()(
  persist(
    immer((set) => ({
      seconds: 0,
      restartTime: 0,

      running: ERunning.IDLE,
      editTime: {
        [ETimerUnits.HOURS]: 0,
        [ETimerUnits.MINUTES]: 0,
        [ETimerUnits.SECONDS]: 0,
      },
      setTime: (value) =>
        set((state) => {
          let { seconds } = state;

          seconds += value;

          return { seconds };
        }),

      setSeconds: (value) =>
        set((state) => {
          state.seconds = value;
        }),

      toggleRunning: (running) =>
        set((state) => {
          state.running = running;
        }),

      setRestartTime: (time) =>
        set((state) => {
          state.restartTime = time;
          // state.hours = 0;
          // state.minutes = 0;
          // state.running = ERunning.IDLE;
        }),
      setEditTime: (
        updateFn: (prevValues: TTimeInitialValues) => TTimeInitialValues
      ) =>
        set((state) => ({
          editTime: updateFn(state.editTime),
        })),
    })),
    {
      name: 'timer-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
