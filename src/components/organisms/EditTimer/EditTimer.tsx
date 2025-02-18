'use client';

import { useState } from 'react';
import { ETimerUnits } from '../../../types/types';
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

export const EditTimer = () => {
  const [editTimerValues, setEditTimerValues] = useState({
    [ETimerUnits.HOURS]: 0,
    [ETimerUnits.MINUTES]: 0,
    [ETimerUnits.SECONDS]: 0,
  });

  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const { replace } = useRouter();

  const [error, setError] = useState(false);

  const handleEdit = (
    e: React.ChangeEvent<HTMLInputElement>,
    label: ETimerUnits
  ) => {
    setError(false);

    console.log(label, 'LABEL');
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 2) {
      value = value.slice(-2);
    }

    const numericValue = Number(value);

    if (numericValue > MAX_VALUES[label]) {
      setError(true);

      setTimeout(() => {
        setEditTimerValues((prevValues) => ({
          ...prevValues,
          [label]: MAX_VALUES[label],
        }));
        setError(false);
      }, 1500);
    }

    setEditTimerValues((prevValues) => ({
      ...prevValues,
      [label]: numericValue,
    }));
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-lg text-[#392d00] ${
        error ? 'border-4 border-red-600 bg-red-400' : 'border-transparent'
      }`}
    >
      <form>
        <fieldset className={`flex gap-4`}>
          {InputsViarants.map(({ label }) => (
            <LabelWithInput
              key={label}
              label={label}
              value={editTimerValues[label]}
              onChange={(e) => handleEdit(e, label)}
            />
          ))}
        </fieldset>
      </form>
    </div>
  );
};
