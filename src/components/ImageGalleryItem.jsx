import React, { Component } from 'react';
import PropTypes from 'prop-types';

import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  render() {
    const { src, tag, onClick } = this.props;
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
  }
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string,
  tag: PropTypes.string,
  onClick: PropTypes.func,
};

export default ImageGalleryItem;
