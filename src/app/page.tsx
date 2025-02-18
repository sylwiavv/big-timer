'use client';

import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { BigTimer } from '../components/templates/BigTimer';
import { convertSeconds, convertToSeconds } from '../helpers/convert-seconds';
import { useTimerStore } from '../store/TimerStore';

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

const Home = () => {
  const searchParams = useSearchParams();
  const { seconds, setSeconds, restartTime, setRestartTime, setEditTime } =
    useTimerStore();

  useEffect(() => {
    setTimerSearchParams({ searchParams, seconds });
  }, [restartTime]);

  useEffect(() => {
    if (!seconds) {
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
      setRestartTime(secondsToSet);
      setEditTime(() => ({ hours: 0, minutes: 0, seconds: 0 }));
    }
  }, []);

  return (
    <main className="flex items-center justify-center h-screen">
      <BigTimer />
    </main>
  );
};

export default Home;
