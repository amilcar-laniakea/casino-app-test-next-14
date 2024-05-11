type HintProps = {
  text: string;
};

const Title = ({ text }: HintProps): JSX.Element => {
  return <p className="text-error text-xs font-normal w-fit px-2 py-2">{text}</p>;
};

export default Title;
