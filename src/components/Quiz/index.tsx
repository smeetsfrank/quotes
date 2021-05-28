import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons';

import { QuoteProps, GameProps } from '../../models/models';

import { fetchPopularQuotes } from '../../api/quotes';
import { fetchImage } from '../../api/unsplash';

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
  const [imageHasRendered, setImageHasRendered] = useState<boolean>(false);
  const [backgroundImage, setBackgroundImage] = useState<string | undefined>('placeholder.jpg');

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

  const fetchingImage = async () => {
    const response = await fetchImage(`https://api.unsplash.com/photos/random?${
      new URLSearchParams({
        query: 'minimal',
        client_id: 'MzZUemb6Dpm7QPA1Edx12DF-O81dgKq7rrDkB91MPRE',
      })}`);
    /* Added this check to because of the limited API calls */
    if (response) {
      setBackgroundImage(`${response}&format=auto`);
    } else {
      setImageHasRendered(true);
      setBackgroundImage('placeholder.jpg');
    }
  };

  const fetchingQuotes = async () => {
    const repsonse: any = await fetchPopularQuotes('http://quotes.stormconsultancy.co.uk/popular.json');
    quoteHandler(repsonse);
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
    fetchingQuotes();
    fetchingImage();
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
      setImageHasRendered(false);
      fetchingImage();
      setGame((prevState: GameProps) => ({
        answers: [...prevState.answers, answer],
        step: currentStep + 1,
        progress: gameProgress + 1,
      }));
    }
  };

  const checkRenderedImage = () => {
    setImageHasRendered(true);
  };

  useEffect(() => {
    fetchingQuotes();
    fetchingImage();
  }, []);

  return (
    <>
      <BackgroundImage checkRenderedImage={checkRenderedImage} imageUrl={backgroundImage} />
      <div className={`${classes['quote-wrapper']} ${gameProgress === 5 && classes.scoreboard}`}>
        {!imageHasRendered && <Loader />}
        {(gameProgress < 5 && imageHasRendered) && (
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
