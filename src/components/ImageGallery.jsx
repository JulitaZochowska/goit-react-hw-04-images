import ImageGalleryItem from './ImageGalleryItem';
import React from 'react';
import PropTypes from 'prop-types';

import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, onEnlargeImage }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          src={image.webformatURL}
          tag={image.tags}
          onClick={() => onEnlargeImage(image.largeImageURL)}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string, // Ten jest do wykorzystania w modalu - jest to src dla powiększonego obrazka
      tags: PropTypes.string,
    })
  ),
  onEnlargeImage: PropTypes.func,
};

export default ImageGallery;
