import React from 'react';

import Option from './Option';

type Option = {
  id: number;
  author: string;
}

type Props = {
  authors: Option[];
  correctAnswer: Option;
  selectedOption: (id: number) => void;
}

const Answer: React.FC<Props> = ({ authors, correctAnswer, selectedOption }) => {
  const authorList = authors?.filter((author) => author.author !== correctAnswer.author);
  const falseAnwers = authorList && authorList.sort(() => 0.5 - Math.random()).slice(0, 2);
  const options = falseAnwers && [...falseAnwers, correctAnswer];

  return (
    <>
      {options && options.sort(() => 0.5 - Math.random()).map((item) => (
        <Option id={item.id} author={item.author} selectedOption={selectedOption} key={item.id} />
      ))}
    </>
  );
};
export default Answer;
