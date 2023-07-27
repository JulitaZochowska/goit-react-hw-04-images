import React, { Component } from 'react';
import PropTypes from 'prop-types';

import css from './Modal.module.css';

class Modal extends Component {
  onKeyPress = e => {
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyPress);
  }

  render() {
    const { image, onClose } = this.props;

    return (
      // zamyka modala po kliknięciu w tło
      <div className={css.Overlay} onClick={onClose}>
        <div className={css.Modal}>
          <img src={image} alt="largeImage" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  image: PropTypes.string,
  onClose: PropTypes.func,
};

export default Modal;
