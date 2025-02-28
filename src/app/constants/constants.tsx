import { ETimerUnits } from '../../types/types';

export const SIX_HOURS_IN_MILLISECONDS = 21600 * 1000;

export const TIMER_MAX_VALUES = {
  [ETimerUnits.HOURS]: 24,
  [ETimerUnits.MINUTES]: 59,
  [ETimerUnits.SECONDS]: 59,
};
