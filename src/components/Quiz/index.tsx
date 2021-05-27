import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import useHttp from '../../hooks/use-http';
import { QuoteProps, GameProps, FetchedBackground } from '../../models/models';

import Options from './Options';
import Progress from './Progress';
import Score from './Score';
import Loader from '../UI/Loader/Loader';
import BackgroundImage from '../UI/BackgroundImage/BackgroundImage';

import classes from './index.module.scss';

const Question: React.FC = () => {
  const [game, setGame] = useState<GameProps>({ answers: [], step: 0, progress: 0 });
  const [quotes, setQuotes] = useState<any>();
  const [authors, setAuthors] = useState<any>();
  const [imageRendered, setImageRendered] = useState<boolean>(false);
  const [backgroundImage, setBackgroundImage] = useState<string>('placeholder.jpg');

  const { sendRequest: fetchQuote } = useHttp();

  const quoteHandler = (data: QuoteProps[]) => {
    /* Strip unknown authors from list */
    const filterQuotes = data.filter((item: QuoteProps) => item.author.toLowerCase() !== 'unknown');
    /* Select 5 random quotes from stripped list */
    const selectGameQuotes = filterQuotes.sort(() => 0.5 - Math.random()).slice(0, 5);
    setQuotes(selectGameQuotes);

    /* We only need to pass an id and author for implementing multiple choice */
    const filterAuthors = filterQuotes.map((item: QuoteProps) => ({
      id: item.id,
      author: item.author,
    }));
    /* Remove duplicate authors */
    const removeDuplicateAuthors = filterAuthors.filter(
      (value, idx, arr) => arr.findIndex(
        (obj) => (obj.author === value.author),
      ) === idx,
    );
    setAuthors(removeDuplicateAuthors);
  };

  const fetchImage = async () => {
    try {
      const response = await axios.get<FetchedBackground>(`https://api.unsplash.com/photos/random?${
        new URLSearchParams({
          query: 'minimal',
          client_id: 'MzZUemb6Dpm7QPA1Edx12DF-O81dgKq7rrDkB91MPRE',
        })}`);
      const { data } = response;
      setBackgroundImage(`${data.urls?.regular}&format=auto`);
      return;
    } catch (err) {
      if (err.response.status === 403) {
        setBackgroundImage('placeholder.jpg');
        setImageRendered(true);
        return;
      }
      const errorMessage = err.response.data;
      throw new Error(`Error: ${errorMessage}`);
    }
  };

  /* let/const used within multiple functions */
  let answer: number;
  const currentStep = game.step!;
  const gameProgress = game.progress!;

  const correctAnswer = {
    id: quotes?.[currentStep].id,
    author: quotes?.[currentStep].author,
  };

  /* Selected user answer */
  const selectedOptionHandler = (id: number) => {
    answer = id;
  };

  const restartGame = () => {
    setGame({ answers: [], step: 0, progress: 0 });
    fetchQuote({ url: 'http://quotes.stormconsultancy.co.uk/popular.json' }, quoteHandler);
    fetchImage();
  };

  // next step + save store answer
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    /* Bare minimal error handling */
    if (!answer) {
      alert('Please provide an answer');
      return;
    }
    /* Resetting step on final question so we don't try
      to fetch a non-exsisting quote */
    if (gameProgress === 4) {
      setGame((prevState: GameProps) => ({
        answers: [...prevState.answers, answer],
        step: 0,
        progress: gameProgress + 1,
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

  useEffect(() => {
    fetchQuote({ url: 'http://quotes.stormconsultancy.co.uk/popular.json' }, quoteHandler);
    fetchImage();
  }, []);

  return (
    <>
      <BackgroundImage checkRenderedImage={checkRenderedImage} imageUrl={backgroundImage} />
      <div className={`${classes['quote-wrapper']} ${gameProgress === 5 && classes.scoreboard}`}>
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
        {gameProgress !== 5 && <Progress step={game?.step} /> }
        {(gameProgress === 5) && (
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
