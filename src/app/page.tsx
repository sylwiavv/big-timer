'use client';

import { BigTimer } from '@/components/templates/BigTimer';
import { useEffect } from 'react';
import useUpdateSearchParams from '../hooks/useUpdateSearchParams';
import { useTimerStore } from '../store/TimerStore';
import { SIX_HOURS_IN_MILLISECONDS } from './constants/constants';

const Home = () => {
  const { updateSearchParams, getValuesFromSearchParams } =
    useUpdateSearchParams();

  const { setMilliseconds } = useTimerStore();

  useEffect(() => {
    const searchParamsValues = getValuesFromSearchParams();
    const storedTime = localStorage.getItem('timer-storage');
    const secondsFromLocalStorage = storedTime
      ? JSON.parse(storedTime).state.milliseconds
      : null;

    if (searchParamsValues) {
      const { hours, minutes, seconds, target } = searchParamsValues;
      updateSearchParams({ hours, minutes, seconds, target });
    } else if (secondsFromLocalStorage === 0) {
      setMilliseconds(SIX_HOURS_IN_MILLISECONDS);

      updateSearchParams({ hours: 6 });
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
