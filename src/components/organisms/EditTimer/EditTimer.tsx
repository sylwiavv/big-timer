'use client';

import { ETimerUnits } from '@/types/types';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { convertToSeconds } from '../../../helpers/convert-seconds';
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

export const EditTimer = () => {
  const searchParams = useSearchParams();

  const [editTime, setEditTime] = useState(InputsViarants);

  const [error, setError] = useState(false);

  const handleEdit = (
    e: React.ChangeEvent<HTMLInputElement>,
    label: ETimerUnits
  ) => {
    setError(false);

    let value = e.target.value;
    if (value.length > 2) {
      value = value.slice(-2);
    }

    const numericValue = Number(value);

    if (numericValue > MAX_VALUES[label]) {
      setError(true);

      setTimeout(() => {
        setEditTime((prevState) =>
          prevState.map((item) =>
            item.label === label ? { ...item, value: MAX_VALUES[label] } : item
          )
        );

        setError(false);
      }, 1500);
    }

    setEditTime((prevState) =>
      prevState.map((item) =>
        item.label === label ? { ...item, value: numericValue } : item
      )
    );
  };

  const handleSetStart = () => {
    const timeObject = Object.fromEntries(
      editTime.map(({ label, value }) => [label, value])
    );
    const { hours, minutes, seconds } = timeObject;

    const convertedTime = convertToSeconds(hours, minutes, seconds);
    setTimerSearchParams({ searchParams, seconds: convertedTime });
  };

  return (
    <div className="flex items-center gap-4 w-full bg-pink-500">
      <Button className="font-semibold" onClick={handleSetStart}>
        Start
      </Button>
      <div
        className={`bg-white rounded-lg shadow-lg text-[#392d00] flex w-full justify-center ${
          error ? 'border-4 border-red-600 bg-red-400' : 'border-transparent'
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
