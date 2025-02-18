import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export enum ERunning {
  IDLE = 'idle',
  RUNNING = 'running',
  PAUSED = 'paused',
}

interface ITimerState {
  // hours: number;
  // minutes: number;
  restartTime: number;
  seconds: number;
  running: ERunning;
  setTime: (value: number) => void;
  setSeconds: (value: number) => void;
  toggleRunning: (running: ERunning) => void;

  setRestartTime: (time: number) => void;
}

export const useTimerStore = create<ITimerState>()(
  persist(
    immer((set) => ({
      seconds: 0,
      restartTime: 0,

      running: ERunning.IDLE,
      setTime: (value) =>
        set((state) => {
          let { seconds } = state;

          seconds += value;

          console.log(seconds, 'seconds TORAGE');
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
    })),
    {
      name: 'timer-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
