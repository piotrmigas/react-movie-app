import React from "react";

type Props = {
  callback: (value: number) => void;
};

const Rate: React.FC<Props> = ({ callback }) => {
  const [value, setValue] = React.useState(5);

  return (
    <div>
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(Number(e.target.value))}
      />
      {value}
      <p>
        <button style={{ cursor: "pointer" }} onClick={() => callback(value)}>
          Rate
        </button>
      </p>
    </div>
  );
};

export default Rate;
