import { useCallback } from 'react';

const useFormattedTime = () => {
  const formatTime = useCallback((value: number) => {
    return value < 10 ? `0${value}` : `${value}`;
  }, []);

  return { formatTime };
};

export default useFormattedTime;
