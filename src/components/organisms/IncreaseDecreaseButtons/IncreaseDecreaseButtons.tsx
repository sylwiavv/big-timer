import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { convertMilliseconds } from '../../../helpers/convert-seconds';
import useUpdateSearchParams from '../../../hooks/useUpdateSearchParams';
import { useTimerStore } from '../../../store/TimerStore';
import CircleButtonWithIcon from '../../atoms/CircleButton/CircleButton';
import { ButtonsLayout } from '../../molecules/ButtonsLayout/ButtonsLayout';

const IncreaseDecreaseButtons: React.FC = () => {
  const { milliseconds, setMilliseconds } = useTimerStore();
  const { updateSearchParams } = useUpdateSearchParams();

  const handleTimeChange = (type: 'plus' | 'minus') => {
    let value = milliseconds < 59000 ? 5000 : 15000;
    let valueToHandle = type === 'plus' ? value : -value;
    let updatedMilliseconds = milliseconds + valueToHandle;

    if (updatedMilliseconds < 0) return;

    const { convertedHoursM, convertedMinutesM, convertedSecondsM } =
      convertMilliseconds(milliseconds);

    updateSearchParams({
      hours: convertedHoursM,
      minutes: convertedMinutesM,
      seconds: convertedSecondsM,
    });

    setMilliseconds(updatedMilliseconds);
  };

  return (
    <ButtonsLayout>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <CircleButtonWithIcon
          icon={<Plus />}
          onClick={() => handleTimeChange('plus')}
        />
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <CircleButtonWithIcon
          icon={<Minus />}
          onClick={() => handleTimeChange('minus')}
        />
      </motion.div>
    </ButtonsLayout>
  );
};

export default IncreaseDecreaseButtons;
