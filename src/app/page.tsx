'use client';

import { BigTimer } from '@/components/templates/BigTimer';
import { convertToSeconds } from '@/helpers/convert-seconds';
import { useTimerStore } from '@/store/TimerStore';
import { setTimerSearchParams } from '@/utils/setTimerSearchParams';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface IGetSearchParamas {
  searchParams: ReadonlyURLSearchParams;
  setSeconds: (value: number) => void;
}

export const getSearchParamas = ({
  searchParams,
  setSeconds,
}: IGetSearchParamas) => {
  const params = new URLSearchParams(searchParams.toString());

  if (params.size === 0) return;

  const hoursFromSearchParams = Number(params.get('hour'));
  const minutesFromSearchParams = Number(params.get('minutes'));
  const secondsFromSearchParams = Number(params.get('seconds'));

  const secondsToSet = convertToSeconds(
    hoursFromSearchParams,
    minutesFromSearchParams,
    secondsFromSearchParams
  );

  setSeconds(secondsToSet);
};

const Home = () => {
  const searchParams = useSearchParams();
  const { seconds, setSeconds } = useTimerStore();

  useEffect(() => {
    if (!seconds) {
      getSearchParamas({ searchParams, setSeconds });
    } else {
      setTimerSearchParams({ searchParams, seconds });
    }
  }, []);

  return (
    <main className="flex items-center justify-center h-screen">
      <BigTimer />
    </main>
  );
};

export default Home;
