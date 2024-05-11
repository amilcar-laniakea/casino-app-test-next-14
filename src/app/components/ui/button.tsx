type ButtonProps = {
  type?: 'primary' | 'secondary';
  width?: 80 | 96 | 'full';
  text: string;
  onClick: () => void;
  disabled?: boolean;
};

const Button = ({ type, width, text, onClick, disabled = false }: ButtonProps): JSX.Element => {
  const handleButtonColorsType = (buttonType: ButtonProps['type']): string => {
    switch (buttonType) {
      case 'primary':
        return 'bg-primary';
      case 'secondary':
        return 'bg-secondary';
      default:
        return 'bg-white border border-primary text-primary';
    }
  };

  const handleButtonWidth = (buttonSize: ButtonProps['width']): string => {
    switch (buttonSize) {
      case 80:
        return 'max-w-80 h-12 rounded-xl';
      case 96:
        return 'max-w-96 h-10 rounded-lg';
      case 'full':
        return 'max-w-full h-10 rounded-lg';
      default:
        return 'max-w-max h-10 rounded-lg';
    }
  };

  return (
    <button
      disabled={disabled}
      className={`${handleButtonColorsType(type)} ${handleButtonWidth(width)} text-xl font-700 py-2 px-4 rounded w-full leading-6 rounded-xl text-grayText disabled:cursor-not-allowed disabled:bg-grayTextAlt`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
