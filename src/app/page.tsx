'use client';

import { Minus, Plus } from 'lucide-react';
import CircleButtonWithIcon from '../components/atoms/CircleButton/CircleButton';
import TimerUnit from '../components/atoms/TimerUnit/TimerUnit';
import { ButtonsLayout } from '../components/molecules/ButtonsLayout/ButtonsLayout';
import { Button } from '../components/ui/button';
import { ETIMERUNITS } from '../types/types';

export default function Home() {
  return (
    <main className="flex flex-col gap-4 items-center justify-center h-screen">
      <div className="flex gap-4 items-center justify-center">
        <ButtonsLayout>
          <Button className="font-semibold">Start/Pause</Button>
          <Button className="font-semibold">Reset</Button>
        </ButtonsLayout>

        <div className="flex items-center justify-center">
          <TimerUnit time={0} unit={ETIMERUNITS.HOURS} />
          <TimerUnit time={0} unit={ETIMERUNITS.MINUTES} />
          <TimerUnit time={0} unit={ETIMERUNITS.SECONDS} />
        </div>

        <ButtonsLayout>
          <CircleButtonWithIcon icon={<Plus />} />
          <CircleButtonWithIcon icon={<Minus />} />
        </ButtonsLayout>
      </div>
    </main>
  );
}
