import React from 'react';

import classes from './Progress.module.scss';

type Props = {
  steps:number;
  current: number;
}

const Progress: React.FC<Props> = ({ steps, current }) => {
  const items = [];
  for (let i = 0; i < steps; i += 1) {
    const stepNumber = i + 1;
    items.push(
      <li key={i} className={`${current === i && classes.current}`}>
        {stepNumber.toString()}
      </li>,
    );
  }
  return (
    <div className={classes.progress}>
      <ul>
        {items}
      </ul>
    </div>
  );
};

export default Progress;
