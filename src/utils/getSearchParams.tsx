import { ReadonlyURLSearchParams } from 'next/navigation';
import { convertToSeconds } from '../helpers/convert-seconds';

interface IGetSearchParamasProps {
  searchParams: ReadonlyURLSearchParams;
  setSeconds: (value: number) => void;
}

export const getSearchParamas = ({
  searchParams,
  setSeconds,
}: IGetSearchParamasProps) => {
  const params = new URLSearchParams(searchParams.toString());

  if (params.size === 0) return;

  const hoursFromSearchParams = Number(params.get('hour')) || 0;
  const minutesFromSearchParams = Number(params.get('minutes')) || 0;
  const secondsFromSearchParams = Number(params.get('seconds')) || 0;

  const secondsToSet = convertToSeconds(
    hoursFromSearchParams,
    minutesFromSearchParams,
    secondsFromSearchParams
  );

  setSeconds(secondsToSet);
};
