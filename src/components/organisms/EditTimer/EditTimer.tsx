import { useState } from 'react';
import { useTimerStore } from '../../../store/TimerStore';
import { ETimerUnits } from '../../../types/types';
import LabelWithInput from '../../atoms/LabelWithInput/LabelWithInput';

const InputsViarants = [
  { label: ETimerUnits.HOURS, value: 0 },
  { label: ETimerUnits.MINUTES, value: 0 },
  { label: ETimerUnits.SECONDS, value: 0 },
];

export const EditTimer = () => {
  const { seconds, running, setTime, toggleRunning, reset } = useTimerStore();

  const [editSeconds, setEditSeconds] = useState(seconds);

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg text-[#392d00]">
      <form>
        <fieldset className="flex gap-4">
          {InputsViarants.map(({ label, value }) => (
            <LabelWithInput
              key={label}
              label={label}
              value={value}
              onChange={(e) => console.log(value, e.target.value)}
            />
          ))}
        </fieldset>
      </form>
      <div className="flex gap-4 text-4xl font-bold"></div>
      <div className="flex gap-4">
        {/* <Button onClick={toggleRunning}>{running ? 'Pause' : 'Start'}</Button> */}
        {/* {running && <Button onClick={reset}>Reset</Button>} */}
      </div>
    </div>
  );
};
