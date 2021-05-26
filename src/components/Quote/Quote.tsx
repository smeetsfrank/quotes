import React, { useState, useEffect } from 'react';
import axios from 'axios';

import classes from './Quote.module.scss';
import BackgroundImage from '../UI/BackgroundImage/BackgroundImage';
import Loader from '../UI/Loader/Loader';

const Quote: React.FC = () => {
  const [quote, setQuote] = useState<any | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string>('placeholder.jpg');
  const [imageRendered, setImageRendered] = useState<boolean>(false);

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

  const patientlyWaiting = async () => {
    setQuote('');
    setImageRendered(false);
    const responseImage = await fetchImage();
    if (responseImage) {
      setBackgroundImage(`${responseImage.urls.regular}&format=auto`);
    } else {
      setImageRendered(true);
      setBackgroundImage('placeholder.jpg');
    }
    const responseQuote = await fetchQuote();
    setQuote(responseQuote);
  };

  const checkingLoad = () => {
    setImageRendered(true);
  };

  useEffect(() => {
    patientlyWaiting();
  }, []);

  return (
    <>
      <BackgroundImage checkingImageLoad={checkingLoad} imageUrl={backgroundImage} />
      {!imageRendered && <Loader />}
      {imageRendered
      && (
      <div className={classes['quote-wrapper']}>
        <>
          <h2>{quote?.quote}</h2>
          <h3>{quote?.author}</h3>
        </>
        <button className={classes.inspire} type="button" onClick={patientlyWaiting}>Inspire me</button>
      </div>
      )}
    </>
  );
};

export default Quote;
