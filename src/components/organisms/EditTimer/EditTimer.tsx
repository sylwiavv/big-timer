import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { convertToSeconds } from '../../../helpers/convert-seconds';
import { useTimerStore } from '../../../store/TimerStore';
import { ETimerUnits } from '../../../types/types';
import LabelWithInput from '../../atoms/LabelWithInput/LabelWithInput';

const InputsViarants = [
  { label: ETimerUnits.HOURS, value: 0 },
  { label: ETimerUnits.MINUTES, value: 0 },
  { label: ETimerUnits.SECONDS, value: 0 },
];

export const EditTimer = () => {
  const {
    seconds,
    running,
    setTime,
    toggleRunning,
    setSeconds,
    setRestartTime,
    restartTime,
  } = useTimerStore();

  const [editTimerValues, setEditTimerValues] = useState({
    [ETimerUnits.HOURS]: 0,
    [ETimerUnits.MINUTES]: 0,
    [ETimerUnits.SECONDS]: 0,
  });

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleEdit = (
    e: React.ChangeEvent<HTMLInputElement>,
    label: ETimerUnits
  ) => {
    const value = +e.target.value;

    setEditTimerValues((prevValues) => {
      const newValues = { ...prevValues, [label]: value };

      const seconds = convertToSeconds(
        newValues[ETimerUnits.HOURS],
        newValues[ETimerUnits.MINUTES],
        newValues[ETimerUnits.SECONDS]
      );

      setRestartTime(seconds);

      return newValues;
    });
  };

  return (
    <div className=" bg-white rounded-lg shadow-lg text-[#392d00]">
      <form>
        <fieldset className="flex gap-4">
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
