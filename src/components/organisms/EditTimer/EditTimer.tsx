'use client';

import { TTimeInitialValues, useTimerStore } from '@/store/TimerStore';
import { ETimerUnits } from '@/types/types';
import { RefObject, useState } from 'react';
import LabelWithInput from '../../atoms/LabelWithInput/LabelWithInput';

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
  ref,
}: {
  ref: RefObject<HTMLDivElement | null>;
}) => {
  const { editTime, setEditTime } = useTimerStore();
  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const { replace } = useRouter();

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
    console.log(editTime, 'EDIT', numericValue);

    if (numericValue > MAX_VALUES[label]) {
      setError(true);

      setTimeout(() => {
        setEditTime((prevValues) => ({
          ...prevValues,
          [label]: MAX_VALUES[label],
        }));
        setError(false);
      }, 1500);
    }

    setEditTime((prevValues: TTimeInitialValues) => ({
      ...prevValues,
      [label]: numericValue,
    }));
  };

  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-lg text-[#392d00] flex w-full justify-center ${
        error ? 'border-4 border-red-600 bg-red-400' : 'border-transparent'
      }`}
      ref={ref}
    >
      <form>
        <fieldset className={`flex gap-4`}>
          {InputsViarants.map(({ label }) => (
            <LabelWithInput
              key={label}
              label={label}
              value={editTime[label]}
              onChange={(e) => handleEdit(e, label)}
            />
          ))}
        </fieldset>
      </form>
    </div>
  );
};
