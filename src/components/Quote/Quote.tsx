import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { QuoteProps } from '../../models/models';

import BackgroundImage from '../UI/BackgroundImage/BackgroundImage';
import Loader from '../UI/Loader/Loader';
import classes from './Quote.module.scss';

const Quote: React.FC = () => {
  const [quote, setQuote] = useState<QuoteProps>();
  const [backgroundImage, setBackgroundImage] = useState<string>('placeholder.jpg');
  const [imageHasRendered, setImageHasRendered] = useState<boolean>(false);

  const fetchImage = async () => {
    try {
      const response = await axios.get(`https://api.unsplash.com/photos/random?${
        new URLSearchParams({
          query: 'minimal',
          client_id: 'MzZUemb6Dpm7QPA1Edx12DF-O81dgKq7rrDkB91MPRE',
        })}`);
      const data = await response.data;
      return data;
    } catch (err) {
      /* Added this check because we know the API has a rate limit
         of 50 successfull calls an hour. */
      if (err.response.status === 403) {
        alert('Exceeded demo API rate limit');
        return false;
      }
      const errorMessage = err.response.data;
      throw new Error(`Error: ${errorMessage}`);
    }
  };

  const fetchQuote = async () => {
    try {
      const response = await axios.get('http://quotes.stormconsultancy.co.uk/random.json');
      const data = await response.data;
      return data;
    } catch (err) {
      throw new Error('Error');
    }
  };

  const fetchQuoteAndImage = async () => {
    /* For smooth transitions between each render of a quote/background image, we wait untill
       the image has fully rendered in the DOM instead of awaiting a successfull call. */
    setQuote(undefined);
    setImageHasRendered(false);
    const responseImage = await fetchImage();
    /* Added this check to because of the limited API calls */
    if (responseImage) {
      setBackgroundImage(`${responseImage.urls.regular}&format=auto`);
    } else {
      setImageHasRendered(true);
      setBackgroundImage('placeholder.jpg');
    }
    const responseQuote = await fetchQuote();
    setQuote(responseQuote);
  };

  const checkRenderedImage = () => {
    setImageHasRendered(true);
  };

  useEffect(() => {
    fetchQuoteAndImage();
  }, []);

  return (
    <>
      <BackgroundImage checkRenderedImage={checkRenderedImage} imageUrl={backgroundImage} />
      {!imageHasRendered && <Loader />}
      {imageHasRendered
      && (
      <div className={classes['quote-wrapper']}>
        <h2>{quote?.quote}</h2>
        <h3>{quote?.author}</h3>
        <button className={classes.inspire} type="button" onClick={fetchQuoteAndImage}>Inspire me</button>
      </div>
      )}
    </>
  );
};

export default Quote;
