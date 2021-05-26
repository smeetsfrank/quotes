import React from 'react';
import classes from './BackgroundImage.module.scss';

type Props = {
    imageUrl: string;
    checkingImageLoad: () => void;
}

const BackgroundImage: React.FC<Props> = ({ imageUrl, checkingImageLoad }) => (
  <div className={classes['background-wrapper']}>
    <img
      className={classes['increase-anim']}
      src={imageUrl}
      alt="quote-background"
      onLoad={checkingImageLoad}
    />
  </div>
);

export default BackgroundImage;
