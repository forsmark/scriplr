import clsx from "clsx";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

const Card: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={clsx("p-4 bg-slate-200 rounded-lg shadow-lg", className)}>
      {children}
    </div>
  );
};

export default Card;
