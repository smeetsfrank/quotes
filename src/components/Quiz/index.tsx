import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { QuoteProps, GameProps } from '../../models/models';
import useHttp from '../../hooks/use-http';

import Options from './Options';
import Progress from './Progress';
import Score from './Score';
import Loader from '../UI/Loader/Loader';
import BackgroundImage from '../UI/BackgroundImage/BackgroundImage';

import classes from './index.module.scss';

const Question: React.FC = () => {
  const [game, setGame] = useState<GameProps>({ answers: [], step: 0, progress: 0 });
  const [quotes, setQuotes] = useState<any | null>(null);
  const [authors, setAuthors] = useState<any | null>(null);
  const [imageRendered, setImageRendered] = useState<boolean>(false);
  const [backgroundImage, setBackgroundImage] = useState<string>('placeholder.jpg');

  const { sendRequest: fetchQuote, isLoading } = useHttp();

  const quoteHandler = (data: QuoteProps[]) => {
    // Strip unknown authors from list
    const filterQuotes = data.filter((item: QuoteProps) => item.author.toLowerCase() !== 'unknown');
    // Select 5 random quotes from stripped list
    const selectGameQuotes = filterQuotes.sort(() => 0.5 - Math.random()).slice(0, 5);

    setQuotes(selectGameQuotes);

    const filterAuthors = filterQuotes.map((item: QuoteProps) => ({
      id: item.id,
      author: item.author,
    }));

    const removeDuplicateAuthors = filterAuthors.filter(
      (v, i, a) => a.findIndex(
        (t) => (t.author === v.author),
      ) === i,
    );

    setAuthors(removeDuplicateAuthors);
  };

  let answer: any;
  const currentStep = game.step!;
  const gameProgress = game.progress!;

  const correctAnswer = {
    id: quotes?.[currentStep].id,
    author: quotes?.[currentStep].author,
  };

  const fetchImage = async () => {
    try {
      const response = await axios.get(`https://api.unsplash.com/photos/random?${
        new URLSearchParams({
          query: 'minimal',
          client_id: 'MzZUemb6Dpm7QPA1Edx12DF-O81dgKq7rrDkB91MPRE',
        })}`);
      const data = await response.data;
      setBackgroundImage(`${data.urls.regular}&format=auto`);
      return data;
    } catch (err) {
      if (err.response.status === 403) {
        // alert('Exceeded demo API rate limit');
        setBackgroundImage('placeholder.jpg');
        setImageRendered(true);
        return null;
      }
      const errorMessage = err.response.data;
      throw new Error(`Error: ${errorMessage}`);
    }
  };

  useEffect(() => {
    fetchQuote({ url: 'http://quotes.stormconsultancy.co.uk/popular.json' }, quoteHandler);
    fetchImage();
  }, []);

  const selectedOptionHandler = (id: number) => {
    answer = id;
  };

  const restartGame = () => {
    fetchQuote({ url: 'http://quotes.stormconsultancy.co.uk/popular.json' }, quoteHandler);
    setGame({ answers: [], step: 0, progress: 0 });
    fetchImage();
  };

  // next step + save store answer
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer) {
      alert('Please provide an answer');
      return;
    }
    if (gameProgress === 4) {
      setGame((prevState: GameProps) => ({
        answers: [...prevState.answers, answer],
        step: 0,
        progress: 6,
      }));
    }
    if (gameProgress < 4) {
      setImageRendered(false);
      fetchImage();
      setGame((prevState: GameProps) => ({
        answers: [...prevState.answers, answer],
        step: currentStep + 1,
        progress: gameProgress + 1,
      }));
    }
  };

  const checkRenderedImage = () => {
    setImageRendered(true);
  };

  return (
    <>
      <BackgroundImage checkRenderedImage={checkRenderedImage} imageUrl={backgroundImage} />
      <div className={`${classes['quote-wrapper']} ${gameProgress === 6 && classes.scoreboard}`}>
        {!imageRendered && <Loader />}
        {(gameProgress < 5 && imageRendered) && (
        <>
          <form onSubmit={submitHandler}>
            <h2>{quotes?.[currentStep].quote}</h2>
            <ul className={classes.options}>
              <Options
                authors={authors}
                correctAnswer={correctAnswer}
                selectedOption={selectedOptionHandler}
              />
            </ul>
            <button className={classes.submit} type="submit">Answer</button>
          </form>
        </>
        )}
        {gameProgress !== 6 && <Progress step={game?.step} /> }
        {(gameProgress === 6) && (
        <>
          <button type="button" onClick={restartGame} className={classes.restart}>
            <FontAwesomeIcon icon={faRedoAlt} />
          </button>
          <Score answers={game.answers} quotes={quotes} />
        </>
        )}
      </div>
    </>

  );
};

export default Question;
