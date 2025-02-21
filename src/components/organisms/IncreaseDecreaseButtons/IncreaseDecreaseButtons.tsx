import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useTimerStore } from '../../../store/TimerStore';
import { setTimerSearchParams } from '../../../utils/setTimerSearchParams';
import CircleButtonWithIcon from '../../atoms/CircleButton/CircleButton';
import { ButtonsLayout } from '../../molecules/ButtonsLayout/ButtonsLayout';
import { updateSearchParams } from '../EditTimer/EditTimer';

const IncreaseDecreaseButtons: React.FC = () => {
  const searchParams = useSearchParams();
  const { milliseconds, setMili } = useTimerStore();

  const handleTimeChange = (type: 'plus' | 'minus') => {
    let value = milliseconds < 59000 ? 5000 : 15000;
    let valueToHandle = type === 'plus' ? value : -value;
    let updatedMilliseconds = milliseconds + valueToHandle;

    if (updatedMilliseconds < 0) return;

    setMili(updatedMilliseconds);

    updateSearchParams(searchParams, [
      (params) => setTimerSearchParams(params, milliseconds),
    ]);
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
