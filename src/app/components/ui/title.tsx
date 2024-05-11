const Title = ({ text }: { text: string }): JSX.Element => {
  return <h3 className="text-grayTextAlt font-bold w-max px-2">{text}</h3>;
};

export default Title;
