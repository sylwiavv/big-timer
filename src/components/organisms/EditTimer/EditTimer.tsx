import { useState } from 'react';
import { useTimerStore } from '../../../store/TimerStore';
import { ETimerUnits } from '../../../types/types';
import { Button } from '../../ui/button';

export const EditTimer = () => {
  const { seconds, running, setTime, toggleRunning, reset } = useTimerStore();

  const [editSeconds, setEditSeconds] = useState(seconds);

  return (
    <div className="flex flex-col items-center gap-4 p-4 font-sans">
      <form className="keyboard-input-form">
        <fieldset className="keyboard-input-fieldset">
          <label className="label-with-input">
            <input
              type="text"
              pattern="[0-9]*"
              className="hours"
              // value={editHours}
              onChange={(e) => console.log(ETimerUnits.HOURS, e.target.value)}
            />
            <span className="input-label">
              <span className="input-label-text">Hours</span>
            </span>
          </label>
          <span className="divider">:</span>
          <label className="label-with-input">
            <input
              type="text"
              pattern="[0-9]*"
              className="minutes"
              // value={editMinutes}
              onChange={(e) => console.log(ETimerUnits.MINUTES, e.target.value)}
            />
            <span className="input-label">
              <span className="input-label-text">Minutes</span>
            </span>
          </label>
          <span className="divider">:</span>
          <label className="label-with-input">
            <input
              type="text"
              pattern="[0-9]*"
              className="seconds"
              value={editSeconds}
              onChange={(e) => console.log(ETimerUnits.SECONDS, e.target.value)}
            />
            <span className="input-label">
              <span className="input-label-text">Seconds</span>
            </span>
          </label>
        </fieldset>
      </form>
      <div className="flex gap-4 text-4xl font-bold"></div>
      <div className="flex gap-4">
        {/* <Button onClick={toggleRunning}>{running ? 'Pause' : 'Start'}</Button> */}
        {running && <Button onClick={reset}>Reset</Button>}
      </div>
    </div>
  );
};
