import React from 'react';
import classes from './BackgroundImage.module.scss';

type Props = {
    imageUrl: string;
    checkRenderedImage: () => void;
}

const BackgroundImage: React.FC<Props> = ({ imageUrl, checkRenderedImage }) => (
  <div className={classes['background-wrapper']}>
    <img
      className={classes['increase-anim']}
      src={imageUrl}
      alt="quote-background"
      onLoad={checkRenderedImage}
    />
  </div>
);

export default BackgroundImage;
