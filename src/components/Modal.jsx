import React from 'react';
import PropTypes from 'prop-types';

import css from './Modal.module.css';
import { useEffect } from 'react';

export const Modal = ({ onClose, image }) => {
  const onKeyPress = e => {
    if (e.key === 'Escape') {
      onClose();
    }
  };
  // componentDidMount
  useEffect(() => {
    document.addEventListener('keydown', onKeyPress);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // componentWillUnmount
  useEffect(() => {
    return () => {
      document.removeEventListener('keydown', onKeyPress);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    // zamyka modala po kliknięciu w tło
    <div className={css.Overlay} onClick={onClose}>
      <div className={css.Modal}>
        <img src={image} alt="largeImage" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  image: PropTypes.string,
  onClose: PropTypes.func,
};

export default Modal;
