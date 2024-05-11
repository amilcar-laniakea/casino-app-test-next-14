interface RadioButtonProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}

const RadioButton: React.FC<RadioButtonProps> = ({ id, label, checked, onChange, disabled }) => {
  const handleChange = () => {
    onChange();
  };

  return (
    <div className="w-fit">
      <div className="inline-flex items-center">
        <label
          className="relative flex cursor-pointer items-center rounded-full p-2"
          htmlFor={id}
          data-ripple-dark="true"
        >
          <input
            type="radio"
            id={id}
            className="peer absolute h-0 w-0 opacity-0 cursor-pointer"
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
          />
          <div className="border-2 border-transparent rounded-full p-1 transition-colors">
            <div
              className={`relative w-5 h-5 rounded-full bg-white transition-colors border ${checked ? ' border-secondary' : 'border-blue-gray-100'}`}
            >
              {checked && (
                <div className="w-3 h-3 rounded-full bg-secondary absolute -translate-x-1/2 -translate-y-1/2 border top-1/2 left-1/2"></div>
              )}
            </div>
          </div>
        </label>
        <span>{label}</span>
      </div>
    </div>
  );
};

export default RadioButton;
