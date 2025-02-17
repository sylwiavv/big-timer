import { ETimerUnits } from '../../../types/types';

interface ILabelWithInputProps {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LabelWithInput = ({ label, value, onChange }: ILabelWithInputProps) => {
  //   const { formatTime } = useFormattedTime();

  return (
    <label className="flex flex-col text-right">
      <div className="flex ">
        <input
          type="text"
          pattern="[0-9]*"
          className="bg-transparent  font-bold appearance-textfieldw-[1.135em] p-0 text-right text-timerXl w-full bg-[aliceblue]"
          //   value={
          //     label === ETimerUnits.SECONDS || label === ETimerUnits.MINUTES
          //       ? formatTime(+value)
          //       : +value
          //   }
          value={+value}
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
