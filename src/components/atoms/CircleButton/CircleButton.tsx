import { Button } from '../../ui/button';

interface ICircleButtonWithIconProps {
  icon: React.ReactNode;
}

const CircleButtonWithIcon: React.FC<ICircleButtonWithIconProps> = ({
  icon,
  ...props
}) => {
  return (
    <Button className="rounded-full p-4 h-4 w-4 font-semibold" {...props}>
      {icon}
    </Button>
  );
};

export default CircleButtonWithIcon;
