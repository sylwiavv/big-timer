import { useSearchParams } from 'next/navigation';
import { setTargetIntoSearchParams } from '../../../helpers/set-target-search-params';
import useCountdown from '../../../hooks/useCountDown';
import { ERunning, useTimerStore } from '../../../store/TimerStore';
import { ButtonsLayout } from '../../molecules/ButtonsLayout/ButtonsLayout';
import { Button } from '../../ui/button';
import { updateSearchParams } from '../EditTimer/EditTimer';

const ButtonsToHandleTimer = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const { milliseconds, running } = useTimerStore();
  const { start, pause, restart } = useCountdown();

  const handleSetStart = () => {
    const targetTime = Date.now() + milliseconds;

    updateSearchParams(searchParams, [
      (params) => setTargetIntoSearchParams(params, targetTime),
    ]);
    start();
  };

  const handleRestartMode = () => {
    restart();
  };

  return (
    <ButtonsLayout>
      {running === ERunning.PAUSED || running === ERunning.IDLE ? (
        <>
          <Button className="font-semibold" onClick={handleSetStart}>
            Start
          </Button>

          <Button className="font-semibold" onClick={handleRestartMode}>
            Restart
          </Button>
        </>
      ) : (
        <Button
          className="font-semibold"
          onClick={() => {
            pause();

            params.delete('target');
            window.history.pushState(null, '', `?${params.toString()}`);
          }}
        >
          Pause
        </Button>
      )}
    </ButtonsLayout>
  );
};

export default ButtonsToHandleTimer;
