import React from 'react';
import PropTypes from 'prop-types';

import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ src, tag, onClick }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        onClick={onClick}
        className={css['ImageGalleryItem-image']}
        src={src}
        alt={tag}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string,
  tag: PropTypes.string,
  onClick: PropTypes.func,
};

export default ImageGalleryItem;
