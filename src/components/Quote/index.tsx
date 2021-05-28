import React, { useState, useEffect } from 'react';

import { QuoteProps } from '../../models/models';
import { fetchRandomQuote } from '../../api/quotes';
import { fetchImage } from '../../api/unsplash';

import QuoteDisplay from './QuoteDisplay';
import BackgroundImage from '../UI/BackgroundImage/BackgroundImage';
import Loader from '../UI/Loader/Loader';

const Quote: React.FC = () => {
  const [quote, setQuote] = useState<QuoteProps>();
  const [backgroundImage, setBackgroundImage] = useState<string>('placeholder.jpg');
  const [imageHasRendered, setImageHasRendered] = useState<boolean>(false);

  const fetchQuoteAndImage = async () => {
    /* For smooth transitions between each render of a quote/background image, we wait untill
       the image has fully rendered in the DOM instead of awaiting a successfull call. */
    setQuote(undefined);
    setImageHasRendered(false);
    const responseImage = await fetchImage(`https://api.unsplash.com/photos/random?${
      new URLSearchParams({
        query: 'minimal',
        client_id: 'MzZUemb6Dpm7QPA1Edx12DF-O81dgKq7rrDkB91MPRE',
      })}`);
    /* Added this check to because of the limited API calls */
    if (responseImage) {
      setBackgroundImage(`${responseImage}&format=auto`);
    } else {
      setImageHasRendered(true);
      setBackgroundImage('placeholder.jpg');
    }
    const responseQuote = await fetchRandomQuote('http://quotes.stormconsultancy.co.uk/random.json');
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
        <QuoteDisplay
          quote={quote?.quote}
          author={quote?.author}
          fetchQuoteAndImage={fetchQuoteAndImage}
        />
      )}
    </>
  );
};

export default Quote;
