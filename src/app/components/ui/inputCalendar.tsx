import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';

interface InputCalendarProps {
  // eslint-disable-next-line no-unused-vars
  onChange: (value: DateValueType) => void;
  value: DateValueType;
  placeholder?: string;
  displayFormat: string;
  disabled?: boolean;
  minDate?: Date | null;
  asSingle?: boolean;
  useRange?: boolean;
}

const InputCalendar: React.FC<InputCalendarProps> = ({
  onChange,
  value,
  placeholder,
  displayFormat,
  disabled = false,
  asSingle,
  useRange,
  minDate,
}) => {
  return (
    <Datepicker
      inputClassName="bg-white border border-secondary rounded-lg text-gray-400 sm:text-sm w-full h-12 px-4 disabled:cursor-not-allowed disabled:opacity-40 w-full"
      value={value}
      onChange={onChange}
      minDate={minDate}
      asSingle={asSingle}
      useRange={useRange}
      disabled={disabled}
      displayFormat={displayFormat}
      placeholder={placeholder}
    />
  );
};

export default InputCalendar;
