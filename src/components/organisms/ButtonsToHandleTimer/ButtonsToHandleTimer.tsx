import { useSearchParams } from 'next/navigation';
import useCountdown from '../../../hooks/useCountDown';
import useUpdateSearchParams from '../../../hooks/useUpdateSearchParams';
import { ERunning, useTimerStore } from '../../../store/TimerStore';
import { ETimerUnits } from '../../../types/types';
import { ButtonsLayout } from '../../molecules/ButtonsLayout/ButtonsLayout';
import { Button } from '../../ui/button';

const ButtonsToHandleTimer = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const { updateSearchParams } = useUpdateSearchParams();

  const { milliseconds, running } = useTimerStore();
  const { start, pause, restart } = useCountdown();

  const handleSetStartMode = () => {
    const target = Date.now() + milliseconds;

    const hours = Number(params.get(ETimerUnits.HOURS)) || 0;
    const minutes = Number(params.get(ETimerUnits.MINUTES)) || 0;
    const seconds = Number(params.get(ETimerUnits.SECONDS)) || 0;

    updateSearchParams({ hours, minutes, seconds, target });

    start();
  };

  const handleRestartMode = () => {
    restart();
  };

  const handleSetPauseMode = () => {
    pause();
  };

  return (
    <ButtonsLayout>
      {running === ERunning.PAUSED || running === ERunning.IDLE ? (
        <>
          <Button className="font-semibold" onClick={handleSetStartMode}>
            Start
          </Button>

          <Button className="font-semibold" onClick={handleRestartMode}>
            Restart
          </Button>
        </>
      ) : (
        <Button className="font-semibold" onClick={handleSetPauseMode}>
          Pause
        </Button>
      )}
    </ButtonsLayout>
  );
};

export default ButtonsToHandleTimer;
