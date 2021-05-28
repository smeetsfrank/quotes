import React from 'react';
import classes from './QuoteDisplay.module.scss';

type Props = {
    quote: string | undefined;
    author: string | undefined;
    fetchQuoteAndImage: () => void;
}

const QuoteDisplay: React.FC<Props> = ({ quote, author, fetchQuoteAndImage }) => (
  <div className={classes['quote-wrapper']}>
    <h2>{quote}</h2>
    <h3>{author}</h3>
    <button className={classes.inspire} type="button" onClick={fetchQuoteAndImage}>Inspire me</button>
  </div>
);

export default QuoteDisplay;
