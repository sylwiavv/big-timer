import { Button } from '../../ui/button';

interface ICircleButtonWithIconProps {
  icon: React.ReactNode;
  onClick: () => void;
}

const CircleButtonWithIcon: React.FC<ICircleButtonWithIconProps> = ({
  icon,
  onClick,
  ...props
}) => {
  return (
    <Button
      className="rounded-full p-4 h-4 w-4 font-semibold"
      onClick={onClick}
      {...props}
    >
      {icon}
    </Button>
  );
};

export default CircleButtonWithIcon;
