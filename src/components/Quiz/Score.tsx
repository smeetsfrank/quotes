import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { QuoteProps } from '../../models/models';

import classes from './Score.module.scss';

interface Props {
    answers: number[] | string[];
    quotes: QuoteProps[];
}

const Score: React.FC<Props> = ({ answers, quotes }) => {
  const checkedQuotes = quotes.map((quote: QuoteProps, index) => (
    { ...quote, correct: quote.id.toString() === answers[index] }
  ));

  const scoreboardMessage = () => {
    const numbOfCorrectAnwers = checkedQuotes.filter((quote: QuoteProps) => quote.correct);
    switch (numbOfCorrectAnwers.length) {
      case 0:
        return 'Zero, Seriously?! Did i just create a whole fucking game just for you to guess zero correct answers? IT EVEN IS MULTIPLE CHOICE!! The fuck is wrong with you?';
        break;
      case 1:
        return 'Just one? Ok.. Fine.. What evs';
        break;
      case 2:
        return 'Just two? I mean.. You can do better, right?';
        break;
      case 3:
        return 'There you go! Three correct answers, pretty decent!';
        break;
      case 4:
        return 'Four! Enough to brag, not enough to be the greatest. Just like life.';
        break;
      default:
        return 'Holy fuck! Five! Youre either a really good guesser, or just know alot of useless quotes.. I guess congrats?';
    }
  };

  return (
    <>
      <div className={classes.message}>
        {scoreboardMessage()}
      </div>
      <ul>
        {checkedQuotes && checkedQuotes.map((item: QuoteProps) => (
          <li key={item.id}>
            <h3>
              {item.author}
              <span className={item.correct ? classes.correct : classes.incorrect}>
                <FontAwesomeIcon icon={item.correct ? faCheck : faTimes} />
              </span>
            </h3>
            <p>{item.quote}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Score;
