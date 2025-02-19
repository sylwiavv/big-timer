import useFormattedTime from '../../../hooks/useFormattedTime';
import { ETimerUnits } from '../../../types/types';

interface ILabelWithInputProps {
  label: ETimerUnits;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LabelWithInput = ({ label, value, onChange }: ILabelWithInputProps) => {
  const { formatTime } = useFormattedTime();

  return (
    <label className="flex flex-col text-right">
      <div className="flex items-center leading-[.90]">
        <input
          pattern="[0-9]*"
          className={`bg-transparent font-bold appearance-textfield w-[1.200em] p-0 text-right text-timerXl bg-[aliceblue] `}
          value={label !== ETimerUnits.HOURS ? formatTime(+value) : value}
          onChange={onChange}
        />
        <span className="text-timerXl">
          {label !== ETimerUnits.SECONDS && <span>:</span>}
        </span>
      </div>

      <span
        className={`text-lg font-light ${label === ETimerUnits.HOURS ? 'pr-0' : 'pr-8'}`}
      >
        {label}
      </span>
    </label>
  );
};

export default LabelWithInput;
