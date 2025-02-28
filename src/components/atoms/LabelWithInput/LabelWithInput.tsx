import useFormattedTime from '../../../hooks/useFormattedTime';
import { ETimerUnits } from '../../../types/types';

interface ILabelWithInputProps {
  label: ETimerUnits;
  value: number;
  className: string;

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
}

const LabelWithInput = ({
  label,
  value,
  className,

  onChange,
  onClick,
}: ILabelWithInputProps) => {
  const { formatTime } = useFormattedTime();

  return (
    <label className={`flex flex-col text-right`}>
      <div className="flex items-center leading-[.90]">
        <input
          pattern="[0-9]*"
          className={`bg-transparent font-semibold appearance-textfield w-[1.400em] p-0 text-right text-timerXl border-0 outline-none rounded-lg pr-2 focus:bg-yellow-200 transition-all duration-300 ${className}`}
          value={label !== ETimerUnits.HOURS ? formatTime(+value) : value}
          onChange={onChange}
          onClick={onClick}
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
