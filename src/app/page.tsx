'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { BigTimer } from '../components/templates/BigTimer';
import { convertSeconds, convertToSeconds } from '../helpers/convert-seconds';
import { useTimerStore } from '../store/TimerStore';

const Home = () => {
  const searchParams = useSearchParams();
  const { seconds, setSeconds } = useTimerStore();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    const { convertedHours, convertedMinutes, convertedSeconds } =
      convertSeconds(seconds);

    if (convertedHours > 0) {
      params.set('hour', convertedHours.toString());
      window.history.pushState(null, '', `?${params.toString()}`);
    }

    if (convertedMinutes > 0) {
      params.set('minutes', convertedMinutes.toString());
      window.history.pushState(null, '', `?${params.toString()}`);
    }

    if (convertedSeconds > 0) {
      params.set('seconds', convertedSeconds.toString());
      window.history.pushState(null, '', `?${params.toString()}`);
    }
  }, [seconds]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    const hours = Number(params.get('hour'));
    const minutes = Number(params.get('minutes'));
    const seconds = Number(params.get('seconds'));

    if (params.size === 0) return;

    const secondsToSet = convertToSeconds(hours, minutes, seconds);

    setSeconds(secondsToSet);
  }, []);

  return (
    <main className="flex items-center justify-center h-screen">
      <BigTimer />
    </main>
  );
};

export default Home;
