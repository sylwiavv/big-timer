'use client';

import { BigTimer } from '@/components/templates/BigTimer';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTimerStore } from '../store/TimerStore';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const { milliseconds, setMili } = useTimerStore();

  useEffect(() => {
    // if (!milliseconds) {
    //   getSearchParamas({ searchParams, setMili });
    // }

    // let secondsFromLocalStorage;
    // const storedTime = localStorage.getItem('timer-storage');
    // if (storedTime) {
    //   const timeFromLocalStorage = JSON.parse(storedTime);
    //   secondsFromLocalStorage = timeFromLocalStorage.state.seconds;
    // }

    // if (searchParams.size === 0 && !secondsFromLocalStorage) {
    //   setMili(SIX_HOURS_IN_MILLISECONDS);
    //   window.history.replaceState({}, '', `?hours=6`);
    // }
    setLoading(false);
  }, []);

  // useEffect(() => {
  //   updateSearchParams(searchParams, [
  //     (params) => setTimerSearchParams(params, milliseconds),
  //   ]);
  // }, [loading]);

  return (
    <main className="flex items-center justify-center h-screen">
      {loading ? <h1>loading</h1> : <BigTimer />}
    </main>
  );
};

export default Home;
