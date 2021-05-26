import React from 'react';

import classes from './Progress.module.scss';

type Props = {
    step: number | undefined;
}

const Progress: React.FC<Props> = ({ step }) => (
  <div className={classes.progress}>
    <ul>
      <li className={`${step === 0 && classes.current}`}>
        1
      </li>
      <li className={`${step === 1 && classes.current}`}>
        2
      </li>
      <li className={`${step === 2 && classes.current}`}>
        3
      </li>
      <li className={`${step === 3 && classes.current}`}>
        4
      </li>
      <li className={`${step === 4 && classes.current}`}>
        5
      </li>
    </ul>
  </div>
);

export default Progress;
