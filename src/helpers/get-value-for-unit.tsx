import { ETimerUnits } from '../types/types';

const getValueForUnit = (
  unit: ETimerUnits,
  editTime: Array<{ label: ETimerUnits; value: number }>
) => editTime.find((item) => item.label === unit)?.value || 0;

export default getValueForUnit;
