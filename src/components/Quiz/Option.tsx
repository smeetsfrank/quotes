import React, { useRef } from 'react';

import classes from './Option.module.scss';

type Props = {
    id: number;
    author:string;
    selectedOption: (id: number) => any;
}

const RadioButton: React.FC<Props> = ({ id, author, selectedOption }) => {
  const inputRef = useRef<HTMLInputElement | any>(null);

  const selectedOptionHandler = () => {
    selectedOption(inputRef.current.id);
  };

  return (
    <li className={classes.option}>
      <input
        type="radio"
        id={id.toString()}
        ref={inputRef}
        name="authors"
        onChange={selectedOptionHandler}
      />
      <label htmlFor={id.toString()}>{author}</label>
    </li>
  );
};

export default RadioButton;
