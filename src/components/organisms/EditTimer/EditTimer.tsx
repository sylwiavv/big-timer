'use client';

import { ETimerUnits } from '@/types/types';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { RefObject, useEffect, useState } from 'react';
import {
  convertMilliseconds,
  convertToMilliseconds,
} from '../../../helpers/convert-seconds';
import { setTargetIntoSearchParams } from '../../../helpers/set-target-search-params';
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

interface IEditTimerProps {
  isEditingMode: boolean;
  setIsEditingMode: (value: boolean) => void;
  ref: RefObject<HTMLDivElement | null>;
  currentEditingUnit?: ETimerUnits;
  setCurrentEditingUnit: (unit: ETimerUnits) => void;
}

type TErrorTimer = {
  error: boolean;
  label: ETimerUnits | null;
};

export const updateSearchParams = (
  searchParams: ReadonlyURLSearchParams,
  updateFns: ((params: URLSearchParams) => void)[]
) => {
  const params = new URLSearchParams(searchParams.toString());

  updateFns.forEach((updateFn) => updateFn(params)); // Wykonujemy wszystkie funkcje modyfikujące

  window.history.pushState(null, '', `?${params.toString()}`); // Aktualizujemy URL
};

export const EditTimer = ({
  isEditingMode,
  setIsEditingMode,
  ref,
  currentEditingUnit,
  setCurrentEditingUnit,
}: IEditTimerProps) => {
  const searchParams = useSearchParams();
  const { milliseconds, setMili } = useTimerStore();
  const { start } = useCountdown();

  const [editTime, setEditTime] = useState(InputsViarants);

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

  const hadnleEditMode = (value: boolean) => {
    setIsEditingMode(value);
  };

  const handleEdit = (
    e: React.ChangeEvent<HTMLInputElement>,
    label: ETimerUnits
  ) => {
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
      }, 2500);
    } else {
      handleResetError();
    }

    setEditTime((prevState) =>
      prevState.map((item) =>
        item.label === label ? { ...item, value: numericValue } : item
      )
    );
  };

  const handleSetStart = () => {
    hadnleEditMode(false);

    if (error.error) return;

    const hours =
      editTime.find((item) => item.label === ETimerUnits.HOURS)?.value || 0;
    const minutes =
      editTime.find((item) => item.label === ETimerUnits.MINUTES)?.value || 0;
    const seconds =
      editTime.find((item) => item.label === ETimerUnits.SECONDS)?.value || 0;

    const convertedEditTime = convertToMilliseconds(hours, minutes, seconds);
    const targetTimestamp = Date.now() + convertedEditTime;

    updateSearchParams(searchParams, [
      (params) => setTimerSearchParams(params, convertedEditTime),
      (params) => setTargetIntoSearchParams(params, targetTimestamp),
    ]);

    setMili(convertedEditTime);

    start();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        hadnleEditMode(false);
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

  useEffect(() => {
    getSearchParamas({ searchParams, setMili });

    const { convertedHoursM, convertedMinutesM, convertedSecondsM } =
      convertMilliseconds(milliseconds);

    setEditTime([
      { label: ETimerUnits.HOURS, value: convertedHoursM },
      { label: ETimerUnits.MINUTES, value: convertedMinutesM },
      { label: ETimerUnits.SECONDS, value: convertedSecondsM },
    ]);
  }, []);

  const handleOnClick = (label: ETimerUnits) => {
    setCurrentEditingUnit(label);
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
