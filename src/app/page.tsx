'use client';

import { BigTimer } from '@/components/templates/BigTimer';
import { useTimerStore } from '@/store/TimerStore';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getSearchParamas } from '../utils/getSearchParams';
import { setTimerSearchParams } from '../utils/setTimerSearchParams';
import { sixHoursInSeconds } from './constants/constants';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const { seconds, setSeconds } = useTimerStore();

  useEffect(() => {
    if (!seconds) {
      getSearchParamas({ searchParams, setSeconds });
    }

    let secondsFromLocalStorage;
    const storedTime = localStorage.getItem('timer-storage');
    if (storedTime) {
      const timeFromLocalStorage = JSON.parse(storedTime);
      secondsFromLocalStorage = timeFromLocalStorage.state.seconds;
    }

    console.log(searchParams.size === 0 && !secondsFromLocalStorage);
    if (searchParams.size === 0 && !secondsFromLocalStorage) {
      setSeconds(sixHoursInSeconds);
      window.history.replaceState({}, '', `?hours=6`);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    setTimerSearchParams({ searchParams, seconds });
  }, [loading]);

  return (
    <main className="flex items-center justify-center h-screen">
      {loading ? <h1>loading</h1> : <BigTimer />}
    </main>
  );
};

export default Home;
