'use client';

import { ETimerUnits, TErrorTimer } from '@/types/types';
import { RefObject, useEffect, useRef, useState } from 'react';
import { TIMER_MAX_VALUES } from '../../../app/constants/constants';
import {
  convertMilliseconds,
  convertToMilliseconds,
} from '../../../helpers/convert-seconds';
import getValueForUnit from '../../../helpers/get-value-for-unit';
import useCountdown from '../../../hooks/useCountDown';
import useUpdateSearchParams from '../../../hooks/useUpdateSearchParams';
import { useTimerStore } from '../../../store/TimerStore';
import LabelWithInput from '../../atoms/LabelWithInput/LabelWithInput';
import { Button } from '../../ui/button';

const InputsViarants = [
  { label: ETimerUnits.HOURS, value: 0 },
  { label: ETimerUnits.MINUTES, value: 0 },
  { label: ETimerUnits.SECONDS, value: 0 },
];

interface IEditTimerProps {
  isEditingMode: boolean;
  setIsEditingMode: (value: boolean) => void;
  ref: RefObject<HTMLDivElement | null>;
  currentEditingUnit?: ETimerUnits;
  setCurrentEditingUnit: (unit: ETimerUnits) => void;
}

export const EditTimer = ({
  isEditingMode,
  setIsEditingMode,
  ref,
  currentEditingUnit,
  setCurrentEditingUnit,
}: IEditTimerProps) => {
  const { updateSearchParams } = useUpdateSearchParams();

  const { milliseconds, setMilliseconds } = useTimerStore();
  const { start } = useCountdown();

  const { convertedHoursM, convertedMinutesM, convertedSecondsM } =
    convertMilliseconds(milliseconds);

  const [editTime, setEditTime] = useState([
    { label: ETimerUnits.HOURS, value: convertedHoursM },
    { label: ETimerUnits.MINUTES, value: convertedMinutesM },
    { label: ETimerUnits.SECONDS, value: convertedSecondsM },
  ]);

  const [error, setError] = useState<TErrorTimer>({
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

  const handleOnClick = (label: ETimerUnits) => {
    setCurrentEditingUnit(label);
  };

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleEdit = (
    e: React.ChangeEvent<HTMLInputElement>,
    label: ETimerUnits
  ) => {
    const value = e.target.value;
    const truncatedValue = value.length > 2 ? value.slice(-2) : value;
    const numericValue = Number(truncatedValue);

    if (timeoutRef.current) {
      handleResetError();

      clearTimeout(timeoutRef.current);
    }

    if (numericValue > TIMER_MAX_VALUES[label]) {
      handleSetError(label);

      timeoutRef.current = setTimeout(() => {
        setEditTime((prevState) =>
          prevState.map((item) =>
            item.label === label
              ? { ...item, value: TIMER_MAX_VALUES[label] }
              : item
          )
        );
        handleResetError();
      }, 2000);
    } else {
      handleResetError();
    }

    setEditTime((prevState) =>
      prevState.map((item) =>
        item.label === label ? { ...item, value: numericValue } : item
      )
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsEditingMode(false);
      }
    };

    if (isEditingMode) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditingMode]);

  const handleSetStart = () => {
    if (error.error) return;

    setIsEditingMode(false);

    const hours = getValueForUnit(ETimerUnits.HOURS, editTime);
    const minutes = getValueForUnit(ETimerUnits.MINUTES, editTime);
    const seconds = getValueForUnit(ETimerUnits.SECONDS, editTime);

    const convertedEditTime = convertToMilliseconds(hours, minutes, seconds);
    const target = Date.now() + convertedEditTime;

    updateSearchParams({ hours, minutes, seconds, target });
    setMilliseconds(convertedEditTime);

    start();
  };

  return (
    <div className="flex items-center gap-4 w-full">
      <Button className="font-semibold" onClick={handleSetStart}>
        Start
      </Button>
      <div
        className={`rounded-lg shadow-lg text-[#392d00] flex w-full justify-center p-4 transition-background-color duration-300 ease-in-out ${
          error.error
            ? 'border-4 border-red-600 bg-red-400'
            : 'border-transparent bg-white'
        }`}
      >
        <form>
          <fieldset className={`flex gap-4`}>
            {InputsViarants.map(({ label }) => (
              <LabelWithInput
                className={`${currentEditingUnit === label ? 'bg-yellow-200' : 'transparent'}`}
                key={label}
                label={label}
                value={
                  editTime.find((item) => item.label === label)?.value || 0
                }
                onChange={(e) => handleEdit(e, label)}
                onClick={() => handleOnClick(label)}
              />
            ))}
          </fieldset>
        </form>
      </div>
    </div>
  );
};
