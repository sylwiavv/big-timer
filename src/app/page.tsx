'use client';

import { BigTimer } from '@/components/templates/BigTimer';
import { useEffect } from 'react';
import { convertToMilliseconds } from '../helpers/convert-seconds';
import useCountdown from '../hooks/useCountDown';
import useUpdateSearchParams from '../hooks/useUpdateSearchParams';
import { useTimerStore } from '../store/TimerStore';
import { SIX_HOURS_IN_MILLISECONDS } from './constants/constants';

const Home = () => {
  const { updateSearchParams, getValuesFromSearchParams } =
    useUpdateSearchParams();

  const { setMilliseconds } = useTimerStore();
  const { start } = useCountdown();

  useEffect(() => {
    const searchParamsValues = getValuesFromSearchParams();
    const storedTime = localStorage.getItem('timer-storage');
    const secondsFromLocalStorage = storedTime
      ? JSON.parse(storedTime).state.milliseconds
      : null;

    if (searchParamsValues) {
      const { hours, minutes, seconds, target } = searchParamsValues;
      const totalMilliseconds = convertToMilliseconds(hours, minutes, seconds);
      setMilliseconds(totalMilliseconds);

      if (target) {
        if (!target) return;

        const targetTime = parseInt(target.toString(), 10);
        const remainingTime = targetTime - Date.now();

        if (remainingTime) {
          setMilliseconds(remainingTime);

          start();
        }
      }
      //TODO: change a logic
    } else {
      setMilliseconds(SIX_HOURS_IN_MILLISECONDS);

      updateSearchParams({ hours: 6 });
    }
  }, []);

  return (
    <main className="flex items-center justify-center h-screen">
      <BigTimer />
    </main>
  );
};

export default Home;
