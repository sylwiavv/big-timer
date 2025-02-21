import { convertMilliseconds } from '../helpers/convert-seconds';

export const setTimerSearchParams = (
  params: URLSearchParams,
  milliseconds: number
) => {
  const { convertedHoursM, convertedMinutesM, convertedSecondsM } =
    convertMilliseconds(milliseconds);

  convertedHoursM > 0
    ? params.set('hour', convertedHoursM.toString())
    : params.delete('hour');

  convertedMinutesM > 0
    ? params.set('minutes', convertedMinutesM.toString())
    : params.delete('minutes');

  convertedSecondsM > 0
    ? params.set('seconds', convertedSecondsM.toString())
    : params.delete('seconds');
};
