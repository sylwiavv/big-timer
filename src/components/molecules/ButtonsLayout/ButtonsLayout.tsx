interface IButtonsLayoutProps {
  children: React.ReactNode;
}
export const ButtonsLayout = ({ children }: IButtonsLayoutProps) => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      {children}
    </div>
  );
};
