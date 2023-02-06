interface SquareProps {
  value: string | null;
  onItemClick: () => void;
}

const Square = ({ value, onItemClick }: SquareProps) => {
  return (
    <div className="square" onClick={onItemClick}>
      {value}
    </div>
  );
};

export default Square;
