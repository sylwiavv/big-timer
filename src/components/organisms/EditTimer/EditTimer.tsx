'use client';

import { ETimerUnits } from '@/types/types';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  convertSeconds,
  convertToSeconds,
} from '../../../helpers/convert-seconds';
import useCountdown from '../../../hooks/useCountDown';
import { useTimerStore } from '../../../store/TimerStore';
import { getSearchParamas } from '../../../utils/getSearchParams';
import { setTimerSearchParams } from '../../../utils/setTimerSearchParams';
import LabelWithInput from '../../atoms/LabelWithInput/LabelWithInput';
import { Button } from '../../ui/button';

const InputsViarants = [
  { label: ETimerUnits.HOURS, value: 0 },
  { label: ETimerUnits.MINUTES, value: 0 },
  { label: ETimerUnits.SECONDS, value: 0 },
];

const MAX_VALUES = {
  [ETimerUnits.HOURS]: 24,
  [ETimerUnits.MINUTES]: 59,
  [ETimerUnits.SECONDS]: 59,
};

export const EditTimer = ({
  setIsEditingMode,
}: {
  setIsEditingMode: (value: boolean) => void;
}) => {
  const searchParams = useSearchParams();
  const { toggleRunning, setTime, running, seconds, setSeconds } =
    useTimerStore();
  const { start, pause, restart } = useCountdown();

  const [editTime, setEditTime] = useState(InputsViarants);

  const [error, setError] = useState<{
    error: boolean;
    label: ETimerUnits | null;
  }>({
    error: false,
    label: null,
  });

  const handleResetError = () => {
    setError({ error: false, label: null });
  };

  const handleSetError = (unit: ETimerUnits) => {
    setError({
      error: true,
      label: unit,
    });
  };

  const handleEdit = (
    e: React.ChangeEvent<HTMLInputElement>,
    label: ETimerUnits
  ) => {
    handleResetError();
    let value = e.target.value;
    if (value.length > 2) {
      value = value.slice(-2);
    }

    const numericValue = Number(value);

    if (numericValue > MAX_VALUES[label]) {
      handleSetError(label);

      setTimeout(() => {
        setEditTime((prevState) =>
          prevState.map((item) =>
            item.label === label ? { ...item, value: MAX_VALUES[label] } : item
          )
        );

        handleResetError();
      }, 1500);
    }

    setEditTime((prevState) =>
      prevState.map((item) =>
        item.label === label ? { ...item, value: numericValue } : item
      )
    );
  };

  const handleSetStart = () => {
    console.log(editTime);
    setIsEditingMode(false);

    const hours =
      editTime.find((item) => item.label === ETimerUnits.HOURS)?.value || 0;
    const minutes =
      editTime.find((item) => item.label === ETimerUnits.MINUTES)?.value || 0;
    const seconds =
      editTime.find((item) => item.label === ETimerUnits.SECONDS)?.value || 0;

    const convertedEditTime = convertToSeconds(hours, minutes, seconds);

    setTimerSearchParams({
      searchParams,
      seconds: convertedEditTime,
      setSeconds,
    });

    start();

    // if (error.error) {
    //   if (error.label === ETimerUnits.HOURS) {
    //     setEditTime((prevState) =>
    //       prevState.map((item) =>
    //         item.label === error.label
    //           ? { ...item, value: MAX_VALUES[error.label] }
    //           : item
    //       )
    //     );
    //   }
    //   const hours =
    //     editTime.find((item) => item.label === ETimerUnits.HOURS)?.value || 0;
    //   const minutes =
    //     editTime.find((item) => item.label === ETimerUnits.MINUTES)?.value || 0;
    //   const seconds =
    //     editTime.find((item) => item.label === ETimerUnits.SECONDS)?.value || 0;

    //   const convertedEditTime = convertToSeconds(hours, minutes, seconds);

    //   setTimerSearchParams({ searchParams, seconds: convertedEditTime });
    // } else {

    // }
  };

  console.log(editTime);

  useEffect(() => {
    getSearchParamas({ searchParams, setSeconds });
    const { convertedHours, convertedMinutes, convertedSeconds } =
      convertSeconds(seconds);

    setEditTime([
      { label: ETimerUnits.HOURS, value: convertedHours },
      { label: ETimerUnits.MINUTES, value: convertedMinutes },
      { label: ETimerUnits.SECONDS, value: convertedSeconds },
    ]);
  }, []);

  return (
    <div className="flex items-center gap-4 w-full">
      <Button className="font-semibold" onClick={handleSetStart}>
        Start
      </Button>
      <div
        className={`bg-white rounded-lg shadow-lg text-[#392d00] flex w-full justify-center ${
          error.error
            ? 'border-4 border-red-600 bg-red-400'
            : 'border-transparent'
        }`}
      >
        <form>
          <fieldset className={`flex gap-4`}>
            {InputsViarants.map(({ label }) => (
              <LabelWithInput
                key={label}
                label={label}
                value={
                  editTime.find((item) => item.label === label)?.value || 0
                }
                onChange={(e) => handleEdit(e, label)}
              />
            ))}
          </fieldset>
        </form>
      </div>
    </div>
  );
};
