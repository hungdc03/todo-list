const Card = ({ children }: { children: React.ReactNode }) => {
  return <div className="rounded-md p-4  flex flex-col items-center justify-center">{children}</div>;
};

export default Card;
