import { ReadonlyURLSearchParams } from 'next/navigation';
import { convertToMilliseconds } from '../helpers/convert-seconds';

interface IGetSearchParamasProps {
  searchParams: ReadonlyURLSearchParams;
  setMili?: (value: number) => void;
}

export const getSearchParamas = ({
  searchParams,
  setMili,
}: IGetSearchParamasProps) => {
  const params = new URLSearchParams(searchParams.toString());

  if (params.size === 0) return;

  const hoursFromSearchParams = Number(params.get('hour')) || 0;
  const minutesFromSearchParams = Number(params.get('minutes')) || 0;
  const secondsFromSearchParams = Number(params.get('seconds')) || 0;

  const miilli = convertToMilliseconds(
    hoursFromSearchParams,
    minutesFromSearchParams,
    secondsFromSearchParams
  );

  if (!setMili) return;

  setMili && setMili(miilli);
};
