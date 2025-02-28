'use client';

import { memo } from 'react';
import { Button, ButtonProps } from '../../ui/button';

interface ICircleButtonWithIconProps extends ButtonProps {
  icon: React.ReactNode;
}

const CircleButtonWithIcon = memo(
  ({ icon, className, ...props }: ICircleButtonWithIconProps) => {
    return (
      <Button
        className={`rounded-full p-4 h-10 w-10 font-semibold flex items-center justify-center ${className}`}
        {...props}
      >
        {icon}
      </Button>
    );
  }
);

export default CircleButtonWithIcon;
