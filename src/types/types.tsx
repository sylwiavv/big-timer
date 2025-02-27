'use client';

export enum ETimerUnits {
  HOURS = 'hours',
  MINUTES = 'minutes',
  SECONDS = 'seconds',
}

export enum ESearchParams {
  TARGET = 'target',
  HOURS = 'hours',
  MINUTES = 'minutes',
  SECONDS = 'seconds',
}

export type TTimeInitialValues = {
  [ETimerUnits.HOURS]: 0;
  [ETimerUnits.MINUTES]: 0;
  [ETimerUnits.SECONDS]: 0;
};

export type TErrorTimer = {
  error: boolean;
  label: ETimerUnits | null;
};
