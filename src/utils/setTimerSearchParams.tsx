import { ReadonlyURLSearchParams } from 'next/navigation';
import { convertSeconds } from '../helpers/convert-seconds';
interface ITimerSearchParams {
  searchParams: ReadonlyURLSearchParams;
  seconds: number;
}
export const setTimerSearchParams = ({
  searchParams,
  seconds,
}: ITimerSearchParams) => {
  const params = new URLSearchParams(searchParams.toString());

  const { convertedHours, convertedMinutes, convertedSeconds } =
    convertSeconds(seconds);

  if (convertedHours > 0) {
    params.set('hour', convertedHours.toString());
  } else {
    params.delete('hour');
  }

  if (convertedMinutes > 0) {
    params.set('minutes', convertedMinutes.toString());
  } else {
    params.delete('minutes');
  }

  if (convertedSeconds > 0) {
    params.set('seconds', convertedSeconds.toString());
  } else {
    params.delete('seconds');
  }

  window.history.pushState(null, '', `?${params.toString()}`);
};
