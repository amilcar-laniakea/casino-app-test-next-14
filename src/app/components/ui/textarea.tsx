interface TextAreaProps {
  className?: string;
  // eslint-disable-next-line no-unused-vars
  onChange: ({ name, value }: { name: string; value: string }) => void;
  value?: string;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  className,
  onChange,
  value,
  placeholder,
  rows = 4,
  disabled = false,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    onChange({ name, value });
  };

  return (
    <textarea
      className={`min-h-40 bg-white border border-yellow-500 rounded-lg sm:text-sm text-gray-400 h-12 w-full px-4 disabled:cursor-not-allowed	disabled:opacity-40	 ${className}`}
      onChange={handleChange}
      value={value}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
    />
  );
};

export default TextArea;
