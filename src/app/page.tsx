'use client';

import { BigTimer } from '@/components/templates/BigTimer';
import { convertToSeconds } from '@/helpers/convert-seconds';
import { useTimerStore } from '@/store/TimerStore';
import { setTimerSearchParams } from '@/utils/setTimerSearchParams';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

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
