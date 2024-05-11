const Card = ({ children }: { children: JSX.Element }): JSX.Element => {
  return <div className="bg-grayBackground rounded-lg py-3.5 px-2">{children}</div>;
};

export default Card;
