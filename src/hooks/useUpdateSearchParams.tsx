import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ESearchParams, ETimerUnits } from '../types/types';

interface ISearchParamsProps {
  hours: number;
  minutes?: number;
  seconds?: number;
  target?: number;
}

const useUpdateSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const updateSearchParams = ({
    hours,
    minutes,
    seconds,
    target,
  }: ISearchParamsProps) => {
    hours > 0
      ? params.set(ETimerUnits.HOURS, hours.toString())
      : params.delete(ETimerUnits.HOURS);

    minutes && minutes > 0
      ? params.set(ETimerUnits.MINUTES, minutes.toString())
      : params.delete(ETimerUnits.MINUTES);

    seconds && seconds > 0
      ? params.set(ETimerUnits.SECONDS, seconds.toString())
      : params.delete(ETimerUnits.SECONDS);

    target
      ? params.set(ESearchParams.TARGET, target.toString())
      : params.delete(ESearchParams.TARGET);

    router.push(`${pathname}?${params.toString()}`);
  };

  const getValuesFromSearchParams = () => {
    if (params.size === 0) return null;

    return {
      hours: Number(params.get(ETimerUnits.HOURS)) || 0,
      minutes: Number(params.get(ETimerUnits.MINUTES)) || 0,
      seconds: Number(params.get(ETimerUnits.SECONDS)) || 0,
      target: params.has(ESearchParams.TARGET)
        ? Number(params.get(ESearchParams.TARGET))
        : undefined,
    };
  };

  return { updateSearchParams, getValuesFromSearchParams };
};
export default useUpdateSearchParams;
