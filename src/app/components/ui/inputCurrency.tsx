import Hint from './hint';

interface InputCurrencyProps {
  name: string;
  // eslint-disable-next-line no-unused-vars
  onChange: ({ name, value }: { name: string; value: string }) => void;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  symbol?: string;
  currency?: string;
  hint?: string;
}

const InputCurrency: React.FC<InputCurrencyProps> = ({
  name,
  onChange,
  value,
  placeholder,
  disabled = false,
  symbol = '$',
  currency = 'USD',
  hint,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    onChange({ name, value });
  };

  return (
    <div>
      <div className="relative rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">{symbol}</span>
        </div>
        <input
          type="number"
          name={name}
          id={name}
          value={value}
          onChange={handleChange}
          className="bg-white border border-secondary block w-full rounded-xl py-1.5 pl-7 pr-12 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-secondary focus:border-secondary sm:text-sm sm:leading-6 w-full h-12 px-4 disabled:cursor-not-allowed disabled:opacity-40"
          placeholder={placeholder}
          aria-describedby="price-currency"
          disabled={disabled}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <span className="text-gray-500 sm:text-sm" id="price-currency">
            {currency}
          </span>
        </div>
      </div>
      {hint && <Hint text={hint} />}
    </div>
  );
};

export default InputCurrency;
